import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

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
      async authorize(credentials) {
        const response = await axios.post(`${baseUrl}/login`, {
          credentials: {
            username: credentials.username,
            password: credentials.password,
          },
        });

        const user = response.data;
        if (user) {
          return user.data.userData;
        }
        return null;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },
});
