import { emailSchema, newPasswordSchema } from "@/schemas";
import z from "zod";

export async function updatePassword(
  data: z.infer<typeof newPasswordSchema>,
  email: z.infer<typeof emailSchema>
) {
  try {
    const validatedField = newPasswordSchema.safeParse(data);

    const rs = emailSchema.safeParse(email);
    if (!validatedField.success) {
      throw new Error(validatedField.error.errors[0].message);
    }
  } catch (error) {}
}
