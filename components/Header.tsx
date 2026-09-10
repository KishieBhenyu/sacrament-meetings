import NavLinks from "./NavLinks";

export default function Header() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="border-b bg-white shadow-sm">
      <div className="mx-auto max-w-6xl px-6 py-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-blue-900">
              Mkoba Second Ward Sacrament Meetings
            </h1>

            <p className="text-sm text-gray-600">
              {currentDate}
            </p>
          </div>

          <NavLinks />
        </div>
      </div>
    </header>
  );
}