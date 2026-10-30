import MovieGrid from "@/components/MovieGrid";
import { searchMovies } from "@/lib/tmdb";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";
  const movies = query ? await searchMovies(query) : [];

  return (
    <main className="px-6 pb-12 pt-24 md:px-12">
      <h1 className="mb-6 text-3xl font-bold">Search</h1>

      <form action="/search" method="GET" className="mb-8 flex gap-2">
        <input
          type="text"
          name="q"
          defaultValue={query}
          placeholder="Search movies..."
          className="w-full max-w-md rounded bg-neutral-800 px-4 py-2 text-white outline-none focus:ring-2 focus:ring-red-600"
        />
        <button
          type="submit"
          className="rounded bg-red-600 px-5 py-2 font-semibold hover:bg-red-700"
        >
          Search
        </button>
      </form>

      {query && movies.length === 0 && (
        <p className="text-gray-400">No results for “{query}”.</p>
      )}
      {movies.length > 0 && <MovieGrid movies={movies} />}
    </main>
  );
}