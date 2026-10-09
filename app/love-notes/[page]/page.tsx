import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { siteContent } from "@/src/data/siteContent";
import { ScrapbookSpread } from "@/components/Scrapbook";
import { availablePhotos } from "@/src/data/media.server";
export const dynamicParams = false;
export function generateStaticParams() {
  return siteContent.loveNotes.map((_, i) => ({ page: String(i + 1) }));
}
function pageNumber(raw: string) {
  if (!/^(?:[1-9]|10)$/.test(raw)) notFound();
  return Number(raw);
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ page: string }>;
}): Promise<Metadata> {
  const { page } = await params;
  const n = pageNumber(page);
  return {
    title: `${String(n).padStart(2, "0")} · ${siteContent.loveNotes[n - 1].title}`,
  };
}
export default async function ScrapbookPhotoPage({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;
  const number = pageNumber(page);
  return (
    <main id="main" className="scrapbook-detail-page">
      <div className="scrapbook-width">
        <div className="scrapbook-detail-heading">
          <Link href="/love-notes" className="underlined-link">
            ← The scrapbook cover
          </Link>
          <span className="script">All about the birthday girl.</span>
        </div>
        <ScrapbookSpread number={number} available={availablePhotos()} />
      </div>
    </main>
  );
}
