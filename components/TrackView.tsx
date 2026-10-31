"use client";

import { useEffect } from "react";
import { recordView } from "@/app/actions/history";

export default function TrackView({ movieId }: { movieId: number }) {
  useEffect(() => {
    recordView(movieId);
  }, [movieId]);

  return null;
}