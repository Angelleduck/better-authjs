"use client";

import { resetPassword } from "@/actions/reset-pasword";
import { Card } from "@/components/auth/card";
import { ErrorCard } from "@/components/auth/error-card";
import Header from "@/components/auth/header";
import { Input } from "@/components/auth/input";
import ButtonSubmit from "@/components/auth/submit-button";
import SuccessCard from "@/components/auth/success-card";
import { resetSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import type z from "zod";

type InputField = z.infer<typeof resetSchema>;

export default function Page() {
  const [success, setSuccess] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<InputField>({
    resolver: zodResolver(resetSchema),
  });

  const onsubmit: SubmitHandler<InputField> = async (data) => {
    setSuccess("");
    const res = await resetPassword(data);

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
      <Header label="Forgot your password ?" />
      <form onSubmit={handleSubmit(onsubmit)} className="space-y-4">
        <div className="space-y-1">
          <label htmlFor="email">Email</label>
          <Input
            placeholder="jhon.doe@example"
            register={register}
            type="email"
            id="email"
          />
        </div>

        {errors.root && <ErrorCard message={errors.root.message} />}
        {errors.email && <ErrorCard message={errors.email.message} />}
        {success && <SuccessCard message={success} />}

        <ButtonSubmit
          label="send reset email"
          loadingLabel="sending email..."
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
