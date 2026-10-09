import type { Metadata } from "next";
import { PageIntro, PageTurn } from "@/components/PageFrame";
import { ScreeningRoom } from "@/components/ScreeningRoom";
import { ChapterPassport } from "@/components/Chrome";
import { availableVideos } from "@/src/data/media.server";
import { siteContent } from "@/src/data/siteContent";
export const metadata: Metadata = { title: "Your screening room" };
export default function ScreeningRoomPage() {
  return (
    <main id="main" className="screening-page">
      <div className="page-width">
        <PageIntro
          number="06"
          kicker="THE GOOD PARTS. ON REPEAT."
          title="My favourite"
          italic="leading lady."
          description="Not a perfect take. Not a polished performance. Just you, being you. That’s the bit I want to keep."
        />
        <ScreeningRoom
          items={availableVideos()}
          movieUrl={siteContent.movieUrl}
        />
        <ChapterPassport />
        <PageTurn
          next={0}
          aside="No end credits. I’m not finished loving you."
        />
      </div>
    </main>
  );
}
