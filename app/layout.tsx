import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sacrament-meetings-teal.vercel.app"),

  title: {
    default: "Mkoba Second Ward Sacrament Meetings",
    template: "%s | Mkoba Second Ward",
  },

  description:
    "View and manage sacrament meeting agendas for Mkoba Second Ward.",

  openGraph: {
    title: "Mkoba Second Ward Sacrament Meetings",
    description:
      "View and manage sacrament meeting agendas for Mkoba Second Ward.",
    images: [
      {
        url: "/images/mkoba_second.jpg",
        width: 1200,
        height: 630,
        alt: "Mkoba Second Ward",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} flex min-h-screen flex-col font-sans`}
      >
        <Header />

        <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-8">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}