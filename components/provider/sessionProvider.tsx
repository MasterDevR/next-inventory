import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";
import Wrapper from "@/components/ui/wrapper/login-wrapper";
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
