# Cinevault

A Netflix-style streaming discovery website, built to learn full-stack web development.

## Tech stack
- Next.js (App Router), React, TypeScript
- Tailwind CSS
- PostgreSQL + Prisma (coming soon)
- TMDB API for movie and TV data
- AWS deployment (coming soon)

## Getting started
1. Install dependencies: `npm install`
2. Copy `.env.example` to `.env.local` and add your TMDB API key
3. Start the dev server: `npm run dev`
4. Open http://localhost:3000
## Run with Docker
1. Copy `.env.example` to `.env.local` and add your TMDB API key and a random `BETTER_AUTH_SECRET`
2. Run `docker compose --env-file .env.local up --build`
3. Open http://localhost:8080

## Roadmap
- [x] Step 1: Project setup
- [x] Step 2: Layout and dark theme
- [x] Step 3: TMDB integration and home page
- [x] Step 4: Browse, search and detail pages
- [x] Step 5: Database and authentication
- [x] Step 6: Watchlist and continue watching
- [x] Step 7: Watch page
- [x] Step 8: Docker and CI
- [ ] Step 9: AWS deployment
- [ ] Step 10: Testing and polish

## Attribution
This product uses the TMDB API but is not endorsed or certified by TMDB.