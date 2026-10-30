import MovieRow from "@/components/MovieRow";
import {
  getPopularMovies,
  getTopRatedMovies,
  getTrendingMovies,
} from "@/lib/tmdb";

export default async function Home() {
  const [trending, popular, topRated] = await Promise.all([
    getTrendingMovies(),
    getPopularMovies(),
    getTopRatedMovies(),
  ]);

  return (
    <main className="flex flex-col gap-8 pt-24">
      <MovieRow title="Trending this week" movies={trending} />
      <MovieRow title="Popular" movies={popular} />
      <MovieRow title="Top rated" movies={topRated} />
    </main>
  );
}