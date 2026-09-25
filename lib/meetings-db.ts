import { neon } from "@neondatabase/serverless";
import { SacramentMeeting } from "@/lib/types";

const sql = neon(process.env.DATABASE_URL!);

const ITEMS_PER_PAGE = 5;

function mapMeeting(row: {
  id: number;
  date: string;
  meeting_type: SacramentMeeting["meetingType"];
  presiding: string;
  conducting: string;
  opening_hymn: SacramentMeeting["openingHymn"];
  opening_prayer: string;
  ward_business: SacramentMeeting["wardBusiness"] | null;
  stake_business: boolean | null;
  sacrament_hymn: SacramentMeeting["sacramentHymn"];
  speakers: SacramentMeeting["speakers"] | null;
  closing_hymn: SacramentMeeting["closingHymn"];
  closing_prayer: string;
  announcements: string[] | null;
}): SacramentMeeting {
  return {
    id: row.id,
    date: String(row.date),
    meetingType: row.meeting_type,
    presiding: row.presiding,
    conducting: row.conducting,

    openingHymn: row.opening_hymn ?? null,
    openingPrayer: row.opening_prayer,

    wardBusiness: row.ward_business ?? [],

    stakeBusiness: row.stake_business ?? false,

    sacramentHymn: row.sacrament_hymn ?? null,

    speakers: row.speakers ?? [],

    closingHymn: row.closing_hymn ?? null,
    closingPrayer: row.closing_prayer,

    announcements: row.announcements ?? [],
  };
}

export async function getMeetings(
  query: string = "",
  currentPage: number = 1
): Promise<SacramentMeeting[]> {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const search = `%${query}%`;

  const meetings = await sql`
    SELECT
      id,
      date,
      meeting_type,
      presiding,
      conducting,
      opening_hymn,
      opening_prayer,
      ward_business,
      stake_business,
      sacrament_hymn,
      speakers,
      closing_hymn,
      closing_prayer,
      announcements
    FROM meetings
    WHERE
      presiding ILIKE ${search}
      OR conducting ILIKE ${search}
      OR meeting_type ILIKE ${search}
      OR speakers::text ILIKE ${search}
    ORDER BY date DESC
    LIMIT ${ITEMS_PER_PAGE}
    OFFSET ${offset}
  `;

  return meetings.map((row) =>
    mapMeeting(row as Parameters<typeof mapMeeting>[0])
  );
}

export async function getMeetingsByDate(
  date: string
): Promise<SacramentMeeting[]> {
  const meetings = await sql`
    SELECT
      id,
      date,
      meeting_type,
      presiding,
      conducting,
      opening_hymn,
      opening_prayer,
      ward_business,
      stake_business,
      sacrament_hymn,
      speakers,
      closing_hymn,
      closing_prayer,
      announcements
    FROM meetings
    WHERE date = ${date}
    ORDER BY date DESC
  `;

  return meetings.map((row) =>
    mapMeeting(row as Parameters<typeof mapMeeting>[0])
  );
}

export async function getMeetingsTotalPages(
  query: string = ""
): Promise<number> {
  const search = `%${query}%`;

  const result = await sql`
    SELECT COUNT(*)::int AS count
    FROM meetings
    WHERE
      presiding ILIKE ${search}
      OR conducting ILIKE ${search}
      OR meeting_type ILIKE ${search}
      OR speakers::text ILIKE ${search}
  `;

  const count = result[0]?.count ?? 0;

  return Math.ceil(count / ITEMS_PER_PAGE);
}

export async function getMeetingById(
  id: number
): Promise<SacramentMeeting | undefined> {
  const result = await sql`
    SELECT
      id,
      date,
      meeting_type,
      presiding,
      conducting,
      opening_hymn,
      opening_prayer,
      ward_business,
      stake_business,
      sacrament_hymn,
      speakers,
      closing_hymn,
      closing_prayer,
      announcements
    FROM meetings
    WHERE id = ${id}
  `;

  if (result.length === 0) {
    return undefined;
  }

  return mapMeeting(
    result[0] as Parameters<typeof mapMeeting>[0]
  );
}

export async function addMeeting(
  meeting: SacramentMeeting
): Promise<void> {
  await sql`
    INSERT INTO meetings (
      date,
      meeting_type,
      presiding,
      conducting,
      opening_hymn,
      opening_prayer,
      ward_business,
      stake_business,
      sacrament_hymn,
      speakers,
      closing_hymn,
      closing_prayer,
      announcements
    )
    VALUES (
      ${meeting.date},
      ${meeting.meetingType},
      ${meeting.presiding},
      ${meeting.conducting},
      ${JSON.stringify(meeting.openingHymn)},
      ${meeting.openingPrayer},
      ${JSON.stringify(meeting.wardBusiness)},
      ${meeting.stakeBusiness},
      ${JSON.stringify(meeting.sacramentHymn)},
      ${JSON.stringify(meeting.speakers)},
      ${JSON.stringify(meeting.closingHymn)},
      ${meeting.closingPrayer},
      ${meeting.announcements}
    )
  `;
}

export async function updateMeeting(
  id: number,
  meeting: SacramentMeeting
): Promise<boolean> {
  const result = await sql`
    UPDATE meetings
    SET
      date = ${meeting.date},
      meeting_type = ${meeting.meetingType},
      presiding = ${meeting.presiding},
      conducting = ${meeting.conducting},
      opening_hymn = ${JSON.stringify(meeting.openingHymn)},
      opening_prayer = ${meeting.openingPrayer},
      ward_business = ${JSON.stringify(meeting.wardBusiness)},
      stake_business = ${meeting.stakeBusiness},
      sacrament_hymn = ${JSON.stringify(meeting.sacramentHymn)},
      speakers = ${JSON.stringify(meeting.speakers)},
      closing_hymn = ${JSON.stringify(meeting.closingHymn)},
      closing_prayer = ${meeting.closingPrayer},
      announcements = ${meeting.announcements}
    WHERE id = ${id}
    RETURNING id
  `;

  return result.length > 0;
}

export async function deleteMeeting(
  id: number
): Promise<boolean> {
  const result = await sql`
    DELETE FROM meetings
    WHERE id = ${id}
    RETURNING id
  `;

  return result.length > 0;
}