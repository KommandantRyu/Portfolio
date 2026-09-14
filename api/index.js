/**
 * Express backend for the portfolio site.
 *
 * Routes:
 *   GET  /api/profile      -> basic profile info
 *   GET  /api/projects     -> list of projects
 *   GET  /api/skills       -> skills grouped by category
 *   GET  /api/beyond-code  -> hobby categories for the Beyond Code page
 *   POST /api/contact      -> receive a contact form submission
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
  languages: ['JavaScript', 'TypeScript', 'SQL'],
  frontend: ['React', 'Tailwind CSS', 'Vite'],
  backend: ['Express', 'Flask ', 'FastAPI'],
  tools: ['Git', 'Docker', 'Linux'],
};

const BEYOND_CODE = [
  {
    title: 'Foods',
    emoji: '🍜',
    items: [
      'Bacon Cheese Burgers',
      'Grilled Porks',
      'Zarks',
    ],
  },
  {
    title: 'Games',
    emoji: '🎮',
    items: [
      "Limbus Company",
      'Dark Souls 2: Scholar of The First Sin',
      'Psychological Horror',
    ],
  },
  {
    title: 'Shows',
    emoji: '🎬',
    items: [
      "The Avengers Assemble",
      'Iron Man',
      "Panty, Stockings And Garterbelt",
    ],
  },
  {
    title: 'Other hobbies',
    emoji: '📖',
    items: [
      'Fencing',
      'Writing',
      "Reading",
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
