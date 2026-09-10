import type { SacramentMeeting } from "@/lib/types";

interface MeetingDetailProps {
  meeting: SacramentMeeting;
}

export default function MeetingDetail({
  meeting,
}: MeetingDetailProps) {
  return (
    <article className="mx-auto max-w-4xl rounded-xl bg-white p-6 shadow-md md:p-8">
      {/* Header */}
      <header className="mb-8 border-b pb-6">
        <p className="mb-2 text-sm font-medium uppercase tracking-wide text-blue-700">
          {meeting.meetingType} Sacrament Meeting
        </p>

        <h1 className="text-3xl font-bold text-blue-900">
          Sacrament Meeting Agenda
        </h1>

        <p className="mt-2 text-gray-600">
          {meeting.date}
        </p>

        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          <p>
            <strong>Presiding:</strong> {meeting.presiding}
          </p>

          <p>
            <strong>Conducting:</strong> {meeting.conducting}
          </p>
        </div>
      </header>

      {/* Opening */}
      <section className="mb-8">
        <h2 className="mb-4 border-b pb-2 text-xl font-bold text-blue-900">
          Opening
        </h2>

        <div className="space-y-3">
          <p>
            <strong>Opening Hymn:</strong>{" "}
            #{meeting.openingHymn.number} —{" "}
            {meeting.openingHymn.title}
          </p>

          <p>
            <strong>Opening Prayer:</strong>{" "}
            {meeting.openingPrayer}
          </p>
        </div>
      </section>

      {/* Ward Business */}
      <section className="mb-8">
        <h2 className="mb-4 border-b pb-2 text-xl font-bold text-blue-900">
          Ward Business
        </h2>

        {meeting.wardBusiness.length === 0 ? (
          <p className="text-gray-600">
            No ward business listed.
          </p>
        ) : (
          <ul className="list-disc space-y-2 pl-6">
            {meeting.wardBusiness.map((item, index) => (
              <li key={index}>
                {item.description}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Stake Business */}
      <section className="mb-8">
        <h2 className="mb-4 border-b pb-2 text-xl font-bold text-blue-900">
          Stake Business
        </h2>

        <p>
          {meeting.stakeBusiness
            ? "Stake business is included in this meeting."
            : "No stake business listed."}
        </p>
      </section>

      {/* Sacrament */}
      <section className="mb-8">
        <h2 className="mb-4 border-b pb-2 text-xl font-bold text-blue-900">
          Sacrament
        </h2>

        <p>
          <strong>Sacrament Hymn:</strong>{" "}
          #{meeting.sacramentHymn.number} —{" "}
          {meeting.sacramentHymn.title}
        </p>
      </section>

      {/* Speakers */}
      <section className="mb-8">
        <h2 className="mb-4 border-b pb-2 text-xl font-bold text-blue-900">
          Speakers and Musical Numbers
        </h2>

        {meeting.speakers.length === 0 ? (
          <p className="text-gray-600">
            No speakers listed.
          </p>
        ) : (
          <div className="space-y-4">
            {meeting.speakers.map((speaker, index) => (
              <div
                key={index}
                className="rounded-lg bg-gray-50 p-4"
              >
                <p className="font-semibold">
                  {speaker.name}
                </p>

                {speaker.type === "musical-number" ? (
                  <p className="text-sm text-gray-600">
                    Musical Number
                  </p>
                ) : (
                  <p className="text-gray-600">
                    Topic: {speaker.topic}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Announcements */}
      <section className="mb-8">
        <h2 className="mb-4 border-b pb-2 text-xl font-bold text-blue-900">
          Announcements
        </h2>

        {meeting.announcements.length === 0 ? (
          <p className="text-gray-600">
            No announcements.
          </p>
        ) : (
          <ul className="list-disc space-y-2 pl-6">
            {meeting.announcements.map(
              (announcement, index) => (
                <li key={index}>{announcement}</li>
              )
            )}
          </ul>
        )}
      </section>

      {/* Closing */}
      <section>
        <h2 className="mb-4 border-b pb-2 text-xl font-bold text-blue-900">
          Closing
        </h2>

        <div className="space-y-3">
          <p>
            <strong>Closing Hymn:</strong>{" "}
            #{meeting.closingHymn.number} —{" "}
            {meeting.closingHymn.title}
          </p>

          <p>
            <strong>Closing Prayer:</strong>{" "}
            {meeting.closingPrayer}
          </p>
        </div>
      </section>
    </article>
  );
}