import MovieCard from "@/components/MovieCard";
import type { MovieSummary } from "@/lib/tmdb";

export default function MovieGrid({ movies }: { movies: MovieSummary[] }) {
  return (
    <div className="flex flex-wrap gap-4">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}