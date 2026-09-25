import MeetingForm from "@/components/MeetingForm";
import { createMeeting } from "@/lib/actions";

export default function NewMeetingPage() {
  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="mb-6 text-3xl font-bold">
        Create New Meeting
      </h1>

      <MeetingForm action={createMeeting} />
    </main>
  );
}