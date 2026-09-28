"use client";

import { useActionState } from "react";
import { authenticate } from "@/lib/auth-actions";

export default function LoginPage() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );

  return (
    <div className="mx-auto max-w-md">
      <h1 className="mb-6 text-3xl font-bold">Bishopric Login</h1>

      <form action={formAction} className="space-y-4">
        <div>
          <label htmlFor="email" className="mb-1 block font-medium">
            Email
          </label>

          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full rounded border px-3 py-2"
          />
        </div>

        <div>
          <label htmlFor="password" className="mb-1 block font-medium">
            Password
          </label>

          <input
            id="password"
            name="password"
            type="password"
            required
            className="w-full rounded border px-3 py-2"
          />
        </div>

        {errorMessage && (
          <p className="text-sm text-red-600" aria-live="polite">
            {errorMessage}
          </p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="rounded bg-black px-4 py-2 text-white disabled:opacity-50"
        >
          {isPending ? "Signing In..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}