"use client";

import Header from "@/components/auth/header";
import GoogleIcon from "@/components/icons/google-icon";
import Link from "next/link";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schemas";
import { z } from "zod";
import { Input } from "@/components/auth/input";
import { login } from "@/actions/login";
import { Card } from "@/components/auth/card";
import { useState } from "react";
import SuccessCard from "@/components/auth/success-card";
import { ErrorCard } from "@/components/auth/error-card";
import { GithubButton } from "@/components/auth/github-button";
import ButtonSubmit from "@/components/auth/submit-button";

type InputField = z.infer<typeof loginSchema>;

export default function Page() {
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<InputField>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<InputField> = async (data) => {
    try {
      //reset value
      setMessage("");
      const res = await login(data);

      if (res?.confirmationNeeded) {
        setMessage(res.confirmationNeeded);
        return;
      }

      if (res?.error) {
        setError("root", {
          message: res.error,
        });
        return;
      }

      window.location.href = "/home";
    } catch {
      setError("root", {
        message: "Sorry, something went wrong",
      });
    }
  };

  return (
    <Card>
      <Header label="Welcome back" />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1">
          <label htmlFor="email">Email</label>

          <Input
            register={register}
            id="email"
            type="email"
            placeholder="jhon.doe@example"
          />
          {errors.email && (
            <div className="text-red-500">{errors.email.message}</div>
          )}
        </div>
        <div className="space-y-1">
          <label htmlFor="password">Password</label>

          <Input
            register={register}
            id="password"
            type="password"
            placeholder="********"
          />
          {errors.password && (
            <div className="text-red-500">{errors.password.message}</div>
          )}
        </div>
        <Link
          href="#"
          className="text-sm hover:underline cursor-pointer inline-block"
        >
          Forgot password
        </Link>

        <ButtonSubmit
          isSubmitting={isSubmitting}
          label="Login"
          loadingLabel="Loggin in..."
        />

        {errors.root && <ErrorCard message={errors.root.message} />}
        {message && <SuccessCard message={message} />}
      </form>

      <div className="flex gap-2">
        <button className="flex flex-1 border rounded-md items-center justify-center py-2 hover:bg-black/5 transition">
          <GoogleIcon className="h-5 w-5" />
        </button>
        <GithubButton />
      </div>

      <div className="flex justify-center">
        <Link
          href="/auth/register"
          className="text-sm font-light hover:underline text-center text-neutral-800 hover:text-black"
        >
          Don&apos;t have an account?
        </Link>
      </div>
    </Card>
  );
}
