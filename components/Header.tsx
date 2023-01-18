import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import Dropdown from "./Dropdown";
import SearchInput from "./SearchInput";

export default function Header() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <header className="bg-white flex justify-between items-center py-2 px-4 border-b">
      {session ? (
        <div className="flex items-center">
          <Link href={"/"}>
            <Image src={"/logo.svg"} height={30} width={30} alt="logo" />
          </Link>
          {router.pathname === "/admin" ? <div className="ml-4">Draft</div> : <SearchInput />}
        </div>
      ) : (
        <div>
          <Link id="homelogolink" href={"/"}>
            <Image src={"/logo.svg"} height={30} width={30} alt="logo" />
          </Link>
        </div>
      )}
      <div>
        <div className="relative flex justify-end h-auto">
          {session ? (
            <Dropdown />
          ) : (
            <button id="signin" onClick={() => signIn()} className="btn">
              Sign in
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
