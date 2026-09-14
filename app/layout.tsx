import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Digitechlearn — Belajar Teknologi dengan Praktis", template: "%s | Digitechlearn" },
  description: "Belajar coding melalui video, live webinar, atau mentoring 1-on-1 bersama pengajar berpengalaman.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="id"><body>{children}</body></html>;
}

