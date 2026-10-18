# Portfolio — Specification

> Living spec for the personal portfolio of **Rud Gabriel Ba-oy** ([KommandantRyu](https://github.com/KommandantRyu)).
> Covers the system architecture, API contract, data flow, and the visual design system.

---

## 1. Overview

A personal portfolio site built as two independently deployable services:

- **Frontend** — React 18 + Vite + Tailwind CSS single-page app.
- **API** — small Express JSON API serving profile, projects, skills, and hobby data.

Both are deployed together on **Vercel** using a multi-service `vercel.json`, so `/api/*` routes hit the Express service and everything else serves the static frontend — one domain, no CORS issues in production.

**Goals**

- Showcase projects and skills with a distinctive, cohesive visual identity.
- Keep content editable in one place (the API) rather than scattered across components.
- Deploy cheaply and simply (static + serverless, no database yet).

---

## 2. Tech Stack

| Layer      | Technology                                    |
| ---------- | --------------------------------------------- |
| Frontend   | React 18, React Router 6, Vite 5, Tailwind 3  |
| Backend    | Node.js, Express, CORS                        |
| Deployment | Vercel (multi-service, `vercel.json` rewrites) |
| Fonts      | Cinzel (display), Inter (body), JetBrains Mono |

---

## 3. Project Structure

```
portfolio/
├── vercel.json          # Multi-service routing config
├── README.md            # Project overview & getting started
├── SPEC.md              # This document
├── api/
│   ├── index.js         # Express app: data + routes
│   ├── steam.js         # Steam Web API client (cached library showcase)
│   ├── .env.example     # Template for STEAM_API_KEY + STEAM_ID
│   └── package.json     # express, cors, dotenv
└── frontend/
    ├── index.html       # Font imports, bootstrap classes
    ├── vite.config.js   # Dev proxy /api → :5000
    ├── tailwind.config.js  # Design tokens (colors, fonts)
    ├── postcss.config.js
    └── src/
        ├── main.jsx     # Entry
        ├── App.jsx      # Layout shell + routes + background chains
        ├── api.js       # apiUrl() helper (VITE_API_URL aware)
        ├── index.css    # Design system: cards, pipes, gauges, coins…
        ├── pages/       # Route-level views
        ├── components/  # Reusable UI + decorative motifs
        └── utils/       # highlightText, sinColors
```

**Notes**

- There is no root `package.json`; `frontend/` and `api/` each have their own manifest and lockfile. The root `package-lock.json` is an unused stub from an accidental root `npm install`.
- `node_modules`, `dist`, `.vercel`, and `.env` are git-ignored.

---

## 4. Routing

### Frontend routes (`App.jsx`)

| Path                    | Page                   | Data source            |
| ----------------------- | ---------------------- | ---------------------- |
| `/`                     | `Home`                 | static                  |
| `/about`                | `About`                | static                  |
| `/projects`             | `Projects`             | `GET /api/projects`    |
| `/skills`               | `Skills`               | `GET /api/skill-sections` |
| `/beyond-code`          | `BeyondCodeHub`        | `GET /api/beyond-code` |
| `/beyond-code/:category`| `BeyondCodeCategory`   | `GET /api/beyond-code` (filtered by slug) |

Layout shell: fixed background `Chain` motifs → sticky `Header` → `<main>` (max-w-4xl) → `Footer`.

### API routes (`api/index.js`)

| Method | Path                | Purpose                              |
| ------ | ------------------- | ------------------------------------ |
| GET    | `/api/profile`      | Name, role, tagline, location        |
| GET    | `/api/projects`     | Project list                         |
| GET    | `/api/skill-sections` | Skill carousel panels              |
| GET    | `/api/beyond-code`  | Hobby categories + items             |
| GET    | `/api/steam/games`  | Steam library highlights (live, cached) |
| POST   | `/api/contact`      | Contact form submission (validates required fields; logs — TODO: real delivery) |

---

## 5. Data Contracts

### `GET /api/profile`

```json
{ "name": "string", "role": "string", "tagline": "string", "location": "string" }
```

> **Gap:** no frontend page consumes this yet.

### `GET /api/projects`

```json
[
  {
    "id": 1,
    "title": "string",
    "description": "string",
    "tech": ["string"],
    "link": "string (optional)"
  }
]
```

### `GET /api/skill-sections`

```json
[
  {
    "id": "languages",
    "title": "string",
    "icon": "emoji",
    "description": "text with {keyword} markup",
    "entries": [{ "name": "string", "note": "text with {keyword} markup" }]
  }
]
```

- `{braces}` mark inline keywords rendered as accent-colored spans (see `utils/highlightText.jsx`).
- Coin ratings per tool are **not** in this payload — they live in the `COIN COUNTS` table in `index.css`, keyed by `data-coin-key`.

### `GET /api/beyond-code`

```json
[
  {
    "slug": "foods",
    "title": "string",
    "emoji": "🍜",
    "sin": "gluttony",
    "detailLabel": "restaurant",
    "items": [{ "name": "string", "image": "/images/...", "detail": "string" }]
  }
]
```

- `sin` maps to a color via `utils/sinColors.js` (wrath, lust, sloth, gluttony, envy, gloom, pride).
- `slug` is the URL segment for `/beyond-code/:category`.
- **Images:** `image` is either a site-relative path into `frontend/public/images/beyond-code/<category-slug>/` (user-supplied) or an absolute Steam CDN URL (`https://cdn.cloudflare.steamstatic.com/steam/apps/{appid}/header.jpg`). Missing files fall back to `/images/beyond-code/placeholder.svg` via an `onError` handler.

### `GET /api/steam/games`

Live Steam library highlights for the Games category, built by `api/steam.js` (in-memory cache: 30 min fresh, stale-on-error up to 24 h; achievement lookups limited to the top 25 played games with visible stats, max 4 in flight).

```json
{
  "updatedAt": 1697654321000,
  "totals": { "owned": 123, "played": 80, "perfectCount": 5 },
  "perfect":    [{ "appid": 400, "name": "Portal", "hours": 12.5, "lastPlayed": 0,
                   "achievements": { "unlocked": 15, "total": 15, "percent": 100 },
                   "header": "https://cdn.cloudflare.steamstatic.com/steam/apps/400/header.jpg",
                   "store": "https://store.steampowered.com/app/400/" }],
  "mostPlayed": [ "...same shape, top 8 by playtime, achievements may be null..." ]
}
```

- `perfect` = 100% achievement games (hours desc); `mostPlayed` = top 8 by hours.
- `achievements: null` = game has no publicly visible stats → shown as hours-only.
- Errors: `503` with a human message for missing env vars or a private profile; `502` if Steam is unreachable.
- Requires env vars `STEAM_API_KEY` + `STEAM_ID` (profile URL, vanity name, or SteamID64) — in `api/.env` locally (git-ignored, see `.env.example`) and Vercel env vars in production. Game details privacy must be Public on the Steam profile.

### `POST /api/contact`

Request: `{ "name": "...", "email": "...", "message": "..." }` — all required, else `400`.
Response: `{ "status": "sent" }`.

---

## 6. Data Flow & Environments

```
Browser ──> apiUrl(path) ──> API_BASE + path
```

| Environment | `API_BASE` resolution                              |
| ----------- | --------------------------------------------------- |
| Development | `VITE_API_URL` unset → `''` → Vite proxy `/api` → `http://127.0.0.1:5000` |
| Production  | Same-origin via Vercel rewrite (`/api/*` → api service); `VITE_API_URL` only needed if the backend moves to another host |

- All fetching is plain `useEffect` + `fetch` with `loading | ready | error` state — no data library.
- The API holds all content **in memory** (module-level constants). Editing content means editing `api/index.js` and redeploying. A database is a noted future step.

### Deployment (`vercel.json`)

```json
{
  "services": {
    "frontend": { "root": "frontend/" },
    "api": { "root": "api/", "framework": "express", "entrypoint": "index.js" }
  },
  "rewrites": [
    { "source": "/api/(.*)", "destination": { "service": "api" } },
    { "source": "/(.*)", "destination": { "service": "frontend" } }
  ]
}
```

The Express app is exported as `module.exports` (imported by Vercel) and only calls `listen()` when run directly (`require.main === module`) — so the same file works for both serverless and local `npm start`.

---

## 7. Design System

The visual identity is **industrial-brass / "Limbus Company"-inspired**: near-black backgrounds, dried-blood hairlines, bone-white text, crimson and aged-gold accents, with recurring machinery motifs (chains, gauges, gears, pipes, rivets).

### 7.1 Color tokens (`tailwind.config.js`)

| Token       | Hex       | Role                                    |
| ----------- | --------- | --------------------------------------- |
| `ink`       | `#0B0908` | Page background                         |
| `panel`     | `#161011` | Card / header background                |
| `border`    | `#3A1418` | Hairline borders (dried-blood red)      |
| `text`      | `#EDE6DD` | Primary text (warm bone white)          |
| `muted`     | `#8F7F77` | Secondary text (warm grey-brown)        |
| `crimson`   | `#C8202F` | Primary accent                          |
| `gold`      | `#B99456` | Secondary accent (aged brass — sparing) |

**Sin palette** (`colors.sin.*`) — color-codes Beyond Code categories:

| Sin       | Hex       |        | Sin       | Hex       |
| --------- | --------- | ------ | --------- | --------- |
| wrath     | `#D64545` |       | envy      | `#9B6FC4` |
| lust      | `#E08830` |       | gloom     | `#6FB8D9` |
| sloth     | `#D4B23C` |       | pride     | `#4A7FC7` |
| gluttony  | `#4CAF6D` |       |           |           |

### 7.2 Typography

| Role    | Font          | Usage                          |
| ------- | ------------- | ------------------------------ |
| display | **Cinzel**    | Headings, page titles          |
| body    | **Inter**     | Prose, UI text                 |
| mono    | **JetBrains Mono** | Code, technical accents   |

- Loaded via Google Fonts in `index.html` (Cinzel 500–700, Inter 400–600, JetBrains Mono 400–500).
- `max-w-prose` = `68ch` for readable line lengths.
- `index.html` bootstraps `bg-ink text-text font-body` on `<body>` so the palette applies before CSS loads.

### 7.3 Component styles (`index.css`)

| Class / kit          | Description                                                    |
| -------------------- | -------------------------------------------------------------- |
| `.card`              | Diagonal-cut clip-path panel: inset frame, dashed brass border, scanline texture, rivet |
| `.notch` / `.notch-sm` | Corner-cut shape utilities                                   |
| `.sinner-card*`      | Identity-card kit (photo + chain) for Home/About               |
| `.tab-num`           | Skewed numbered badge (project cards)                          |
| `.brass-plate`       | Engraved label plate                                           |
| `.btn-slant`         | Slanted action button                                          |
| `.pipe` / `.pipe-divider` | Brass pipe rail under header/footer and between sections  |
| `.rivet`, `.hazard-stripe`, `.glow-divider` | Industrial detailing          |
| `.window-frame`      | Home hero monitor frame                                        |
| `.paper-lines` / `.dog-ear` | Ruled-paper texture for About bio                       |
| `.rail-track`, `.steam-puff`, `.tagline-strip` | Header/footer flourishes   |

### 7.4 Motifs & animation

- **Chain** (`Chain.jsx`) — generative SVG of N interlocking links; props for size, link count, sway. Used in header, footer, page background, hero, identity card. Signature motif.
- **Gauge** (`Gauge.jsx`) — brass dial driven by `--needle` custom property; `value` 0→1 sweeps the needle 150°→390°. Doubles as carousel progress.
- **Coins** (`Coins.jsx`) — pure-CSS gold pips sized by `--coins`; ratings live in the `COIN COUNTS` table in `index.css` (edit CSS, not JS).
- **Gear** (`Gear.jsx`) — cog SVG with spin animation (currently unused; replaced by chains).
- Animations: `chain-sway`, `steam-rise`, `gear-spin`, `gauge` needle.
- **Accessibility:** all animation/transition durations are zeroed under `prefers-reduced-motion`; carousels fall back to manual mode, and decorative elements accept a `decorative`/`aria-hidden` prop.

### 7.5 Keyword markup

`utils/highlightText.jsx` → `renderKeywordText(text, accentClass)` splits on `{...}` and renders braced segments as accent-colored, semibold, dotted-underlined spans. Used in skill descriptions and notes — author content in the API with `{braces}` to highlight tools.

---

## 8. Frontend Components

| Component               | Purpose                                                              |
| ----------------------- | -------------------------------------------------------------------- |
| `Header`                | Sticky nav: RG badge + chain logo, desktop nav dots, mobile hamburger, pipe rail + steam vents |
| `Footer`                | Copyright, tech credits, mirrored pipe, decorative chain + gauge      |
| `PageHeader`            | Reusable page intro: gold eyebrow, Cinzel h1, muted description, pipe divider |
| `Chain`                 | Generative SVG chain (signature background/frame motif)              |
| `Gauge`                 | Brass pressure-gauge dial (decorative + carousel progress)           |
| `Gear`                  | Spinning cog (orphaned — kept for potential reuse)                   |
| `Coins`                 | CSS gold-coin rating pips                                            |
| `SkillSectionCarousel`  | Auto-cycling (6s) tabbed skill panel with gauges, coins, highlights  |
| `LanguageCarousel`      | Simpler language carousel (orphaned — Skills uses SkillSectionCarousel) |
| `SteamShowcase`         | Live Steam library block on `/beyond-code/games`: "Fully conquered" (100% achievements) + "Longest runs" (top 8 by hours, achievement progress bars) — fetches `GET /api/steam/games`, placeholder-fallback images |

**Orphaned files:** `pages/BeyondCode.jsx` (older single-page version, replaced by Hub + Category routes) and `components/LanguageCarousel.jsx` are not imported anywhere.

---

## 9. Local Development

```bash
# API (terminal 1)
cd api
npm install
cp .env.example .env  # fill in STEAM_API_KEY + STEAM_ID
npm start             # http://127.0.0.1:5000

# Frontend (terminal 2)
cd frontend
npm install
npm run dev          # http://localhost:5173  (proxies /api → :5000)
```

Frontend scripts: `dev`, `build`, `preview`.

---

## 10. Known Gaps / Future Work

- **Beyond Code images** — all categories now have real art: Steam CDN for games; local files in `frontend/public/images/beyond-code/<category-slug>/` for foods/shows/other-hobbies (see README for sources). Missing files fall back to `placeholder.svg`.
- **Steam showcase needs config** — works only after `STEAM_API_KEY`/`STEAM_ID` are set in `api/.env` (local) and Vercel env vars (deployed); until then the Games page shows a graceful "Steam stats are offline" note.
- **Contact form is a stub** — `POST /api/contact` only logs; wire it to Formspree/SendGrid/an email service or a database.
- **`/api/profile` unused** — no page fetches it (Home/About hardcode profile info).
- **In-memory content** — all data lives in `api/index.js`; move to a DB or headless CMS when content grows.
- **SEO/meta** — `index.html` has only charset + viewport; add description and Open Graph tags.
- **Orphaned code** — `pages/BeyondCode.jsx`, `components/LanguageCarousel.jsx`, `components/Gear.jsx` are unused; `Footer` has a name typo ("Rud Gabrie Ba-oy").
- **Repo hygiene** — root `package-lock.json` is an empty stub; a stray file literally named `git status` exists at the root (accidental shell redirection) and is safe to delete.
- **README live-demo link** still points at GitHub Pages; update to the Vercel URL.
