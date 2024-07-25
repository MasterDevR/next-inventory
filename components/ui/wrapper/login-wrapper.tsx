"use client";
import { useSession } from "next-auth/react";
import React, { ReactNode, useEffect } from "react";
import UserWrapper from "./user-wrapper";
interface wrapprProps {
  children: ReactNode;
}
const Wrapper = ({ children }: wrapprProps) => {
  const session = useSession();

  return (
    <div>
      {session.status === "authenticated" ? (
        <UserWrapper>{children}</UserWrapper>
      ) : session.status === "unauthenticated" ? (
        <div className="bg-blue-300">{children}</div>
      ) : (
        <div className="  h-screen flex items-center justify-center">
          <span className="loading loading-spinner text-primary loading-lg">
            Loading
          </span>
        </div>
      )}
    </div>
  );
};

export default Wrapper;
