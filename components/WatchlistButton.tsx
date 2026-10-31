"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { toggleWatchlist } from "@/app/actions/watchlist";

export default function WatchlistButton({
  movieId,
  initialSaved,
  loggedIn,
}: {
  movieId: number;
  initialSaved: boolean;
  loggedIn: boolean;
}) {
  const [saved, setSaved] = useState(initialSaved);
  const [pending, startTransition] = useTransition();

  if (!loggedIn) {
    return (
      <Link
        href="/login"
        className="mt-6 inline-block rounded border border-white/30 px-5 py-2 text-sm hover:bg-white/10"
      >
        Log in to save
      </Link>
    );
  }

  function handleClick() {
    startTransition(async () => {
      const result = await toggleWatchlist(movieId);
      if ("saved" in result) setSaved(result.saved);
    });
  }

  return (
    <button
      onClick={handleClick}
      disabled={pending}
      className={`mt-6 rounded px-5 py-2 text-sm font-semibold disabled:opacity-50 ${
        saved
          ? "border border-white/30 hover:bg-white/10"
          : "bg-red-600 hover:bg-red-700"
      }`}
    >
      {saved ? "✓ In My list" : "+ Add to My list"}
    </button>
  );
}