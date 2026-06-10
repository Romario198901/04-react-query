# React Query Movie Search

A Vite + React + TypeScript app for searching movies via The Movie Database (TMDB). The project uses `@tanstack/react-query` for data fetching and caching, plus pagination and modal movie details.

## Features

- Search movies by title
- Fetch and cache results with React Query
- Paginate results using `react-paginate`
- Display movie details in an accessible modal
- Show error and empty state notifications with `react-hot-toast`
- Responsive grid layout with poster thumbnails

## Technologies

- React 19
- TypeScript
- Vite
- @tanstack/react-query
- axios
- react-hot-toast
- react-paginate

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the project root with your TMDB bearer token:

```env
VITE_TMDB_KEY=your_tmdb_bearer_token
```

3. Run the development server:

```bash
npm run dev
```

4. Open the URL shown in the terminal.

## Available scripts

- `npm run dev` — start the local dev server
- `npm run build` — build the production app
- `npm run preview` — preview the production build
- `npm run lint` — run ESLint

## Project structure

- `src/main.tsx` — app entry point
- `src/components/App/App.tsx` — main UI and query state
- `src/components/SearchBar/SearchBar.tsx` — search input and form handling
- `src/components/MovieGrid/MovieGrid.tsx` — movie list grid
- `src/components/MovieModal/MovieModal.tsx` — movie detail modal
- `src/services/movieService.ts` — TMDB search API client
- `src/types/movie.ts` — movie data model

## Environment variables

- `VITE_TMDB_KEY` — TMDB bearer API token used by `movieService.ts`

## Notes

- Search only runs when a query is provided.
- The app avoids flicker by keeping previous data while fetching new pages.
- Click a movie poster to open the modal, or press `Escape` / click outside to close it.
