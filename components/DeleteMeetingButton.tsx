"use client";

import { deleteMeeting } from "@/lib/actions";
import { useFormStatus } from "react-dom";

function DeleteButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded bg-red-600 px-3 py-2 text-sm font-semibold text-white disabled:opacity-50"
    >
      {pending ? "Deleting..." : "Delete"}
    </button>
  );
}

interface DeleteMeetingButtonProps {
  meetingId: number;
}

export default function DeleteMeetingButton({
  meetingId,
}: DeleteMeetingButtonProps) {
  return (
    <form action={deleteMeeting}>
      <input
        type="hidden"
        name="id"
        value={meetingId}
      />

      <DeleteButton />
    </form>
  );
}