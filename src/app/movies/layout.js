"use client";

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

export default function HomeLayout({
  children, // will be a page or nested layout
}) {
  const { data: session } = useSession();
  const router = useRouter();
  if (!session) redirect("/");

  return (
    <section>
      <div className="navbar p-1.5 bg-base-300 justify-between items-center">
        <div className="bg-yellow-400 py-1 px-2 text-2xl rounded-lg text-black font-bold">
          IMDb
        </div>
        <div className="flex gap-5 p-4 bg-base-300 justify-between items-center">
          <button
            onClick={() => router.push("/movies/add")}
            className="bg-black text-yellow-400 font-bold px-3 py-1"
          >
            Add Movie
          </button>
          <button
            onClick={() => signOut()}
            className="bg-red-800 text-white font-bold px-3 py-1"
          >
            Log Out
          </button>
        </div>
      </div>
      {children}
    </section>
  );
}
