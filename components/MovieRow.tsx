import MovieCard from "@/components/MovieCard";
import type { MovieSummary } from "@/lib/tmdb";

export default function MovieRow({
  title,
  movies,
}: {
  title: string;
  movies: MovieSummary[];
}) {
  return (
    <section className="px-6 md:px-12">
      <h2 className="mb-3 text-xl font-semibold">{title}</h2>
      <div className="flex gap-3 overflow-x-auto pb-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}