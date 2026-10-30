import Link from "next/link";

export default function Navbar() {
    return (
        <header className="fixed top-0 z-50 w-full bg-gradient-to-b from-black/90 to-transparent">
            <nav className="flex items-center justify-between px-6 py-4 md:px-12">
                <Link
                    href="/"
                    className="text-2xl font-bold tracking-widest text-red-600"
                >
                    CINEVAULT
                </Link>
                <ul className="flex gap-6 text-sm text-gray-300">
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
                </ul>
            </nav>
        </header>
    );
}