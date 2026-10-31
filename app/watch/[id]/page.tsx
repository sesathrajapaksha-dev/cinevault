import Link from "next/link";
import { notFound } from "next/navigation";
import TrackView from "@/components/TrackView";
import { getMovieDetails, getMovieTrailer } from "@/lib/tmdb";

export default async function WatchPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!/^\d+$/.test(id)) notFound();

  let movie;
  try {
    movie = await getMovieDetails(id);
  } catch {
    notFound();
  }

  const trailerKey = await getMovieTrailer(id);

  return (
    <main className="mx-auto max-w-5xl px-6 pb-12 pt-24 md:px-12">
      <Link
        href={`/movie/${movie.id}`}
        className="text-sm text-gray-400 hover:text-white"
      >
        ← Back to details
      </Link>

      <h1 className="mb-4 mt-3 text-3xl font-bold">{movie.title}</h1>

      {trailerKey ? (
        <>
          <div className="aspect-video w-full overflow-hidden rounded-md bg-black">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${trailerKey}`}
              title={`${movie.title} trailer`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-full w-full"
            />
          </div>
          <TrackView movieId={movie.id} />
        </>
      ) : (
        <p className="text-gray-400">No trailer is available for this movie.</p>
      )}

      <p className="mt-6 max-w-3xl leading-relaxed text-gray-300">
        {movie.overview}
      </p>
    </main>
  );
}