export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="h-10 w-64 animate-pulse rounded bg-gray-200" />

      <div className="grid gap-6 md:grid-cols-2">
        <div className="h-48 animate-pulse rounded-lg bg-gray-200" />
        <div className="h-48 animate-pulse rounded-lg bg-gray-200" />
      </div>
    </div>
  );
}