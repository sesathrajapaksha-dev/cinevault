import Image from "next/image";
import { notFound } from "next/navigation";
import { getMovieDetails, IMAGE_BASE } from "@/lib/tmdb";

export default async function MoviePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let movie;
  try {
    movie = await getMovieDetails(id);
  } catch {
    notFound();
  }

  const year = movie.release_date?.slice(0, 4);

  return (
    <main className="relative pb-12 pt-24">
      {movie.backdrop_path && (
        <div className="absolute inset-0 -z-10 h-[60vh]">
          <Image
            src={`${IMAGE_BASE}/w1280${movie.backdrop_path}`}
            alt=""
            fill
            priority
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
        </div>
      )}

      <div className="flex flex-col gap-8 px-6 md:flex-row md:px-12">
        {movie.poster_path && (
          <Image
            src={`${IMAGE_BASE}/w500${movie.poster_path}`}
            alt={movie.title}
            width={300}
            height={450}
            className="rounded-md"
          />
        )}

        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold">{movie.title}</h1>
          {movie.tagline && (
            <p className="mt-1 italic text-gray-400">{movie.tagline}</p>
          )}

          <p className="mt-3 text-sm text-gray-300">
            {[year, movie.runtime ? `${movie.runtime} min` : null, `★ ${movie.vote_average.toFixed(1)}`]
              .filter(Boolean)
              .join(" · ")}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {movie.genres.map((genre) => (
              <span
                key={genre.id}
                className="rounded-full border border-white/20 px-3 py-1 text-xs"
              >
                {genre.name}
              </span>
            ))}
          </div>

          <p className="mt-6 leading-relaxed text-gray-200">{movie.overview}</p>
        </div>
      </div>
    </main>
  );
}