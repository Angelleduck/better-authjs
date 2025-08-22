"use server";
import { auth } from "@/auth";
import { headers } from "next/headers";
import { cache } from "react";

//using react cache funnction to cache user data but
//later I willuse tanstack query
const getUser = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session;
});

export { getUser };
