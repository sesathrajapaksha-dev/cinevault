import Link from "next/link";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import LogoutButton from "@/components/LogoutButton";

export default async function Navbar() {
  const session = await auth.api.getSession({ headers: await headers() });

  return (
    <header className="fixed top-0 z-50 w-full bg-gradient-to-b from-black/90 to-transparent">
      <nav className="flex items-center justify-between px-6 py-4 md:px-12">
        <Link
          href="/"
          className="text-2xl font-bold tracking-widest text-red-600"
        >
          CINEVAULT
        </Link>
        <ul className="flex items-center gap-6 text-sm text-gray-300">
          <li>
            <Link href="/" className="hover:text-white">
              Home
            </Link>
          </li>
          <li>
            <Link href="/movies" className="hover:text-white">
              Movies
            </Link>
          </li>
          <li>
            <Link href="/search" className="hover:text-white">
              Search
            </Link>
          </li>
          {session ? (
            <>
              <li>
                <Link href="/account" className="text-white hover:underline">
                  {session.user.name}
                </Link>
              </li>
              <li>
                <LogoutButton />
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/login" className="hover:text-white">
                  Log in
                </Link>
              </li>
              <li>
                <Link
                  href="/signup"
                  className="rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700"
                >
                  Sign up
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}