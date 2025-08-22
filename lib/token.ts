"use server";

import { prisma } from "./prisma";
import * as jose from "jose";

interface payload {
  email: string;
  exp: number;
  aud: string;
}

export const generateToken = async (email: string) => {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  const alg = "HS256";

  const jwt = await new jose.SignJWT({ email })
    .setProtectedHeader({ alg })
    .setExpirationTime("1h")
    .setAudience("unverified user")
    .sign(secret);
  return jwt;
};

export const verifyToken = async (jwt: string) => {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    const {
      payload: { email },
    } = await jose.jwtVerify<payload>(jwt, secret, {
      audience: "unverified user",
    });

    await prisma.user.update({
      where: {
        email,
      },
      data: {
        emailVerified: true,
      },
    });

    return { success: "Email verified" };
  } catch (error) {
    if (error instanceof jose.errors.JWTExpired) {
      return { error: "Token expired" };
    } else {
      //what ever the error, the token is invalid
      return { error: "Invalid token" };
    }
  }
};

export const verifyResetToken = async (jwt: string) => {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    const {
      payload: { email },
    } = await jose.jwtVerify<payload>(jwt, secret, {
      audience: "unverified user",
    });

    return { email };
  } catch (error) {
    if (error instanceof jose.errors.JWTExpired) {
      return { error: "Token expired" };
    } else {
      //what ever the error, the token is invalid
      return { error: "Invalid token" };
    }
  }
};
