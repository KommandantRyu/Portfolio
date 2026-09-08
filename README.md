# Portfolio

A personal portfolio site: React + Vite + Tailwind CSS on the frontend,
Express serving a small JSON API on the backend.

```
portfolio/
├── frontend/          React + Vite + Tailwind app
│   └── src/
│       ├── pages/     Home, About, Projects, Skills, Contact
│       └── components/
├── api/               Express API, deployed as a Vercel service
│   ├── index.js
│   └── package.json
└── vercel.json        Ties the two together for a single deployment
```

## 1. Run the backend

```bash
cd api
npm install
npm start
```

The API runs at `http://localhost:5000`. Routes:

| Method | Route           | Purpose                        |
|--------|-----------------|---------------------------------|
| GET    | /api/profile    | Name, role, tagline             |
| GET    | /api/projects   | List of projects                |
| GET    | /api/skills     | Skills grouped by category      |
| POST   | /api/contact    | Receive a contact form message  |

## 2. Run the frontend

In a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Vite starts at `http://localhost:5173` and proxies any `/api/*` request
to the Express server on port 5000 (see `vite.config.js`), so the two run
side by side without a CORS headache in development.

## 3. Make it yours

- `api/index.js` — swap the `PROFILE`, `PROJECTS`, and `SKILLS`
  objects for your own details. Wire the `/api/contact` route to an
  email service or database when you're ready to go live.
- `frontend/src/pages/About.jsx` — one file per page. Copy for real content
  (bio, work history, project write-ups).
- **Your photo** — drop an image file (e.g. `me.jpg`) into
  `frontend/public/`, then in `About.jsx` and `Sidebar.jsx` change
  `src="/images/profile-placeholder.svg"` to `src="/me.jpg"`. Anything in
  `public/` is served as-is at that same path, so `frontend/public/me.jpg`
  becomes available at `/me.jpg`.
- `frontend/src/components/Sidebar.jsx` — update the name and add or
  remove nav links here; the page list is a single array at the top
  of the file.
- `frontend/tailwind.config.js` — the color palette (`ink`, `panel`,
  `amber`, `teal`, etc.) lives here if you want a different look.

## 4. Deploy everything to Vercel

This project uses **Vercel Services** to run the React frontend and the
Express backend from one Vercel project on one domain.

`vercel.json` at the repo root defines two services (`frontend` and
`api`) and routes public traffic to each:

```json
{
  "services": {
    "frontend": { "root": "frontend/" },
    "api": { "root": "api/" }
  },
  "rewrites": [
    { "source": "/api/(.*)", "destination": { "service": "api" } },
    { "source": "/(.*)", "destination": { "service": "frontend" } }
  ]
}
```

Express needs no extra `entrypoint` setting — Vercel detects `api/index.js`
automatically because it exports the Express `app` as the module's default
export (see the bottom of `api/index.js`).

1. Push the whole `portfolio/` folder (including `vercel.json`) to a
   GitHub repo.
2. Go to [vercel.com](https://vercel.com) → **Add New** → **Project** →
   import that repo. Leave **Root Directory** as the repo root (not
   `frontend/`) — Vercel needs to see both `frontend/` and `api/` to
   build them as separate services.
3. **Before deploying**, go to the project's **Settings → Build and
   Deployment** and set **Framework Preset** to **Services**. This step
   is required — Vercel only builds a project as multiple services when
   this is set *and* `vercel.json` has a `services` key. Skipping it is
   the single most common reason a backend silently doesn't appear.
4. Deploy. Vercel builds `frontend/` (Vite) and `api/` (Express)
   independently, then serves both from one URL: `/api/*` routes to the
   Express service, everything else routes to the built React app.
5. Visit `https://your-project.vercel.app/api/projects` to confirm the
   backend responds with JSON.

Because both services share a domain, `fetch('/api/...')` in the
frontend just works in production with no environment variables needed
— the same relative paths used in local development.

### Running everything locally the Vercel way (optional)

```bash
npm i -g vercel   # once
vercel dev -L
```

This runs both services together on your machine the same way Vercel
runs them in production. You can also still run them separately in two
terminals as described in steps 1–2 above — both approaches work.

### Notes

- Vercel Services are in Beta at the time of writing. If the Framework
  Preset dropdown doesn't show "Services" yet, check
  [vercel.com/docs/services](https://vercel.com/docs/services) for the
  current rollout status.
- The in-memory `PROJECTS` / `SKILLS` data in `api/index.js` is fixed
  content you edit in code — it doesn't persist anything between
  requests. That's expected for a portfolio; add a real database only
  if you want contact-form submissions to be saved somewhere.
- Express apps on Vercel render their own error pages, which can leave
  a function in a stuck state if an error isn't handled. The routes
  here are simple enough that this isn't a concern, but keep it in mind
  if you add more complex logic later — wrap risky code in `try/catch`.
