/**
 * Express backend for the portfolio site.
 *
 * Routes:
 *   GET  /api/profile        -> basic profile info
 *   GET  /api/projects       -> list of projects
 *   GET  /api/skills         -> languages, for the language carousel
 *   GET  /api/skill-sections -> Frontend/Backend/IoT/Tools skill-card carousel
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

const SKILLS = {
  languages: [
    {
      name: 'JavaScript',
      icon: '📜',
      weight: 3,
      description:
        'Primary language across the stack — {React} on the frontend, {Express} on the backend, same syntax the whole way through.',
    },
    {
      name: 'TypeScript',
      icon: '🔷',
      weight: 2,
      description:
        'Reached for on larger codebases where {type safety} earns its keep, especially logic shared between frontend and backend.',
    },
    {
      name: 'SQL',
      icon: '🗄️',
      weight: 2,
      description:
        'Querying and structuring data in {PostgreSQL} — schema design, joins, and everyday reads and writes.',
    },
  ],
};

// Domain sections for the Skill-card carousel — each is one "slot," styled
// after a skill detail panel: a short technical description with the
// actual tools called out as highlighted keywords.
const SKILL_SECTIONS = [
  {
    id: 'frontend',
    title: 'Frontend',
    icon: '🖥️',
    weight: 3,
    tools: ['React', 'Tailwind CSS', 'Vite'],
    description:
      'Building interfaces with {React}, styled through {Tailwind CSS}, bundled and served in development with {Vite}.',
  },
  {
    id: 'backend',
    title: 'Backend',
    icon: '⚙️',
    weight: 3,
    tools: ['Express', 'Flask', 'FastAPI', 'PostgreSQL'],
    description:
      'Serving APIs with {Express}, with {Flask} and {FastAPI} for Python-side services, backed by {PostgreSQL}.',
  },
  {
    id: 'iot',
    title: 'IoT',
    icon: '🔌',
    weight: 2,
    tools: ['Arduino', 'Raspberry Pi', 'MQTT'],
    description:
      'Prototyping embedded systems on {Arduino} and {Raspberry Pi}, with {MQTT} for device-to-device messaging.',
  },
  {
    id: 'tools',
    title: 'Tools',
    icon: '🛠️',
    weight: 1,
    tools: ['Git', 'Docker', 'Linux'],
    description:
      'Day-to-day workflow runs on {Git} for version control, {Docker} for environments, and {Linux}.',
  },
];

const BEYOND_CODE = [
  {
    slug: 'foods',
    title: 'Foods',
    emoji: '🍜',
    accent: 'gold',
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
    accent: 'crimson',
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
    accent: 'emerald',
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
    accent: 'border',
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

app.get('/api/skills', (req, res) => {
  res.json(SKILLS);
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
