"use client";

import { signIn } from "@/lib/auth-client";
import { loginSchema } from "@/schemas";
import { z } from "zod";

export async function login(data: z.infer<typeof loginSchema>) {
  //no need for try catch, error is automatically handled by better-auth
  return await signIn.email({
    email: data.email,
    password: data.password,
    callbackURL: "/home",
  });
}
