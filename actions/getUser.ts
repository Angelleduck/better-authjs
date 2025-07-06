"use server";
import { auth } from "@/auth";
import { headers } from "next/headers";

async function getUser() {
  const session = await auth.api.getSession({
    headers: headers(),
  });

  return session;
}

export { getUser };
