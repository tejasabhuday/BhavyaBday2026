import type { Metadata } from "next";
import "@fontsource/dm-sans/latin-400.css";
import "@fontsource/dm-sans/latin-500.css";
import "@fontsource/dm-sans/latin-700.css";
import "@fontsource/cormorant-garamond/latin-500.css";
import "@fontsource/cormorant-garamond/latin-500-italic.css";
import "@fontsource/caveat/latin-400.css";
import "./globals.css";
import Link from "next/link";
import { chapters } from "@/src/data/siteContent";
import { Navigation } from "@/components/Chrome";
import { Footer } from "@/components/PageFrame";
import { StoryMotion } from "@/components/Experience";
const siteUrl =
  process.env.SITE_URL ||
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "https://bhavya-bday2026.vercel.app");
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "For Bhavya. With love.", template: "%s · For Bhavya" },
  description:
    "A little 21st birthday production. Made by me, for you, with a lot of love.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "For Bhavya. With love.",
    description: "A little birthday original, just for you.",
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <StoryMotion>
          <a className="skip-link" href="#main">
            Skip to content
          </a>
          <Navigation />
          <noscript>
            <nav
              className="no-script-nav"
              aria-label="Chapters without JavaScript"
            >
              {chapters.map((c) => (
                <Link key={c.href} href={c.href}>
                  {c.short}
                </Link>
              ))}
            </nav>
          </noscript>
          {children}
          <Footer />
        </StoryMotion>
      </body>
    </html>
  );
}
