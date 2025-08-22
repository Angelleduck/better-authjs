"use client";

import { Card } from "@/components/auth/card";
import { ErrorCard } from "@/components/auth/error-card";
import Header from "@/components/auth/header";
import { Input } from "@/components/auth/input";
import SuccessCard from "@/components/auth/success-card";
import { verifyResetToken, verifyToken } from "@/lib/token";
import { newPasswordSchema } from "@/schemas";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import z from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import ButtonSubmit from "@/components/auth/submit-button";

type InputField = z.infer<typeof newPasswordSchema>;

export default function Page() {
  const [success, setSuccess] = useState("");
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<InputField>({
    resolver: zodResolver(newPasswordSchema),
  });

  const onsubmit: SubmitHandler<InputField> = async (data) => {
    if (!token) {
      setError("root", {
        message: "Missing token",
      });
      return;
    }

    const res = await verifyResetToken(token);

    if (res?.error) {
      setError("root", {
        message: res.error,
      });
      return;
    }
  };
  return (
    <Card>
      <Header label="Enter a new password" />
      <form onSubmit={handleSubmit(onsubmit)} className="space-y-4">
        <div className="space-y-1">
          <label htmlFor="password">Password</label>
          <Input
            register={register}
            id="password"
            placeholder="********"
            type="password"
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="confirmPassword">Confirm password</label>
          <Input
            register={register}
            id="confirmPassword"
            placeholder="********"
            type="password"
          />
        </div>
        {/* {loading && <p>loading</p>}
        {error && <ErrorCard message={error} />}
        {success && <SuccessCard message={success} />} */}

        <ButtonSubmit
          label="submit"
          loadingLabel="submitting..."
          isSubmitting={isSubmitting}
        />
      </form>
      <div className="text-center">
        <Link
          href="/auth/login"
          className="hover:underline font-normal text-xs"
        >
          Back to login
        </Link>
      </div>
    </Card>
  );
}
