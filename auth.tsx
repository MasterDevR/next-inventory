import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

interface userData {
  id: string;
  dept_code: string;
  role: string;
  department: string;
}
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { type: "text", placeholder: "Username" },
        password: { type: "password", placeholder: "Password" },
      },
      async authorize(credentials): Promise<userData | null> {
        try {
          const res = await fetch(`${baseUrl}/api/login`, {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" },
          });
          const user = await res.json();
          if (!res.ok && !user) {
            return null;
          }

          return user.data;
        } catch (err: any) {
          console.log("Caught Error ", err.message);
          return null;
        }
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
        token.department = u.department;
      }

      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (token) {
        session.user.id = token.id;
        session.user.dept_code = token.dept_code;
        session.user.role = token.role;
        session.user.department = token.department;
      }

      return session;
    },
  },
});
