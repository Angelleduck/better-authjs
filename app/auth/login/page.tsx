"use client";

import Header from "@/components/auth/header";
import GitHubIcon from "@/components/icons/github-icon";
import GoogleIcon from "@/components/icons/google-icon";
import Link from "next/link";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schemas";
import { z } from "zod";
import { Input } from "@/components/auth/login/input";
import { login } from "@/services/login";

type InputField = z.infer<typeof loginSchema>;

export default function Page() {
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
      const res = await login(data);

      if (res.error) {
        setError("root", {
          message: res.error.message,
        });
      }
    } catch {
      setError("root", {
        message: "Sorry, something went wrong",
      });
    }
  };

  return (
    <div className="w-[min(calc(100%-20px),400px)] bg-white rounded-xl px-6 py-7 space-y-5">
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
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-black text-white w-full text-sm rounded-md py-2 hover:bg-black/85 transition"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>

        {errors.root && (
          <div className="text-red-500">{errors.root.message}</div>
        )}
      </form>

      <div className="flex gap-2">
        <button className="flex flex-1 border rounded-md items-center justify-center py-2 hover:bg-black/5 transition">
          <GoogleIcon className="h-5 w-5" />
        </button>
        <button className="flex flex-1 border rounded-md items-center justify-center py-2 hover:bg-black/5 transition">
          <GitHubIcon className="h-5 w-5" />
        </button>
      </div>

      <div className="flex justify-center">
        <Link
          href="/auth/register"
          className="text-sm font-light hover:underline text-center text-neutral-800 hover:text-black"
        >
          Don&apos;t have an account?
        </Link>
      </div>
    </div>
  );
}
