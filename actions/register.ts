"use server";

import { auth } from "@/auth";
import { registerSchema } from "@/schemas";
import { z } from "zod";
import { APIError } from "better-auth/api";
import type { ErrorCode } from "@/auth";
import { generateToken } from "@/lib/token";
import { sendEmailVerification } from "@/lib/email";

export async function register(data: z.infer<typeof registerSchema>) {
  try {
    const validatedField = registerSchema.safeParse(data);
    if (!validatedField.success) {
      throw new Error(validatedField.error.errors[0].message);
    }

    await auth.api.signUpEmail({
      body: {
        email: data.email,
        password: data.password,
        name: data.name,
      },
    });

    const token = await generateToken(data.email);
    await sendEmailVerification(token);

    return { success: "Confirmation email sent" };
  } catch (error) {
    if (error instanceof APIError) {
      const err = error.body?.code as ErrorCode;

      switch (err) {
        case "USER_ALREADY_EXISTS":
          return {
            error: "Email already exists",
          };

        default:
          return {
            error: error.message,
          };
      }
    } else if (error instanceof Error) {
      return { error: error.message };
    }
  }
}
