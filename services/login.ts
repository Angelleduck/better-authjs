"use client";

import { signIn } from "@/lib/auth-client";
import { loginSchema } from "@/schemas";
import { z } from "zod";

export async function login(data: z.infer<typeof loginSchema>) {
  return await signIn.email({
    email: data.email,
    password: data.password,
    callbackURL: "/home",
  });
}
