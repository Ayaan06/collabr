import { PrismaAdapter } from "@auth/prisma-adapter";
import { compare } from "bcryptjs";
import { randomBytes } from "crypto";
import type { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "./prisma";

function assertEnv(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function getNextAuthSecret() {
  const secret = process.env.NEXTAUTH_SECRET;
  if (secret) return secret;
  // Avoid build-time crashes when the secret is missing; generate a per-run fallback in production.
  if (process.env.NODE_ENV === "production") {
    console.warn("NEXTAUTH_SECRET is not set. Generating a temporary secret for this build/run.");
    return randomBytes(32).toString("hex");
  }
  return "development-secret";
}

export const authOptions: NextAuthOptions & { trustHost?: boolean } = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "database",
  },
  secret: getNextAuthSecret(),
  providers: [
    GoogleProvider({
      clientId: assertEnv("GOOGLE_CLIENT_ID"),
      clientSecret: assertEnv("GOOGLE_CLIENT_SECRET"),
    }),
    GitHubProvider({
      clientId: assertEnv("GITHUB_ID"),
      clientSecret: assertEnv("GITHUB_SECRET"),
    }),
    CredentialsProvider({
      id: "email-login",
      name: "Email and Password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required.");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user?.hashedPassword) {
          throw new Error("No user found. Please sign up first.");
        }

        const isValid = await compare(credentials.password, user.hashedPassword);
        if (!isValid) {
          throw new Error("Invalid email or password.");
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.role = user.role ?? null;
      }
      return session;
    },
  },
  debug: process.env.NODE_ENV === "development",
};

export const getServerAuthSession = () => getServerSession(authOptions);
