import Link from "next/link";
import type { SacramentMeeting } from "@/lib/types";

interface MeetingCardProps {
  meeting: SacramentMeeting;
}

export default function MeetingCard({
  meeting,
}: MeetingCardProps) {
  return (
    <Link href={`/meetings/${meeting.id}`}>
      <article className="rounded-lg border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
        <h2 className="text-xl font-bold text-blue-900">
          {meeting.date}
        </h2>

        <p className="mt-2 text-gray-600">
          <strong>Presiding:</strong>{" "}
          {meeting.presiding}
        </p>

        <p className="text-gray-600">
          <strong>Conducting:</strong>{" "}
          {meeting.conducting}
        </p>

        <p className="mt-3 text-gray-600">
          <strong>Opening Hymn:</strong>{" "}
          #{meeting.openingHymn.number}{" "}
          {meeting.openingHymn.title}
        </p>

        <p className="mt-4 font-medium text-blue-700">
          View Meeting Agenda →
        </p>
      </article>
    </Link>
  );
}