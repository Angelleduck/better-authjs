"use server";

import { auth } from "@/auth";
import { loginSchema } from "@/schemas";
import { z } from "zod";
import { APIError } from "better-auth/api";
import type { ErrorCode } from "@/auth";

export async function login(data: z.infer<typeof loginSchema>) {
  try {
    const validatedField = loginSchema.safeParse(data);
    if (!validatedField.success) {
      throw new Error(validatedField.error.errors[0].message);
    }

    await auth.api.signInEmail({
      body: {
        email: data.email,
        password: data.password,
      },
    });
  } catch (error) {
    if (error instanceof APIError) {
      const err = error.body?.code as ErrorCode;

      switch (err) {
        case "INVALID_EMAIL_OR_PASSWORD":
          return {
            error: "Invalid credentials",
          };
        case "EMAIL_NOT_VERIFIED":
          return {
            confirmationNeeded: "Confirmation email sent",
          };
      }
    } else if (error instanceof Error) {
      return { error: error.message };
    }
  }
}
