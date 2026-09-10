async function getMeeting(
  id: string
): Promise<SacramentMeeting | null> {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const response = await fetch(
    `${baseUrl}/api/meetings/${id}`,
    {
      cache: "no-store",
    }
  );

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Failed to fetch meeting");
  }

  return response.json();
}