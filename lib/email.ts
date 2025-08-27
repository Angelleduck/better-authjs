import { EmailVerification } from "@/template/emailVerification";
import { ResetPassword } from "@/template/resetPassword";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_KEY);

export async function emailVerification(token: string) {
  const link = `${process.env.BETTER_AUTH_URL}/auth/email-verification?token=${token}`;
  const { error } = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: ["delivered@resend.dev"],
    subject: "Email verification",
    html: EmailVerification(link),
  });

  if (error) {
    throw new Error(error.message);
  }
}
export async function resetPasswordEmail(token: string) {
  const link = `${process.env.BETTER_AUTH_URL}/auth/new-password?token=${token}`;

  const { error } = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: ["delivered@resend.dev"],
    subject: "Email verification",
    html: ResetPassword(link),
  });

  if (error) {
    throw new Error(error.message);
  }
}
