import type { Metadata } from "next";
import { PageIntro, PageTurn } from "@/components/PageFrame";
import { MemoryBook } from "@/components/MemoryBook";
import { FutureScenes } from "@/components/Surprises";
import { availablePhotos } from "@/src/data/media.server";
export const metadata: Metadata = { title: "The memory book" };
export default function MemoriesPage() {
  return (
    <main id="main" className="memories-page">
      <div className="page-width">
        <PageIntro
          number="03"
          kicker="MY FAVOURITE KIND OF REWATCH"
          title="I’d keep every"
          italic="little moment."
          description="The first meeting. The late-night calls. An ordinary day with you. None of it feels ordinary to me."
        />
        <div className="memory-prologue">
          <span className="script">10 km. One cycle. You.</span>
          <p>
            I came on a cycle to meet you for the first time. Ten kilometres,
            and somewhere in that first meeting I knew: you were all I wanted.
          </p>
        </div>
        <MemoryBook available={availablePhotos()} />
        <FutureScenes />
        <PageTurn
          next={3}
          aside="Different places. The same favourite person."
        />
      </div>
    </main>
  );
}
