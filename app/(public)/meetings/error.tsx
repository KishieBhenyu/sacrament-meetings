"use client";

import Link from "next/link";

interface MeetingsErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function MeetingsError({
  error,
  reset,
}: MeetingsErrorProps) {
  console.error(error);

  return (
    <main className="mx-auto max-w-3xl p-6 text-center">
      <h1 className="mb-4 text-3xl font-bold text-red-700">
        Something went wrong
      </h1>

      <p className="mb-6 text-gray-600">
        We were unable to load the meetings. Please try again.
      </p>

      <div className="flex justify-center gap-4">
        <button
          type="button"
          onClick={() => reset()}
          className="rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
        >
          Try Again
        </button>

        <Link
          href="/meetings"
          className="rounded border border-gray-300 px-4 py-2 font-semibold text-gray-700 hover:bg-gray-100"
        >
          Back to Meetings
        </Link>
      </div>
    </main>
  );
}