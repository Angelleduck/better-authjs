"use client";

import { Card } from "@/components/auth/card";
import { ErrorCard } from "@/components/auth/error-card";
import Header from "@/components/auth/header";
import SuccessCard from "@/components/auth/success-card";
import { verifyToken } from "@/lib/token";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    const verify = async () => {
      setLoading(true);
      if (!token) {
        setError("missing token");
        setLoading(false);
        return;
      }
      const res = await verifyToken(token);
      setLoading(false);
      if (res?.error) {
        setError(res.error);
      } else if (res?.success) {
        setSuccess(res.success);
      }
    };
    verify();
  }, []);
  return (
    <Card>
      <div className="flex flex-col items-center space-y-6">
        <Header label="Confirming your verification" />
        {loading && <p>loading</p>}
        {error && <ErrorCard message={error} />}
        {success && <SuccessCard message={success} />}
        <a href="/auth/login" className="hover:underline font-normal text-xs">
          Back to login
        </a>
      </div>
    </Card>
  );
}
