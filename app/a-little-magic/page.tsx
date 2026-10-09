import type { Metadata } from "next";
import { PageIntro, PageTurn } from "@/components/PageFrame";
import { DancingGlobe } from "@/components/DancingGlobe";
import { BirthdayWishJar } from "@/components/BirthdayWishJar";
import { ChapterPassport } from "@/components/Chrome";
import { availableGlobeMusic } from "@/src/data/media.server";
export const metadata: Metadata = { title: "A little birthday magic" };
export default function MagicPage() {
  return (
    <main id="main" className="magic-page">
      <div className="page-width">
        <PageIntro
          number="06"
          kicker="HER OWN LITTLE WORLD OF MAGIC"
          title="Twenty-one."
          italic="Still full of wonder."
          description="A little keepsake, a tiny dance, and a wish for every beautiful thing this next chapter could bring."
        />
        <DancingGlobe music={availableGlobeMusic()} />
        <div className="magic-birthday-wish">
          <span className="tiny-label">THE WISH INSIDE THE GLOBE</span>
          <p className="script">
            May your days be pink, your little joys be golden,
            <br />
            and your next chapter be as lovely as you.
          </p>
          <h2>
            Happy 21st,
            <br />
            <em>beautiful baingan.</em>
          </h2>
        </div>
        <BirthdayWishJar />
        <ChapterPassport />
        <PageTurn next={0} aside="Her story is only getting lovelier." />
      </div>
    </main>
  );
}
