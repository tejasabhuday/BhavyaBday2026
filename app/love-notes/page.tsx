import type { Metadata } from "next";
import { PageIntro, PageTurn } from "@/components/PageFrame";
import { ScrapbookContents } from "@/components/Scrapbook";
import { OpenWhen } from "@/components/Surprises";
import { availablePhotos } from "@/src/data/media.server";
export const metadata: Metadata = { title: "Ten pages of lovely" };
export default function LoveNotesPage() {
  return (
    <main id="main" className="notes-page scrapbook-hub">
      <div className="page-width">
        <PageIntro
          number="02"
          kicker="THE BHAVYA SCRAPBOOK"
          title="10 things I love"
          italic="about you."
          description="Ten photo pages. A completely unreasonable amount of affection. And absolutely no attempt to be less cheesy."
        />
        <ScrapbookContents available={availablePhotos()} />
        <OpenWhen />
        <PageTurn
          next={2}
          aside="A little love on every page."
        />
      </div>
    </main>
  );
}
