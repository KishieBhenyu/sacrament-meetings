
import Link from "next/link";
import { SacramentMeeting } from "@/lib/types";

interface MeetingCardProps {
  meeting: SacramentMeeting;
}

export default function MeetingCard({ meeting }: MeetingCardProps) {
  return (
    <Link
      href={`/meetings/${meeting.id}`}
      className="block rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md"
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
  );
}

