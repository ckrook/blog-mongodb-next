import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import Dropdown from "./Dropdown";

export default function Layout({ children }: any) {
  const { data: session } = useSession();

  return (
    <>
      <header className="container flex justify-between  py-5">
        {session ? (
          <>TypeShip</>
        ) : (
          <div>
            <h1 className="text-2xl font-bold">TypeShip</h1>
            <p className="text-sm">A fullstack Next-Mongodb blogplatform</p>
          </div>
        )}
        {session ? (
          <Link href="/">
            <img src={`${session?.user?.image}`} alt={`${session?.user?.image}`} className="rounded-full w-11 mr-4" />
          </Link>
        ) : (
          <></>
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
    </>
  );
}
