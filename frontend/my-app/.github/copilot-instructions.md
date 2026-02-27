# Copilot Instructions for YDRAY Skate Park React Project

## Project Overview
- This is a React SPA built with Vite, using React Router for navigation and MUI for UI components.
- The app manages skate events, shops, spots, images, and videos, with forms and list pages for each entity.
- Authentication is JWT-based, with tokens stored in localStorage and user context managed via `UserContext`.
- API requests use a custom Axios instance (`src/api/auth.js`) with automatic token injection.

## Key Architectural Patterns
- **Routing:** All routes are defined in `src/App.jsx` using nested routes. The `Navbar` is rendered for all main pages except login and add forms.
- **Context:** `UserContext` provides user state and login/logout logic. Use the `useUser` hook for accessing user data and actions.
- **Hooks:** Custom hooks in `src/hooks/` encapsulate logic for authentication (`useAuth`), images, skate events, shops, spots, and videos. Always use these hooks for data operations.
- **API Integration:** All API calls should use the Axios instance from `src/api/auth.js` to ensure proper authentication headers.
- **Forms & Lists:** Each entity (event, shop, spot, image, video) has a dedicated form and list page component in `src/components/`.

## Developer Workflows
- **Start Dev Server:** `npm run dev` (Vite)
- **Build:** `npm run build`
- **Preview Build:** `npm run preview`
- **Lint:** `npm run lint` (uses ESLint config in `eslint.config.js`)
- **No built-in tests** (as of Oct 2025)

## Conventions & Patterns
- **JWT Handling:** Store tokens in localStorage under `token`. Decode with `jwt-decode`.
- **User State:** Always update user state via context, not local component state.
- **API URLs:** All API endpoints are relative to `http://localhost:8080`.
- **Error Handling:** Use error state in hooks (e.g., `useAuth`) and display messages in UI components.
- **Component Structure:** Keep forms and list pages separate. Use MUI components for UI consistency.
- **External Libraries:**
  - MUI (`@mui/material`, `@mui/icons-material`)
  - Leaflet for maps (`react-leaflet`, `leaflet`)
  - Axios for HTTP
  - jwt-decode for JWT parsing

## Example Patterns
- **Login Flow:** Use `useAuth().login(username, password)`; token is stored and user context updated.
- **Protected API Call:** Use Axios from `src/api/auth.js`—token is injected automatically.
- **User Access:** `const { user } = useUser();`

## Key Files & Directories
- `src/App.jsx` — Routing and main layout
- `src/components/` — All UI components
- `src/api/auth.js` — Axios instance for API
- `src/contexts/UserContext.jsx` — User context provider
- `src/hooks/` — Custom hooks for business logic

---

If any conventions or workflows are unclear or missing, please provide feedback to improve these instructions.