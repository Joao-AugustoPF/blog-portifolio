import { SignupFormSchema, FormState } from "@/lib/definitions";
import { signIn } from "next-auth/react";

export async function signup(
  state: FormState,
  formData: FormData
): Promise<FormState> {
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const result = await signIn("credentials", {
    callbackUrl: "/dashboard",
    email: validatedFields.data.email,
    password: validatedFields.data.password,
  });

  // Handle any errors from the signIn process
  if (result?.error) {
    return {
      errors: { auth: result.error },
    };
  }

  // If login is successful, return some success state
  return {
    success: true,
  };
}
