"use client";
import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";
import React from "react";
import Wrapper from "../../ui/wrapper/wrapper";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
const SessionProvider = ({ children }) => {
  return (
    <NextAuthSessionProvider>
      <QueryClientProvider client={queryClient}>
        <Wrapper>{children}</Wrapper>
      </QueryClientProvider>
    </NextAuthSessionProvider>
  );
};

export default SessionProvider;
