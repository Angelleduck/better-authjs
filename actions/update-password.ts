"use server";

import { auth, type ErrorCode } from "@/auth";
import { newPasswordSchema } from "@/schemas";
import { APIError } from "better-auth/api";

import type z from "zod";

export async function updatePassword(
  data: z.infer<typeof newPasswordSchema>,
  token: string
) {
  try {
    const validatedField = newPasswordSchema.safeParse(data);

    if (!validatedField.success) {
      throw new Error(validatedField.error.errors[0].message);
    }

    await auth.api.resetPassword({
      body: {
        newPassword: data.password,
        token,
      },
    });

    return { success: "Password updated" };
  } catch (error) {
    if (error instanceof APIError) {
      const err = error.body?.code as ErrorCode;

      switch (err) {
        case "INVALID_TOKEN":
          return { error: "Invalid token" };
        case "TOKEN_EXPIRED":
          //dev forgot to add this case in typescript check
          //so do ctrl+left click on Errorcode and seach to add it
          return { error: "Token expired" };
        default:
          return { error: "Sorry something went wrong" };
      }
    } else if (error instanceof Error) {
      return { error: error.message };
    }
  }
}
