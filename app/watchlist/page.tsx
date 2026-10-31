import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import MovieGrid from "@/components/MovieGrid";

export default async function WatchlistPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  const items = await prisma.watchlistItem.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  const movies = items.map((item) => ({
    id: item.movieId,
    title: item.title,
    poster_path: item.posterPath,
  }));

  return (
    <main className="px-6 pb-12 pt-24 md:px-12">
      <h1 className="mb-6 text-3xl font-bold">My list</h1>
      {movies.length === 0 ? (
        <p className="text-gray-400">
          Nothing saved yet. Open any movie and tap “Add to My list”.
        </p>
      ) : (
        <MovieGrid movies={movies} />
      )}
    </main>
  );
}