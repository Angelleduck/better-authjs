import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./lib/prisma";
import { nextCookies } from "better-auth/next-js";
import { emailVerification, resetPasswordEmail } from "./lib/email";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, token }) => {
      await resetPasswordEmail(token);
    },
  },

  emailVerification: {
    sendOnSignIn: true,
    sendOnSignUp: true,
    expiresIn: 3600,
    sendVerificationEmail: async ({ user, token }) => {
      await emailVerification(token);
    },
  },

  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
  plugins: [nextCookies()],
});

export type ErrorCode = keyof typeof auth.$ERROR_CODES;
