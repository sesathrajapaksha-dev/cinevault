"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getMovieDetails } from "@/lib/tmdb";

export async function recordView(movieId: number) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return;
  if (!Number.isInteger(movieId) || movieId <= 0) return;

  let movie;
  try {
    movie = await getMovieDetails(String(movieId));
  } catch {
    return;
  }

  const userId = session.user.id;
  await prisma.watchHistory.upsert({
    where: { userId_movieId: { userId, movieId } },
    update: { watchedAt: new Date() },
    create: {
      userId,
      movieId,
      title: movie.title,
      posterPath: movie.poster_path,
    },
  });
}