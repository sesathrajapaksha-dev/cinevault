import Link from "next/link";
import MovieGrid from "@/components/MovieGrid";
import { getMoviesPage } from "@/lib/tmdb";

export default async function MoviesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const current = Math.min(Math.max(Number(page) || 1, 1), 500);
  const movies = await getMoviesPage(current);

  return (
    <main className="px-6 pb-12 pt-24 md:px-12">
      <h1 className="mb-6 text-3xl font-bold">Movies</h1>
      <MovieGrid movies={movies} />

      <div className="mt-10 flex items-center justify-center gap-6 text-sm">
        {current > 1 && (
          <Link href={`/movies?page=${current - 1}`} className="hover:text-red-500">
            ← Previous
          </Link>
        )}
        <span className="text-gray-400">Page {current}</span>
        {current < 500 && (
          <Link href={`/movies?page=${current + 1}`} className="hover:text-red-500">
            Next →
          </Link>
        )}
      </div>
    </main>
  );
}