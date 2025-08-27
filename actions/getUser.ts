"use server";
import { auth } from "@/auth";
import { headers } from "next/headers";
import { cache } from "react";

//using react cache function to cache user data but
//later I will use tanstack query
const getUser = cache(async () => {
  const session = auth.api.getSession({
    headers: await headers(),
  });

  return session;
});

export { getUser };
