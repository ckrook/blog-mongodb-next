import React from "react";
import { signIn } from "next-auth/react";

export default function AccessDenied() {
  return (
    <>
      <h1>A fullstack Next-Mongodb blogplatform</h1>
      <p>
        <a
          href="/api/auth/signin"
          onClick={(e: any) => {
            e.preventDefault();
            signIn();
          }}
        >
          You must be signed in to view this page
        </a>
      </p>
    </>
  );
}
