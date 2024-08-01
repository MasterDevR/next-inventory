"use client";
import {
  SessionProvider as NextAuthSessionProvider,
  useSession,
} from "next-auth/react";
import React, { ReactNode } from "react";
import Wrapper from "../../ui/wrapper/wrapper";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface SessionProviderProps {
  children: ReactNode;
}

const queryClient = new QueryClient();
const SessionProvider = ({ children }: SessionProviderProps) => {
  return (
    <NextAuthSessionProvider>
      <QueryClientProvider client={queryClient}>
        <Wrapper>{children}</Wrapper>
      </QueryClientProvider>
    </NextAuthSessionProvider>
  );
};

export default SessionProvider;
