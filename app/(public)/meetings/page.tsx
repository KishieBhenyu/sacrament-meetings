
import MeetingCard from "@/components/MeetingCard";
import { MeetingSearch } from "@/components/MeetingSearch";
import { Pagination } from "@/components/Pagination";
import {
  getMeetings,
  getMeetingsTotalPages,
} from "@/lib/meetings-db";

interface MeetingsPageProps {
  searchParams: Promise<{
    query?: string;
    page?: string;
  }>;
}

export default async function MeetingsPage({
  searchParams,
}: MeetingsPageProps) {
  const { query = "", page = "1" } = await searchParams;

  const currentPage = Number(page) || 1;

  const meetings = await getMeetings(query, currentPage);
  const totalPages = await getMeetingsTotalPages(query);

  return (
    <section>
      <h1 className="mb-6 text-3xl font-bold text-blue-900">
        Sacrament Meetings
      </h1>

      <div className="mb-6">
        <MeetingSearch />
      </div>

      {meetings.length === 0 ? (
        <p className="text-gray-600">
          No meetings found.
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {meetings.map((meeting) => (
            <MeetingCard
              key={meeting.id}
              meeting={meeting}
            />
          ))}
        </div>
      )}

      <Pagination totalPages={totalPages} />
    </section>
  );
}

