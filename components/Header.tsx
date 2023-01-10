import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import Dropdown from "./Dropdown";

export default function Header() {
  const { data: session } = useSession();
  const router = useRouter();
  console.log(router.pathname);

  return (
    <header className="bg-white flex justify-between items-center py-2 px-4 border-b">
      {session ? (
        <div className="flex items-center">
          <Link href={"/"}>
            <Image src={"/logo.svg"} height={16} width={16} alt="logo" />
          </Link>
          {router.pathname === "/admin" ? <div className="ml-4">Draft</div> : <input type="text" placeholder="Search" className="bg-stone-100 ml-5 border-gray-100 rounded-full  w-96" />}
        </div>
      ) : (
        <div>
          <h1 className="text-2xl font-bold">TypeShip</h1>
          <p className="text-sm">A fullstack Next-Mongodb blogplatform</p>
        </div>
      )}
      <div>
        <div className="relative flex justify-end h-auto">
          {session ? (
            <Dropdown />
          ) : (
            <button onClick={() => signIn()} className="btn">
              Sign in
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
