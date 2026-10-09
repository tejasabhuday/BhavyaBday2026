import type { Metadata } from "next";
import "./globals.css";
const siteUrl =
  process.env.SITE_URL ||
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000");
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Bhavya · The Main Character",
  description: "A very special birthday premiere. Made with love for Bhavya.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Bhavya · The Main Character",
    description: "A very special birthday premiere.",
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
