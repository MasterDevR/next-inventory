"use client";
import {
  SessionProvider as NextAuthSessionProvider,
  useSession,
} from "next-auth/react";
import React, { ReactNode } from "react";
import Wrapper from "../../ui/wrapper/wrapper";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
interface SessionProviderProps {
  children: ReactNode;
}

const SessionProvider = ({ children }: SessionProviderProps) => {
  return (
    <NextAuthSessionProvider>
      <Wrapper>{children}</Wrapper>
    </NextAuthSessionProvider>
  );
};

export default SessionProvider;
