# E-Commerce Project: Docker & Backend Migration Notemap

## 📦 Phase 1: Dockerization Setup
- [x] Create `Dockerfile` for the Vite/React frontend.
- [x] Create `.dockerignore` to keep image sizes small.
- [x] Create `docker-compose.yml` with `frontend` and `db` services.
- [ ] Test the frontend container locally: `docker-compose up --build frontend`.

## 🗄️ Phase 2: Database Migration
- [ ] Review the existing SQL migrations in `supabase/migrations/` to ensure they are compatible with standard PostgreSQL.
- [ ] Map the SQL scripts into the Postgres container (handled via volumes in `docker-compose.yml`).
- [ ] Start the database: `docker-compose up -d db`.
- [ ] Verify tables (`categories`, `products`, etc.) are created successfully.

## 🔌 Phase 3: Backend API (Crucial Step)
*Since Supabase acts as a BaaS, moving away from it requires a backend to serve the frontend.*
- [ ] Choose a backend framework (e.g., Node.js with Express/NestJS or Python with FastAPI).
- [ ] Initialize the backend directory and Dockerize it.
- [ ] Add the new backend service to `docker-compose.yml`.
- [ ] Replicate Supabase Auth logic (consider using JWTs and standard password hashing, or an alternative like NextAuth/Passport).
- [ ] Create REST/GraphQL endpoints for:
  - [ ] Products (`productService.ts`)
  - [ ] Cart & Orders (`cartService.ts`, `orderService.ts`)
  - [ ] Reviews (`reviewService.ts`)

## 🛠️ Phase 4: Frontend Refactoring
- [ ] Remove `@supabase/supabase-js` from `package.json`.
- [ ] Delete or heavily refactor `src/lib/supabase.ts`.
- [ ] Update `authContext.tsx` to use the new backend auth endpoints.
- [ ] Refactor all service files (`src/services/*.ts`) to use `fetch` or `axios` instead of Supabase client queries.
- [ ] Update `.env` (or Vite environment variables) to point to the new backend URL instead of the Supabase project URL.

## 🚀 Phase 5: Final Testing & Deployment
- [ ] Run the full stack: `docker-compose up --build`.
- [ ] Test user registration and login.
- [ ] Test product fetching, cart additions, and checkout flow.
- [ ] Prepare for production (configure reverse proxy, SSL/HTTPS, and secure DB credentials).