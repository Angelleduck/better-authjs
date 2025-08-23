"use server";

import { auth, ErrorCode } from "@/auth";
import { APIError } from "better-auth/api";
export async function verifyEmail(token: string) {
  try {
    const data = await auth.api.verifyEmail({
      query: {
        token,
      },
    });

    return { success: "Email verified" };
  } catch (error) {
    if (error instanceof APIError) {
      const err = error.body?.code as ErrorCode;

      switch (err) {
        case "INVALID_TOKEN":
          return { error: "Invalid token" };

        case "TOKEN_EXPIRED":
          return { error: "Token expired" };
      }
    } else if (error instanceof Error) {
      return { error: error.message };
    }
  }
}
