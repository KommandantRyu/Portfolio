// In development, VITE_API_URL is unset and requests go through the Vite
// proxy defined in vite.config.js (relative "/api/..." -> localhost:5000).
//
// In production (Vercel), set VITE_API_URL to your deployed backend's URL
// (e.g. https://your-backend.onrender.com) as an environment variable.
export const API_BASE = import.meta.env.VITE_API_URL || ''

export function apiUrl(path) {
  return `${API_BASE}${path}`
}
