
import { SacramentMeeting } from "@/lib/types";

interface MeetingDetailProps {
  meeting: SacramentMeeting;
}

export default function MeetingDetail({ meeting }: MeetingDetailProps) {
  return (
    <div className="mx-auto max-w-3xl rounded-lg bg-white p-6 shadow-md">
      <h1 className="text-3xl font-bold text-gray-900">
        Sacrament Meeting
      </h1>

      <p className="mt-2 text-gray-600">
        <strong>Date:</strong>{" "}
        {new Date(meeting.date).toLocaleDateString()}
      </p>

      <p className="mt-2 text-gray-600">
        <strong>Meeting Type:</strong> {meeting.meetingType}
      </p>

      <section className="mt-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Leadership
        </h2>

        <p className="mt-2 text-gray-600">
          <strong>Presiding:</strong> {meeting.presiding}
        </p>

        <p className="mt-2 text-gray-600">
          <strong>Conducting:</strong> {meeting.conducting}
        </p>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Opening
        </h2>

        <p className="mt-3 text-gray-600">
          <strong>Opening Hymn:</strong>{" "}
          {meeting.openingHymn
            ? `#${meeting.openingHymn.number} ${meeting.openingHymn.title}`
            : "Not specified"}
        </p>

        <p className="mt-2 text-gray-600">
          <strong>Opening Prayer:</strong> {meeting.openingPrayer}
        </p>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Ward Business
        </h2>

        {meeting.wardBusiness.length > 0 ? (
          <ul className="mt-3 list-disc space-y-2 pl-6 text-gray-600">
            {meeting.wardBusiness.map((item, index) => (
              <li key={index}>{item.description}</li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-gray-600">No ward business listed.</p>
        )}
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Sacrament
        </h2>

        <p className="mt-3 text-gray-600">
          <strong>Sacrament Hymn:</strong>{" "}
          {meeting.sacramentHymn
            ? `#${meeting.sacramentHymn.number} ${meeting.sacramentHymn.title}`
            : "Not specified"}
        </p>

        {meeting.stakeBusiness && (
          <p className="mt-2 text-gray-600">
            <strong>Stake Business:</strong> Yes
          </p>
        )}
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Speakers
        </h2>

        {meeting.speakers.length > 0 ? (
          <ul className="mt-3 space-y-3 text-gray-600">
            {meeting.speakers.map((speaker, index) => (
              <li key={index}>
                <strong>{speaker.name}</strong>
                {speaker.topic && ` — ${speaker.topic}`}
                {speaker.type === "musical-number" && " (Musical Number)"}
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-gray-600">No speakers listed.</p>
        )}
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Announcements
        </h2>

        {meeting.announcements.length > 0 ? (
          <ul className="mt-3 list-disc space-y-2 pl-6 text-gray-600">
            {meeting.announcements.map((announcement, index) => (
              <li key={index}>{announcement}</li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-gray-600">No announcements listed.</p>
        )}
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Closing
        </h2>

        <p className="mt-3 text-gray-600">
          <strong>Closing Hymn:</strong>{" "}
          {meeting.closingHymn
            ? `#${meeting.closingHymn.number} ${meeting.closingHymn.title}`
            : "Not specified"}
        </p>

        <p className="mt-2 text-gray-600">
          <strong>Closing Prayer:</strong> {meeting.closingPrayer}
        </p>
      </section>
    </div>
  );
}

