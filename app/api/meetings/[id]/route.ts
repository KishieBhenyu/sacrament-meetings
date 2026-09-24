
import { getMeetings, getMeetingsByDate } from "@/lib/meetings-db";

export async function GET(request: Request) {
  const date = new URL(request.url).searchParams.get("date");

  if (date) {
    const meetings = await getMeetingsByDate(date);
    return Response.json(meetings);
  }

  const meetings = await getMeetings();
  return Response.json(meetings);
}

