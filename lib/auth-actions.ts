"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export async function authenticate(
  _previousState: string | undefined,
  formData: FormData,
): Promise<string | undefined> {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/meetings/new",
    });

    return undefined;
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === "CredentialsSignin") {
        return "Invalid email or password.";
      }

      return "Something went wrong. Please try again.";
    }

    throw error;
  }
}