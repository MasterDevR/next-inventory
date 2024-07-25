"use client";
import { signOut } from "next-auth/react";
import React from "react";

const landingPage = () => {
  return (
    <div>
      landing-page
      <button
        type="submit"
        onClick={() => signOut()}
        className="cursor-pointer rounded-md border-2 bg-blue-700 p-2 font-bold tracking-widest text-white hover:bg-blue-500"
      >
        {"Signout"}
      </button>
    </div>
  );
};

export default landingPage;
export function generateStaticParams() {
  return [{ slug: [""] }];
}
