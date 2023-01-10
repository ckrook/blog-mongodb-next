import React from "react";
import Header from "./Header";

export default function Layout({ children }: any) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
