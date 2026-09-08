const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());


const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || '*';
app.use(cors({ origin: ALLOWED_ORIGIN === '*' ? true : ALLOWED_ORIGIN }));



const PROFILE = {
  name: 'Rud Gabriel Ba-oy',
  role: 'Software Developer',
  tagline: "I build software that turns hard problems into simple interfaces.",
  location: 'Your City, Country',
};

const PROJECTS = [
  {
    id: 1,
    title: 'Project One',
    description: 'A short, plain-language description of what this project does and the problem it solves.',
    tech: ['React', 'Express', 'PostgreSQL'],
    link: 'https://github.com/yourusername/project-one',
  },
  {
    id: 2,
    title: 'Project Two',
    description: 'A short, plain-language description of what this project does and the problem it solves.',
    tech: ['Node.js', 'Docker'],
    link: 'https://github.com/yourusername/project-two',
  },
  {
    id: 3,
    title: 'Project Three',
    description: 'A short, plain-language description of what this project does and the problem it solves.',
    tech: ['JavaScript'],
    link: '',
  },
  {
    id: 4,
    title: 'Project Four',
    description: 'A short, plain-language description of what this project does and the problem it solves.',
    tech: ['React Native'],
    link: '',
  },
];

const SKILLS = {
  languages: ['JavaScript', 'TypeScript', 'SQL'],
  frontend: ['React', 'Tailwind CSS', 'Vite'],
  backend: ['Express', 'REST APIs', 'PostgreSQL'],
  tools: ['Git', 'Docker', 'Linux'],
};


app.get('/api/profile', (req, res) => {
  res.json(PROFILE);
});

app.get('/api/projects', (req, res) => {
  res.json(PROJECTS);
});

app.get('/api/skills', (req, res) => {
  res.json(SKILLS);
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
