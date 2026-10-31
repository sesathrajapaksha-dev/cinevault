import { headers } from "next/headers";
import MovieRow from "@/components/MovieRow";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  getPopularMovies,
  getTopRatedMovies,
  getTrendingMovies,
} from "@/lib/tmdb";

export default async function Home() {
  const session = await auth.api.getSession({ headers: await headers() });

  const [trending, popular, topRated] = await Promise.all([
    getTrendingMovies(),
    getPopularMovies(),
    getTopRatedMovies(),
  ]);

  const history = session
    ? await prisma.watchHistory.findMany({
        where: { userId: session.user.id },
        orderBy: { watchedAt: "desc" },
        take: 20,
      })
    : [];

  const continueWatching = history.map((item) => ({
    id: item.movieId,
    title: item.title,
    poster_path: item.posterPath,
  }));

  return (
    <main className="flex flex-col gap-8 pt-24">
      {continueWatching.length > 0 && (
        <MovieRow title="Continue watching" movies={continueWatching} />
      )}
      <MovieRow title="Trending this week" movies={trending} />
      <MovieRow title="Popular" movies={popular} />
      <MovieRow title="Top rated" movies={topRated} />
    </main>
  );
}