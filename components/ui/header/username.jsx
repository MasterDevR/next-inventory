"use client";
import { useSession } from "next-auth/react";
import React from "react";

const Username = () => {
  const session = useSession();
  return (
    <h1 className="mx-3 text-xs text-white uppercase">
      {session.data?.user.name
        ? session.data?.user.name
        : session.data?.user.department}
      {session.status === "loading" && (
        <div className="skeleton h-4 w-28"></div>
      )}
    </h1>
  );
};

export default Username;
