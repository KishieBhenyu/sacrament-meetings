export default function Footer() {
  return (
    <footer className="mt-auto border-t bg-gray-50">
      <div className="mx-auto max-w-6xl px-6 py-6 text-center text-sm text-gray-600">
        <p>
          © {new Date().getFullYear()} Sacrament Meetings
        </p>
      </div>
    </footer>
  );
}