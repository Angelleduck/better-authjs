"use client";

import { Card } from "@/components/auth/card";
import { ErrorCard } from "@/components/auth/error-card";
import Header from "@/components/auth/header";
import { Input } from "@/components/auth/input";
import SuccessCard from "@/components/auth/success-card";
import { newPasswordSchema } from "@/schemas";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import z from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import ButtonSubmit from "@/components/auth/submit-button";
import { updatePassword } from "@/actions/update-password";

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

    const res = await updatePassword(data, token);

    if (res?.error) {
      setError("root", {
        message: res.error,
      });
    } else if (res?.success) {
      setSuccess(res.success);
    }
  };
  return (
    <Card>
      <Header label="Enter a new password" />
      <form onSubmit={handleSubmit(onsubmit)} className="space-y-4">
        <div className="space-y-1">
          <label htmlFor="password">New password</label>
          <Input
            register={register}
            id="password"
            placeholder="********"
            type="password"
          />

          {errors.password && (
            <div className="text-red-500">{errors.password.message}</div>
          )}
        </div>
        <div className="space-y-1">
          <label htmlFor="confirmPassword">Confirm password</label>
          <Input
            register={register}
            id="confirmPassword"
            placeholder="********"
            type="password"
          />

          {errors.confirmPassword && (
            <div className="text-red-500">{errors.confirmPassword.message}</div>
          )}
        </div>
        {errors.root && <ErrorCard message={errors.root.message} />}
        {success && <SuccessCard message={success} />}

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
