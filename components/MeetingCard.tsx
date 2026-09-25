import Link from "next/link";
import { SacramentMeeting } from "@/lib/types";
import DeleteMeetingButton from "@/components/DeleteMeetingButton";

interface MeetingCardProps {
  meeting: SacramentMeeting;
}

export default function MeetingCard({ meeting }: MeetingCardProps) {
  return (
    <article className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <Link
        href={`/meetings/${meeting.id}`}
        className="block transition hover:opacity-90"
      >
        <h2 className="text-xl font-semibold text-gray-900">
          {new Date(meeting.date).toLocaleDateString()}
        </h2>

        <p className="mt-2 text-gray-600">
          <strong>Meeting Type:</strong> {meeting.meetingType}
        </p>

        <p className="mt-2 text-gray-600">
          <strong>Presiding:</strong> {meeting.presiding}
        </p>

        <p className="mt-2 text-gray-600">
          <strong>Conducting:</strong> {meeting.conducting}
        </p>

        <p className="mt-3 text-gray-600">
          <strong>Opening Hymn:</strong>{" "}
          {meeting.openingHymn
            ? `#${meeting.openingHymn.number} ${meeting.openingHymn.title}`
            : "Not specified"}
        </p>

        <p className="mt-2 text-gray-600">
          <strong>Opening Prayer:</strong> {meeting.openingPrayer}
        </p>

        <p className="mt-3 text-gray-600">
          <strong>Sacrament Hymn:</strong>{" "}
          {meeting.sacramentHymn
            ? `#${meeting.sacramentHymn.number} ${meeting.sacramentHymn.title}`
            : "Not specified"}
        </p>

        <p className="mt-3 text-gray-600">
          <strong>Closing Hymn:</strong>{" "}
          {meeting.closingHymn
            ? `#${meeting.closingHymn.number} ${meeting.closingHymn.title}`
            : "Not specified"}
        </p>

        <p className="mt-2 text-gray-600">
          <strong>Closing Prayer:</strong> {meeting.closingPrayer}
        </p>
      </Link>

      <div className="mt-6 flex gap-3">
        <Link
          href={`/meetings/${meeting.id}/edit`}
          className="rounded bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Edit
        </Link>

        <DeleteMeetingButton meetingId={meeting.id} />
      </div>
    </article>
  );
}