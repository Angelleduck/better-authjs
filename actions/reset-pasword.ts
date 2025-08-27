"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { resetSchema } from "@/schemas";
import type z from "zod";

export async function resetPassword(data: z.infer<typeof resetSchema>) {
  try {
    const validatedField = resetSchema.safeParse(data);
    if (!validatedField.success) {
      throw new Error(validatedField.error.errors[0].message);
    }

    const validUser = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!validUser) {
      throw new Error("Email not found !");
    }

    //doesn't throw an error when email not found
    //so we need to check first with prisma
    await auth.api.requestPasswordReset({
      body: {
        email: data.email,
      },
    });

    return { success: "Reset email sent" };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
  }
}
