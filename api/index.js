/**
 * Express backend for the portfolio site.
 *
 * Routes:
 *   GET  /api/profile        -> basic profile info
 *   GET  /api/projects       -> list of projects
 *   GET  /api/certificates   -> certificates & seminars list
 *   GET  /api/skill-sections -> Languages/Frontend/Backend/IoT/Tools skill panel
 *   GET  /api/beyond-code    -> hobby categories for the Beyond Code page
 *   POST /api/contact        -> receive a contact form submission
 *
 * Local development:
 *   cd api
 *   npm install
 *   copy .env.example to .env and fill in STEAM_API_KEY + STEAM_ID
 *   npm start
 * Server starts on http://127.0.0.1:5000
 *
 * On Vercel, this file is picked up automatically (as part of the "api"
 * service defined in vercel.json) because it exports the Express app as
 * the module's default export — no extra config needed.
 */

const express = require('express');
const cors = require('cors');
const steam = require('./steam');

// Loads api/.env when run locally (no-op on Vercel, where env vars are set
// in the project dashboard instead).
require('dotenv').config();

const app = express();
app.use(express.json());

// Frontend and backend share the same domain once deployed on Vercel, so
// this mainly matters for local development or testing the API standalone.
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || '*';
app.use(cors({ origin: ALLOWED_ORIGIN === '*' ? true : ALLOWED_ORIGIN }));

// ---------------------------------------------------------------------------
// In-memory data. Replace with a database later on.
// ---------------------------------------------------------------------------

const PROFILE = {
  name: 'Rud Gabriel Ba-oy',
  role: 'Software Developer',
  tagline: "I build software that turns hard problems into simple interfaces.",
  location: 'Iloilo City, Philippines',
};

const PROJECTS = [
  {
    id: 1,
    title: 'Allora',
    description: 'Event planning platform — customers book service vendors for weddings, birthdays & corporate events, and AI flags what is missing from the plan',
    tech: ['Next.js', 'Supabase', 'TypeScript'],
    link: 'https://github.com/maverickbarrientos/Allora',
  },

];

// Skill sections for the auto-cycling skill panel. Each section is one
// "slot": a short description (tools wrapped in {braces} render as
// highlighted keywords) plus a list of entries. `coins` (1-3) marks how
// central each tool is to my day-to-day work — placeholder values, edit freely.
const SKILL_SECTIONS = [
  {
    id: 'languages',
    title: 'Languages',
    icon: '📜',
    description:
      'The languages under every layer of the stack: {JavaScript}, {TypeScript}, and {SQL}.',
    entries: [
      {
        name: 'JavaScript',
        note: 'Primary language across the stack — {React} on the frontend, {Express} on the backend, same syntax the whole way through.',
      },
      {
        name: 'TypeScript',
        note: 'Reached for on larger codebases where {type safety} earns its keep, especially logic shared between frontend and backend.',
      },
      {
        name: 'SQL',
        note: 'Querying and structuring data in {PostgreSQL} — schema design, joins, and everyday reads and writes.',
      },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    icon: '🖥️',
    description:
      'Building interfaces with {React}, styled through {Tailwind CSS}, bundled and served in development with {Vite}.',
    entries: [
      { name: 'React', note: 'Component-driven interfaces and client-side routing.' },
      { name: 'Tailwind CSS', note: 'Utility-first styling, with custom design tokens.' },
      { name: 'Vite', note: 'Dev server and production bundler.' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    icon: '⚙️',
    description:
      'Serving APIs with {Express}, with {Flask} and {FastAPI} for Python-side services, backed by {PostgreSQL}.',
    entries: [
      { name: 'Express', note: 'REST APIs on Node.js.' },
      { name: 'Flask', note: 'Lightweight Python web services.' },
      { name: 'FastAPI', note: 'Async Python APIs with typed request handling.' },
      { name: 'PostgreSQL', note: 'Relational data storage.' },
    ],
  },
  {
    id: 'iot',
    title: 'IoT',
    icon: '🔌',
    description:
      'Prototyping embedded systems on {Arduino} and {Raspberry Pi}, with {MQTT} for device-to-device messaging.',
    entries: [
      { name: 'Arduino', note: 'Microcontroller prototyping and sensor input.' },
      { name: 'Raspberry Pi', note: 'Single-board computing for gateways and edge tasks.' },
      { name: 'MQTT', note: 'Lightweight publish/subscribe messaging between devices.' },
    ],
  },
  {
    id: 'tools',
    title: 'Tools',
    icon: '🛠️',
    description:
      'Day-to-day workflow runs on {Git} for version control, {Docker} for environments, and {Linux}.',
    entries: [
      { name: 'Git', note: 'Version control and collaboration.' },
      { name: 'Docker', note: 'Reproducible development environments.' },
      { name: 'Linux', note: 'Daily-driver command line and servers.' },
    ],
  },
];

const BEYOND_CODE = [
  {
    slug: 'foods',
    title: 'Foods',
    emoji: '🍜',
    sin: 'gluttony',
    detailLabel: 'restaurant',
    items: [
      { name: 'Bacon Cheese Burgers', image: '/images/beyond-code/foods/bacon-cheese-burger.jpg', detail: 'Anywhere that piles on crispy bacon — greasy, no regrets' },
      { name: 'Grilled Porks', image: '/images/beyond-code/foods/grilled-pork.jpg', detail: 'Charcoal-grilled pork — best straight off the grill' },
      { name: 'Zarks', image: '/images/beyond-code/foods/zarks.jpg', detail: 'Oversized burgers — a Visayas chain that started in Cebu' },
    ],
  },
  {
    slug: 'games',
    title: 'Games',
    emoji: '🎮',
    sin: 'wrath',
    detailLabel: 'achievement',
    // Steam CDN artwork — /steam/apps/{appid}/header.jpg
    items: [
      { name: 'Limbus Company', image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1973530/header.jpg', detail: 'Grinding through the story one sinner at a time' },
      { name: 'Dark Souls 2: Scholar of The First Sin', image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/335300/header.jpg', detail: 'Survived Drangleic — every boss was a lesson in patience' },
      { name: 'Signalis', image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1262350/header.jpg', detail: 'A short, haunting trip through retro sci-fi horror' },
    ],
  },
  {
    slug: 'shows',
    title: 'Shows',
    emoji: '🎬',
    sin: 'sloth',
    detailLabel: 'why I like it',
    items: [
      { name: 'The Avengers Assemble', image: '/images/beyond-code/shows/avengers-assemble.jpg', detail: 'The team-up that kicked off the MCU — pure blockbuster comfort' },
      { name: 'Iron Man', image: '/images/beyond-code/shows/iron-man.jpg', detail: 'RDJ as Tony Stark — the suit, the snark, the start of it all' },
      { name: 'Panty, Stocking & Garterbelt', image: '/images/beyond-code/shows/panty-stocking-garterbelt.jpg', detail: 'Chaotic, stylish, and unapologetically weird — Gainax at its loudest' },
    ],
  },
  {
    slug: 'other-hobbies',
    title: 'Other hobbies',
    emoji: '📖',
    sin: 'pride',
    detailLabel: 'specifics',
    items: [
      { name: 'Fencing', image: '/images/beyond-code/other-hobbies/fencing.jpg', detail: 'Recreational — footwork drills and friendly bouts' },
      { name: 'Writing', image: '/images/beyond-code/other-hobbies/writing.jpg', detail: 'Poems — mostly free verse, written late at night' },
      { name: 'Reading', image: '/images/beyond-code/other-hobbies/reading.jpg', detail: 'Classics — old novels, older ideas, still relevant' },
    ],
  },
];

// Certificates & seminars for the /certificates page. Items render in array
// order, so put the most important ones first. `image` is a path into
// frontend/public/images/certificates/ (drop the scan there) or null; missing
// files fall back to placeholder.svg on the frontend. `link` (the PDF or
// verification URL) and `note` are optional.
const CERTIFICATES = [
  {
    id: 1,
    title: 'Cybersecurity and Cloud Fundamentals 1.0',
    type: 'certificate', // 'certificate' | 'seminar'
    issuer: 'John Whittle, COO',
    date: '2026',
    image: null, // PDFs can't render as <img> — the placeholder serves as the thumbnail
    link: '/images/certificates/certificate.pdf',
    note: 'Course completion certificate issued 10/20/26',
  },
  {
    id: 2,
    title: 'Introduction to Next Generation Firewall 1.0',
    type: 'certificate',
    issuer: 'John Whittle, COO',
    date: '2026',
    image: null,
    link: '/images/certificates/certificate2.pdf',
    note: 'Course completion certificate issued 10/20/26',
  },
];

// ---------------------------------------------------------------------------
// Routes
// ---------------------------------------------------------------------------

app.get('/api/profile', (req, res) => {
  res.json(PROFILE);
});

app.get('/api/projects', (req, res) => {
  res.json(PROJECTS);
});

app.get('/api/certificates', (req, res) => {
  res.json(CERTIFICATES);
});

app.get('/api/skill-sections', (req, res) => {
  res.json(SKILL_SECTIONS);
});

app.get('/api/beyond-code', (req, res) => {
  res.json(BEYOND_CODE);
});

// Steam library highlights (perfect games + longest playtime). Data is
// fetched from the Steam Web API and cached in memory by api/steam.js.
app.get('/api/steam/games', async (req, res) => {
  try {
    res.json(await steam.getShowcase());
  } catch (err) {
    if (err instanceof steam.SteamError && (err.kind === 'config' || err.kind === 'privacy')) {
      return res.status(503).json({ error: err.message });
    }
    res.status(502).json({ error: 'Steam is unreachable right now — try again in a few minutes.' });
  }
});

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body || {};

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return res.status(400).json({ error: 'name, email, and message are all required' });
  }

  // TODO: send an email, save to a database, or forward to a service
  // like Formspree / SendGrid instead of just logging (console.log output
  // ends up in Vercel's function logs, which is fine for testing but not
  // a real inbox).
  console.log(`New contact message from ${name} <${email}>:\n${message}\n`);

  res.json({ status: 'sent' });
});

// Export for Vercel (imported directly, never run as a script there).
module.exports = app;

// Only start a listening server when run directly, e.g. `node index.js`
// or `npm start` — this branch never runs on Vercel.
if (require.main === module) {
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`API listening on http://127.0.0.1:${port}`);
  });
}
