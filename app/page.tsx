import Image from "next/image";

export default function HomePage() {
  return (
    <main className="space-y-8">
      <section className="grid items-center gap-8 md:grid-cols-2">
        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-700">
            Mkoba Second Ward
          </p>

          <h1 className="text-4xl font-bold text-blue-900">
            Sacrament Meetings
          </h1>

          <p className="mt-4 text-lg text-gray-600">
            View upcoming sacrament meeting agendas, speakers,
            hymns, prayers, announcements, and ward business.
          </p>
        </div>

        <div className="overflow-hidden rounded-xl shadow-md">
          <Image
            src="/images/mkoba_second.jpg"
            alt="Church meetinghouse used by Mkoba Second Ward"

            width={1200}
            height={800}
            className="h-auto w-full object-cover"
            priority
          />
        </div>
      </section>
    </main>
  );
}