import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import Dropdown from "./Dropdown";

export default function Layout({ children }: any) {
  const { data: session } = useSession();

  return (
    <div className="mx-auto w-[95%] sm:w-[75%] md:w-[65%] lg:w-[55%]">
      <header className="flex justify-between  py-5">
        {session ? (
          <div className="flex">
            <img src={`${session?.user?.image}`} alt={`${session?.user?.image}`} className="rounded-full w-14 mr-4" />
            <div>
              <h1 className="text-2xl font-bold">Welcome {session?.user?.name}</h1>
              <p className="text-sm">You are signed in as {session?.user?.email}</p>
            </div>
          </div>
        ) : (
          <div>
            <h1 className="text-2xl font-bold">NextAuth.js</h1>
            <p className="text-sm">A fullstack authentication solution for Next.js</p>
          </div>
        )}
        <div className="relative flex justify-end w-96">
          {session ? (
            <Dropdown />
          ) : (
            <button onClick={() => signIn()} className="btn">
              Sign in
            </button>
          )}
        </div>
      </header>
      {children}
    </div>
  );
}
