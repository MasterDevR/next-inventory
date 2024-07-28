// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    dept_code: string;
    role: string;
    department: string;
    accessToken: string;
  }

  interface Session {
    user: User & DefaultSession["user"];
  }
}
