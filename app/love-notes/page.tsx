import type { Metadata } from "next";
import { PageIntro, PageTurn } from "@/components/PageFrame";
import { LoveNotes, OpenWhen } from "@/components/Surprises";
export const metadata: Metadata = { title: "10 things I love about you" };
export default function LoveNotesPage() {
  return (
    <main id="main" className="notes-page">
      <div className="page-width">
        <PageIntro
          number="02"
          kicker="THE NOTEBOOK I’D HAND YOU"
          title="10 things I love"
          italic="about you."
          description="I borrowed a little rom-com energy. Then I filled the margins with you. Tap a note; there’s more inside."
        />
        <span className="margin-scribble script">
          Spoiler: I could keep going.
        </span>
        <LoveNotes />
        <OpenWhen />
        <PageTurn
          next={2}
          aside="Ten reasons. One very obvious favourite person."
        />
      </div>
    </main>
  );
}
