import type { Metadata } from "next";
import { PageIntro, PageTurn } from "@/components/PageFrame";
import { FilmShelf } from "@/components/FilmShelf";
export const metadata: Metadata = { title: "The rom-com shelf" };
export default function RomComsPage() {
  return (
    <main id="main" className="romcom-page">
      <div className="page-width">
        <PageIntro
          number="04"
          kicker="FOR THE LATE-NIGHT MOVIE NIGHTS"
          title="A little cinema."
          italic="A lot of you."
          description="The distance hasn’t stopped movie night. Here’s a shelf of big feelings, beautiful chaos, and films I’d happily watch with you."
        />
        <FilmShelf />
        <PageTurn
          next={4}
          aside="My favourite love story doesn’t need a screen."
        />
      </div>
    </main>
  );
}
