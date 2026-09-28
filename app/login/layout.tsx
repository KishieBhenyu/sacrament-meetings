import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Sacrament Meeting Planner",
  description: "Sign in to manage sacrament meeting schedules and details.",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}