"use server";

import { auth } from "@/auth";
import { redirect } from "next/navigation";

export async function githubSignIn() {
  const { url } = await auth.api.signInSocial({
    body: {
      provider: "github",
      callbackURL: "/home",
      errorCallbackURL: "/auth/problem",
    },
  });

  //when using client side better auth api it does it alone but not here
  if (url) redirect(url);
}
