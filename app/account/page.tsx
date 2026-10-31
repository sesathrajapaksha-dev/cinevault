import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function AccountPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="px-6 pb-12 pt-28 md:px-12">
      <h1 className="mb-4 text-3xl font-bold">Your account</h1>
      <p className="text-gray-300">Name: {session.user.name}</p>
      <p className="text-gray-300">Email: {session.user.email}</p>
    </main>
  );
}