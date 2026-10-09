import { siteContent } from "@/src/data/siteContent";
import type { Metadata } from "next";
import { PageIntro, PageTurn } from "@/components/PageFrame";
import { MemoryBook } from "@/components/MemoryBook";
import { BirthdayDreams } from "@/components/BirthdayDreams";
import { CandidMoments } from "@/components/CandidMoments";
import { availablePhotos, availableVideos } from "@/src/data/media.server";
export const metadata: Metadata = { title: "The Bhavya memory book" };
export default function MemoriesPage() {
  return (
    <main id="main" className="memories-page">
      <div className="page-width">
        <PageIntro
          number="03"
          kicker="EVERY VERSION OF THE BIRTHDAY GIRL"
          title="Little you."
          italic="Wonderful you."
          description="The childhood mischief. The adventures. The everyday smiles. A little album of the girl this birthday is all about."
        />
        <div className="memory-prologue">
          <span className="script">Twenty-one years of lovely.</span>
          <p>
            Some moments are tiny. Some are a whole adventure. Every one is
            another little piece of Bhavya’s story.
          </p>
        </div>
        <MemoryBook available={availablePhotos()} />
        <CandidMoments items={availableVideos()} />
        <BirthdayDreams />
        {siteContent.movieUrl && (
          <section className="birthday-feature-link">
            <span className="tiny-label">HER BIRTHDAY FEATURE</span>
            <h2>A film full of Bhavya.</h2>
            <a
              className="button button-ink"
              href={siteContent.movieUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Watch the birthday film →
            </a>
          </section>
        )}
        <PageTurn
          next={3}
          aside="So many lovely chapters. So many more to come."
        />
      </div>
    </main>
  );
}
