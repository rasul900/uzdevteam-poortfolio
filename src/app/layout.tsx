import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UZ DEV TEAM — Professional IT Solutions",
  description: "Web, mobile, Telegram bot development and IT consulting in Tashkent, Uzbekistan.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
