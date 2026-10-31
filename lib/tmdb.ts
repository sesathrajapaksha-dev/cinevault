const BASE_URL = "https://api.themoviedb.org/3";
export const IMAGE_BASE = "https://image.tmdb.org/t/p";

export type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
};

async function tmdbFetch<T>(path: string): Promise<T> {
  const key = process.env.TMDB_API_KEY;
  if (!key) {
    throw new Error(
      "TMDB_API_KEY is missing. Add it to .env.local and restart the dev server."
    );
  }

  const separator = path.includes("?") ? "&" : "?";
  const res = await fetch(`${BASE_URL}${path}${separator}api_key=${key}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`TMDB request failed with status ${res.status}`);
  }

  return res.json();
}

type MovieList = { results: Movie[] };

export async function getTrendingMovies() {
  const data = await tmdbFetch<MovieList>("/trending/movie/week");
  return data.results;
}

export async function getPopularMovies() {
  const data = await tmdbFetch<MovieList>("/movie/popular");
  return data.results;
}

export async function getTopRatedMovies() {
  const data = await tmdbFetch<MovieList>("/movie/top_rated");
  return data.results;
}
export type MovieDetails = Movie & {
  runtime: number | null;
  tagline: string;
  genres: { id: number; name: string }[];
};

export async function getMoviesPage(page: number) {
  const data = await tmdbFetch<MovieList>(`/movie/popular?page=${page}`);
  return data.results;
}

export async function searchMovies(query: string) {
  const data = await tmdbFetch<MovieList>(
    `/search/movie?query=${encodeURIComponent(query)}`
  );
  return data.results;
}

export async function getMovieDetails(id: string) {
  return tmdbFetch<MovieDetails>(`/movie/${id}`);
}
export type MovieSummary = Pick<Movie, "id" | "title" | "poster_path">;