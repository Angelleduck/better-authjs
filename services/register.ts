"use client";

import { signUp } from "@/lib/auth-client";
import { registerSchema } from "@/schemas";
import { z } from "zod";

export async function register(data: z.infer<typeof registerSchema>) {
  return await signUp.email({
    name: data.name,
    email: data.email,
    password: data.password,
    //works when user have it's email verified
    //so I will use router somewhere else
    // callbackURL: "/home",
  });
}
