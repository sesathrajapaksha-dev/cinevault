"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function SignUpPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const { error } = await authClient.signUp.email({
      name: String(form.get("name")),
      email: String(form.get("email")),
      password: String(form.get("password")),
    });

    setLoading(false);
    if (error) {
      setError(error.message ?? "Something went wrong");
      return;
    }
    router.push("/");
    router.refresh();
  }

  const inputClass =
    "w-full rounded bg-neutral-800 px-4 py-2 text-white outline-none focus:ring-2 focus:ring-red-600";

  return (
    <main className="mx-auto max-w-sm px-6 pb-12 pt-28">
      <h1 className="mb-6 text-3xl font-bold">Create account</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input name="name" type="text" placeholder="Name" required className={inputClass} />
        <input name="email" type="email" placeholder="Email" required className={inputClass} />
        <input
          name="password"
          type="password"
          placeholder="Password (8+ characters)"
          minLength={8}
          required
          className={inputClass}
        />

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="rounded bg-red-600 px-5 py-2 font-semibold hover:bg-red-700 disabled:opacity-50"
        >
          {loading ? "Creating..." : "Sign up"}
        </button>
      </form>

      <p className="mt-6 text-sm text-gray-400">
        Already have an account?{" "}
        <Link href="/login" className="text-white hover:underline">
          Log in
        </Link>
      </p>
    </main>
  );
}