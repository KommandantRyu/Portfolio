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
  location: 'Iloilo City, Philippines',
};

const PROJECTS = [
  
];

const SKILLS = {
  languages: ['JavaScript', 'TypeScript', 'SQL'],
  frontend: ['React', 'Tailwind CSS', 'Vite'],
  backend: ['Express', 'Flask', 'PostgreSQL'],
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
