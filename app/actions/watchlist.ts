"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getMovieDetails } from "@/lib/tmdb";

export async function toggleWatchlist(
  movieId: number
): Promise<{ saved: boolean } | { error: "login" | "invalid" }> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return { error: "login" };
  if (!Number.isInteger(movieId) || movieId <= 0) return { error: "invalid" };

  const userId = session.user.id;
  const key = { userId_movieId: { userId, movieId } };

  const existing = await prisma.watchlistItem.findUnique({ where: key });

  if (existing) {
    await prisma.watchlistItem.deleteMany({ where: { userId, movieId } });
    revalidatePath("/watchlist");
    return { saved: false };
  }

  let movie;
  try {
    movie = await getMovieDetails(String(movieId));
  } catch {
    return { error: "invalid" };
  }

  await prisma.watchlistItem.upsert({
    where: key,
    update: {},
    create: {
      userId,
      movieId,
      title: movie.title,
      posterPath: movie.poster_path,
    },
  });
  revalidatePath("/watchlist");
  return { saved: true };
}