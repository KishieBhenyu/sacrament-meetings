import Link from "next/link";

export default function EditMeetingNotFound() {
  return (
    <main className="mx-auto max-w-3xl p-6 text-center">
      <h1 className="mb-4 text-3xl font-bold">
        Meeting Not Found
      </h1>

      <p className="mb-6 text-gray-600">
        The meeting you are trying to edit does not exist.
      </p>

      <Link
        href="/meetings"
        className="inline-block rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
      >
        Back to Meetings
      </Link>
    </main>
  );
}