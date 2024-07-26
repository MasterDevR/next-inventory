import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

interface userData {
  id: string;
  dept_code: string;
  role: string;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  pages: { signIn: "/auth/sigin" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { type: "text", placeholder: "Username" },
        password: { type: "password", placeholder: "Password" },
      },
      async authorize(credentials): Promise<userData | null> {
        const res = await fetch("http://localhost:3000/api/login", {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });
        const user = await res.json();
        if (res.ok && user) {
          return user.data;
        }
        console.log("user not Found: ", user);

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const u = user as userData;
        token.id = u.id;
        token.dept_code = u.dept_code;
        token.role = u.role;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      // Add token info to the session
      if (token) {
        session.user.id = token.id;
        session.user.dept_code = token.dept_code;
        session.user.role = token.role;
      }
      return session;
    },
  },
});
