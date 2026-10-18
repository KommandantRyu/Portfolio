/**
 * Steam Web API client behind GET /api/steam/games.
 *
 * Environment (set in api/.env locally, Vercel project env vars in prod):
 *   STEAM_API_KEY  - from https://steamcommunity.com/dev/apikey
 *   STEAM_ID       - SteamID64 (17 digits), full profile URL, or vanity name
 *
 * Endpoints used:
 *   ISteamUser/ResolveVanityURL    - only when STEAM_ID isn't a raw SteamID64
 *   IPlayerService/GetOwnedGames   - library + playtime (minutes)
 *   ISteamUserStats/GetPlayerAchievements - per-game unlock counts
 *
 * Results are cached in memory for 30 minutes; a stale cache is served if
 * Steam goes down. Achievement lookups only run on a cache miss, only for
 * the most-played games that expose community stats, with a small
 * concurrency limit — keeps us far below Steam's rate limits and inside
 * Vercel's function timeout.
 */

const STEAM_API = 'https://api.steampowered.com';
const CACHE_TTL_MS = 30 * 60 * 1000; // fresh for 30 min
const STALE_TTL_MS = 24 * 60 * 60 * 1000; // serve stale on error up to 24h
const MAX_ACHIEVEMENT_GAMES = 25; // top-N played games to check
const ACHIEVEMENT_CONCURRENCY = 4;
const FETCH_TIMEOUT_MS = 8000;
const PLACEHOLDER_IMAGE = '/images/beyond-code/placeholder.svg';

// err.kind: 'config' (missing/bad env) | 'privacy' (games not visible) | 'upstream' (Steam down)
class SteamError extends Error {
  constructor(message, kind = 'upstream') {
    super(message);
    this.kind = kind;
  }
}

function requireConfig() {
  const key = process.env.STEAM_API_KEY;
  const rawId = (process.env.STEAM_ID || '').trim();
  if (!key) {
    throw new SteamError(
      'STEAM_API_KEY is not set — add it to api/.env (local) and Vercel env vars (deployed).',
      'config'
    );
  }
  if (!rawId) {
    throw new SteamError(
      'STEAM_ID is not set — add your Steam profile URL (or SteamID64) to api/.env and Vercel env vars.',
      'config'
    );
  }
  return { key, rawId };
}

// Steam errors must never leak the key, so thrown messages never include URLs.
async function steamFetch(path, params) {
  const url = new URL(STEAM_API + path);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, String(v));

  let res;
  try {
    res = await fetch(url, { signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) });
  } catch {
    throw new SteamError('Steam did not respond in time.', 'upstream');
  }
  if (!res.ok) {
    throw new SteamError(`Steam API returned HTTP ${res.status} for ${path}.`, 'upstream');
  }
  try {
    return await res.json();
  } catch {
    throw new SteamError(`Steam API returned invalid JSON for ${path}.`, 'upstream');
  }
}

// Accepts SteamID64, a full profile URL, or a bare vanity name.
async function resolveSteamId(key, rawId) {
  if (/^\d{17}$/.test(rawId)) return rawId;

  let vanity = rawId;
  const urlMatch = rawId.match(/steamcommunity\.com\/(?:id|profiles)\/([^/?#]+)/i);
  if (urlMatch) {
    if (/^\d{17}$/.test(urlMatch[1])) return urlMatch[1];
    vanity = urlMatch[1];
  }

  const body = await steamFetch('/ISteamUser/ResolveVanityURL/v1/', {
    key,
    vanityurl: vanity,
  });
  if (body.response && body.response.success === 1) return body.response.steamid;
  throw new SteamError(
    `STEAM_ID "${vanity}" doesn't match a Steam profile — check the value in .env.`,
    'config'
  );
}

async function getOwnedGames(key, steamid) {
  const body = await steamFetch('/IPlayerService/GetOwnedGames/v1/', {
    key,
    steamid,
    include_appinfo: 1,
    include_played_free_games: 1,
    format: 'json',
  });
  const games = body.response && body.response.games;
  if (!Array.isArray(games)) {
    throw new SteamError(
      'No visible games on this Steam profile — set Game details to Public (profile → Edit Profile → Privacy Settings).',
      'privacy'
    );
  }
  return games;
}

// Returns { unlocked, total, percent } or null when the game has no
// (publicly visible) achievements — those entries just show hours.
async function getAchievements(key, steamid, appid) {
  try {
    const body = await steamFetch('/ISteamUserStats/GetPlayerAchievements/v1/', {
      key,
      steamid,
      appid,
      language: 'en',
    });
    const list = body.playerstats && body.playerstats.achievements;
    if (!Array.isArray(list) || list.length === 0) return null;
    const unlocked = list.filter((a) => a.achieved === 1).length;
    return {
      unlocked,
      total: list.length,
      percent: Math.round((unlocked / list.length) * 100),
    };
  } catch {
    return null; // no stats / private stats / hiccup — keep the game as hours-only
  }
}

// Run fn over items with at most `limit` in flight, preserving order.
async function mapLimit(items, limit, fn) {
  const results = new Array(items.length);
  let next = 0;
  const workers = Array.from(
    { length: Math.min(limit, items.length) },
    async () => {
      while (next < items.length) {
        const idx = next++;
        results[idx] = await fn(items[idx], idx);
      }
    }
  );
  await Promise.all(workers);
  return results;
}

function toGame(game, achievements) {
  return {
    appid: game.appid,
    name: game.name,
    hours: Math.round((game.playtime_forever / 60) * 10) / 10,
    lastPlayed: game.rtime_last_played || 0,
    achievements: achievements || null,
    header: `https://cdn.cloudflare.steamstatic.com/steam/apps/${game.appid}/header.jpg`,
    store: `https://store.steampowered.com/app/${game.appid}/`,
  };
}

async function buildShowcase() {
  const { key, rawId } = requireConfig();
  const steamid = await resolveSteamId(key, rawId);
  const owned = await getOwnedGames(key, steamid);

  const played = owned
    .filter((g) => g.playtime_forever > 0)
    .sort((a, b) => b.playtime_forever - a.playtime_forever);

  // Achievement lookups: only top played games with visible community stats.
  const candidates = played
    .filter((g) => g.has_community_visible_stats)
    .slice(0, MAX_ACHIEVEMENT_GAMES);
  const achResults = await mapLimit(candidates, ACHIEVEMENT_CONCURRENCY, (g) =>
    getAchievements(key, steamid, g.appid)
  );
  const achByApp = new Map(candidates.map((g, i) => [g.appid, achResults[i]]));

  const perfect = played
    .filter((g) => {
      const a = achByApp.get(g.appid);
      return a && a.total > 0 && a.unlocked === a.total;
    })
    .map((g) => toGame(g, achByApp.get(g.appid)));

  const mostPlayed = played.slice(0, 8).map((g) => toGame(g, achByApp.get(g.appid)));

  return {
    updatedAt: Date.now(),
    totals: {
      owned: owned.length,
      played: played.length,
      perfectCount: perfect.length,
    },
    perfect,
    mostPlayed,
  };
}

// ---------------------------------------------------------------------------
// Cache: single in-flight refresh, fresh window, stale-on-error fallback.
// ---------------------------------------------------------------------------

let cache = null; // { at, data }
let inflight = null;

async function getShowcase() {
  if (cache && Date.now() - cache.at < CACHE_TTL_MS) return cache.data;
  if (inflight) return inflight;

  inflight = (async () => {
    try {
      const data = await buildShowcase();
      cache = { at: Date.now(), data };
      return data;
    } catch (err) {
      if (cache && Date.now() - cache.at < STALE_TTL_MS && err.kind !== 'config') {
        return cache.data; // Steam hiccup — serve the last good snapshot
      }
      throw err;
    } finally {
      inflight = null;
    }
  })();
  return inflight;
}

module.exports = { getShowcase, SteamError, PLACEHOLDER_IMAGE };
