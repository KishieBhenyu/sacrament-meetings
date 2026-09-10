import Link from "next/link";

export default function MeetingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <nav className="mb-8 border-b pb-4">
        <div className="flex flex-wrap gap-3">
          <Link
            href="/meetings"
            className="rounded-md px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-100"
          >
            All Meetings
          </Link>

          <Link
            href="/meetings/current"
            className="rounded-md px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-100"
          >
            Current Sunday
          </Link>
        </div>
      </nav>

      {children}
    </div>
  );
}