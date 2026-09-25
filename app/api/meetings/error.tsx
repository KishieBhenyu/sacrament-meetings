"use client";

import Link from "next/link";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div>
      <h2>Something went wrong.</h2>

      <button type="button" onClick={() => reset()}>
        Try Again
      </button>

      <Link href="/meetings">Back to Meetings</Link>
    </div>
  );
}