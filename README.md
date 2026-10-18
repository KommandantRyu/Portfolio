# Portfolio

My personal portfolio website — a full-stack MERN-style project with a live deployment.

## About

A React + Vite single-page frontend backed by a small Express JSON API. Built to showcase my projects and serve as my presence on the web.

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Node.js, Express
- **Deployment:** Vercel

## Features

- 🎨 Responsive design with Tailwind CSS
- ⚡ Fast builds and hot reload via Vite
- 🔌 Express API serving project data as JSON
- 🎮 Live Steam showcase on the Beyond Code → Games page — fully-conquered (100% achievements) games and longest-played hours, pulled from the Steam Web API and cached for 30 min
- 🖼️ Beyond Code categories with real cover art (Steam CDN for games; drop your own images into `frontend/public/images/beyond-code/`)
- 🚀 Deployed on Vercel with `vercel.json` routing config

## Getting Started

```bash
# install dependencies
npm install

# run the frontend (Vite)
cd frontend
npm run dev

# run the API
cd ../api
cp .env.example .env   # then fill in STEAM_API_KEY + STEAM_ID
npm start
```

## Steam setup

The Games page pulls your real library from the [Steam Web API](https://steamcommunity.com/dev/apikey):

1. Get an API key at [steamcommunity.com/dev/apikey](https://steamcommunity.com/dev/apikey)
2. `cd api && cp .env.example .env`, then set:
   - `STEAM_API_KEY` — your key (never commit `.env`)
   - `STEAM_ID` — your profile URL (e.g. `steamcommunity.com/id/yourname`), vanity name, or 17-digit SteamID64
3. Set **Game details → Public** on your Steam profile (Edit Profile → Privacy Settings)
4. Deployed on Vercel: set the same two vars in the project's Environment Variables

Note: your API key is like a password — don't paste it into frontend code or commits.

## Live Demo

👉 [kommandantryu.github.io/Portfolio](https://kommandantryu.github.io/Portfolio) *(update this link if you deploy elsewhere)*

## Image credits

- **Games:** cover art via [Steam CDN](https://store.steampowered.com) (`/steam/apps/{appid}/header.jpg`)
- **Foods / Other hobbies:** photos from [Wikimedia Commons](https://commons.wikimedia.org) (CC BY-SA / CC0 — burger, grilled pork, fencing, writing, reading photos; Zark's storefront by the Commons uploader)
- **Shows:** posters/promo art from [Wikipedia](https://en.wikipedia.org) (fair-use, property of their respective studios — Avengers, Iron Man, Panty & Stocking)

## Author

**Rud Gabriel** — [KommandantRyu](https://github.com/KommandantRyu)
