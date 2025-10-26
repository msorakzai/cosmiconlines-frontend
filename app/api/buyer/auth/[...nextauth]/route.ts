// src/app/api/buyer/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";

// ✅ MySQL connection pool
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

// ✅ Custom Auth User type
type AuthUser = {
  id: string; // string for NextAuth
  name: string;
  email: string;
};

// NextAuth handler
const handler = NextAuth({
  session: { strategy: "jwt" },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID!,
      clientSecret: process.env.FACEBOOK_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        // Fetch user from MySQL
        const [rows] = await db.query(
          "SELECT * FROM buyer WHERE email = ? LIMIT 1",
          [credentials.email]
        );
        const user = (rows as any[])[0] as {
          id: number;
          name: string;
          email: string;
          password: string;
        };

        if (!user) throw new Error("No user found");

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) throw new Error("Invalid password");

        // ✅ Return user with id as string
        return {
          id: user.id.toString(),
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user as AuthUser;
      return token;
    },
    async session({ session, token }) {
      const tUser = token.user as AuthUser;
      session.user = {
        name: tUser.name,
        email: tUser.email,
        image: null,
      };
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

// Only export GET and POST for Next.js App Router
export { handler as GET, handler as POST };
