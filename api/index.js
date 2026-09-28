/**
 * Express backend for the portfolio site.
 *
 * Routes:
 *   GET  /api/profile        -> basic profile info
 *   GET  /api/projects       -> list of projects
 *   GET  /api/skill-sections -> Languages/Frontend/Backend/IoT/Tools skill panel
 *   GET  /api/beyond-code    -> hobby categories for the Beyond Code page
 *   POST /api/contact        -> receive a contact form submission
 *
 * Local development:
 *   cd api
 *   npm install
 *   npm start
 * Server starts on http://127.0.0.1:5000
 *
 * On Vercel, this file is picked up automatically (as part of the "api"
 * service defined in vercel.json) because it exports the Express app as
 * the module's default export — no extra config needed.
 */

const express = require('express');
const cors = require('cors');

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
    title: 'Project One',
    description: 'A short, plain-language description of what this project does and the problem it solves.',
    tech: ['React', 'Express', 'FastAPI'],
    link: 'https://github.com/yourusername/project-one',
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
        coins: 3,
        note: 'Primary language across the stack — {React} on the frontend, {Express} on the backend, same syntax the whole way through.',
      },
      {
        name: 'TypeScript',
        coins: 2,
        note: 'Reached for on larger codebases where {type safety} earns its keep, especially logic shared between frontend and backend.',
      },
      {
        name: 'SQL',
        coins: 2,
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
      { name: 'React', coins: 3, note: 'Component-driven interfaces and client-side routing.' },
      { name: 'Tailwind CSS', coins: 3, note: 'Utility-first styling, with custom design tokens.' },
      { name: 'Vite', coins: 2, note: 'Dev server and production bundler.' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    icon: '⚙️',
    description:
      'Serving APIs with {Express}, with {Flask} and {FastAPI} for Python-side services, backed by {PostgreSQL}.',
    entries: [
      { name: 'Express', coins: 3, note: 'REST APIs on Node.js.' },
      { name: 'Flask', coins: 2, note: 'Lightweight Python web services.' },
      { name: 'FastAPI', coins: 2, note: 'Async Python APIs with typed request handling.' },
      { name: 'PostgreSQL', coins: 2, note: 'Relational data storage.' },
    ],
  },
  {
    id: 'iot',
    title: 'IoT',
    icon: '🔌',
    description:
      'Prototyping embedded systems on {Arduino} and {Raspberry Pi}, with {MQTT} for device-to-device messaging.',
    entries: [
      { name: 'Arduino', coins: 2, note: 'Microcontroller prototyping and sensor input.' },
      { name: 'Raspberry Pi', coins: 2, note: 'Single-board computing for gateways and edge tasks.' },
      { name: 'MQTT', coins: 1, note: 'Lightweight publish/subscribe messaging between devices.' },
    ],
  },
  {
    id: 'tools',
    title: 'Tools',
    icon: '🛠️',
    description:
      'Day-to-day workflow runs on {Git} for version control, {Docker} for environments, and {Linux}.',
    entries: [
      { name: 'Git', coins: 3, note: 'Version control and collaboration.' },
      { name: 'Docker', coins: 2, note: 'Reproducible development environments.' },
      { name: 'Linux', coins: 2, note: 'Daily-driver command line and servers.' },
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
      { name: 'Bacon Cheese Burgers', image: '/images/beyond-code/placeholder.svg', detail: 'Add the restaurant or spot here' },
      { name: 'Grilled Porks', image: '/images/beyond-code/placeholder.svg', detail: 'Add the restaurant or spot here' },
      { name: 'Zarks', image: '/images/beyond-code/placeholder.svg', detail: 'Add the restaurant or spot here' },
    ],
  },
  {
    slug: 'games',
    title: 'Games',
    emoji: '🎮',
    sin: 'wrath',
    detailLabel: 'achievement',
    items: [
      { name: 'Limbus Company', image: '/images/beyond-code/placeholder.svg', detail: 'Add an achievement or highlight here' },
      { name: 'Dark Souls 2: Scholar of The First Sin', image: '/images/beyond-code/placeholder.svg', detail: 'Add an achievement or highlight here' },
      { name: 'Psychological Horror', image: '/images/beyond-code/placeholder.svg', detail: 'Add an achievement or highlight here' },
    ],
  },
  {
    slug: 'shows',
    title: 'Shows',
    emoji: '🎬',
    sin: 'sloth',
    detailLabel: 'why I like it',
    items: [
      { name: 'The Avengers Assemble', image: '/images/beyond-code/placeholder.svg', detail: 'Add a short note here' },
      { name: 'Iron Man', image: '/images/beyond-code/placeholder.svg', detail: 'Add a short note here' },
      { name: 'Panty, Stocking & Garterbelt', image: '/images/beyond-code/placeholder.svg', detail: 'Add a short note here' },
    ],
  },
  {
    slug: 'other-hobbies',
    title: 'Other hobbies',
    emoji: '📖',
    sin: 'pride',
    detailLabel: 'specifics',
    items: [
      { name: 'Fencing', image: '/images/beyond-code/placeholder.svg', detail: 'Add specifics — weapon, club, level' },
      { name: 'Writing', image: '/images/beyond-code/placeholder.svg', detail: 'Add specifics — genre, project' },
      { name: 'Reading', image: '/images/beyond-code/placeholder.svg', detail: 'Add specifics — favorite genre or authors' },
    ],
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

app.get('/api/skill-sections', (req, res) => {
  res.json(SKILL_SECTIONS);
});

app.get('/api/beyond-code', (req, res) => {
  res.json(BEYOND_CODE);
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
