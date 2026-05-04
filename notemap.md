# 🛒 E-Commerce Project: Architecture Migration History

## 📖 Log: The Great Supabase Exodus
*This document tracks the transition from a managed Supabase backend to a fully self-hosted Dockerized stack.*

### ✅ Phase 1: Docker Initialization
- **Action:** Created `docker-compose.yml`.
- **Details:** Set up a 3-tier architecture using Docker Compose:
  1. `db`: Standard PostgreSQL 15 container.
  2. `api`: Custom Node.js/Express backend container.
  3. `frontend`: Vite/React app served via Nginx.
- **Action:** Created `Dockerfile` in the root for the Vite frontend.
- **Action:** Created `init.sql` to automatically map database tables (`users`, `categories`, `products`) on the first Docker run.

### ✅ Phase 2: Custom API (Backend) Built
- **Action:** Created `/api` directory.
- **Details:** Built a custom Node.js/Express server to replace Supabase's BaaS functionality.
  - Set up `multer` to handle local image uploads directly to an `/api/uploads` volume.
  - Created endpoints for `/auth/login`, `/auth/register`, and `/products`.
  - Added support for both local image uploads (`imageFile`) and external links (`imageLink`).
  - Added JWT authentication and bcrypt password hashing.

### ✅ Phase 3: Frontend Service Refactoring
- **Action:** Removed `@supabase/supabase-js` from `package.json`.
- **Action:** Deleted `src/lib/supabase.ts` and the `supabase/` migrations folder.
- **Action:** Created `.env` file to toggle `VITE_API_URL` between `http://localhost:5000` and production.
- **Action:** Rewrote all frontend services to use standard `fetch` API:
  - `authService.ts`: Now uses JWTs and local storage.
  - `productService.ts`: Now uses `FormData` to send text and image files simultaneously.
  - `cartService.ts`, `orderService.ts`, `reviewService.ts`: Updated to pass JWT Bearer tokens in headers.

### 🔄 Phase 4: Current Status & Troubleshooting
- [x] Run `npm uninstall @supabase/supabase-js`
- [x] Run `npm install` for local IntelliSense.
- [x] Encountered `docker-compose` CommandNotFoundException in PowerShell.
- [x] **Fix Applied:** Switched from legacy `docker-compose` (hyphen) to modern Docker Compose V2 syntax: `docker compose up --build`.
- [ ] Execute `docker compose up --build`.
- [ ] Verify image uploads are saving to the `api/uploads` folder locally.

### 🔮 Phase 5: Future Enhancements (To-Do)
- [ ] Implement the backend API endpoints for Cart operations (`/cart`).
- [ ] Implement the backend API endpoints for Order operations (`/orders`).
- [ ] Implement the backend API endpoints for Reviews (`/reviews`).
- [ ] Set up a persistent volume for the Postgres database so data isn't lost if the container drops.
- [ ] Add input validation (e.g., Zod or Joi) to the Express API.