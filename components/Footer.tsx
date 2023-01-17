import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-white sticky">
      <div className="container py-24">
        <div className=" mb-4">
          <Link href={"/"}>
            <Image src={"/logo.svg"} height={30} width={30} alt="logo" />
          </Link>
        </div>
        <ol className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <h4 className="font-semibold uppercase">Menu</h4>
            <li>Home</li>
            <li>Write</li>
          </div>
          <div>
            <h4 className="font-semibold uppercase">Menu</h4>
            <li>Home</li>
            <li>Write</li>
          </div>
          <div>
            <h4 className="font-semibold uppercase">Menu</h4>
            <li>Home</li>
            <li>Write</li>
          </div>
          <div>
            <h4 className="font-semibold uppercase">Menu</h4>
            <li>Home</li>
            <li>Write</li>
          </div>
        </ol>
      </div>
    </footer>
  );
}
