"use server";

import { sendResetPassword } from "@/lib/email";
import { prisma } from "@/lib/prisma";
import { generateToken } from "@/lib/token";
import { resetSchema } from "@/schemas";
import z from "zod";

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

    const token = await generateToken(data.email);

    await sendResetPassword(token);

    return { success: "Reset email sent" };
  } catch (error) {
    console.log(error);

    if (error instanceof Error) {
      return { error: error.message };
    }
  }
}
