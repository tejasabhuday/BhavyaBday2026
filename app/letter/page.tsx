import type { Metadata } from "next";
import { PageIntro, PageTurn } from "@/components/PageFrame";
import { BirthdayCandles } from "@/components/Surprises";
import { AncientScroll } from "@/components/AncientScroll";
export const metadata: Metadata = { title: "A letter for my everything" };
export default function LetterPage() {
  return (
    <main id="main" className="letter-page">
      <div className="page-width">
        <PageIntro
          number="04"
          kicker="A LITTLE LETTER. ALL MY LOVE."
          title="For my"
          italic="everything."
          description="Beautiful baingan. Chunnilal. My everything. A little scroll, a birthday seal, and words you can keep."
        />
        <AncientScroll />
        <BirthdayCandles />
        <PageTurn
          next={4}
          aside="A letter to keep. A little magic to discover."
        />
      </div>
    </main>
  );
}
