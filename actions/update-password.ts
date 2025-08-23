"use server";

import { auth, ErrorCode } from "@/auth";
import { emailSchema, newPasswordSchema } from "@/schemas";
import { APIError } from "better-auth/api";

import z from "zod";

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

      console.log(err);

      switch (err) {
        case "INVALID_TOKEN":
          return {
            error: "Invalid token",
          };
        case "TOKEN_EXPIRED":
          return { error: "Token expired" };
      }
    } else if (error instanceof Error) {
      return { error: error.message };
    }
  }
}
