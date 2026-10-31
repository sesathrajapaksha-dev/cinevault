import { IMAGE_BASE, type MovieSummary } from "@/lib/tmdb";
import Link from "next/link";
import { IMAGE_BASE, type Movie } from "@/lib/tmdb";

export default function MovieCard({ movie }: { movie: MovieSummary }) {
  {
    return (
      <Link
        href={`/movie/${movie.id}`}
        className="group relative block aspect-[2/3] w-36 shrink-0 overflow-hidden rounded-md bg-neutral-800 md:w-44"
      >
        {movie.poster_path ? (
          <Image
            src={`${IMAGE_BASE}/w342${movie.poster_path}`}
            alt={movie.title}
            fill
            sizes="(min-width: 768px) 176px, 144px"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center p-2 text-center text-sm text-gray-400">
            {movie.title}
          </div>
        )}
      </Link>
    );
  }