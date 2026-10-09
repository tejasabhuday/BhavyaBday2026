import type { Metadata } from "next";
import { PageIntro, PageTurn } from "@/components/PageFrame";
import { BirthdayCandles } from "@/components/Surprises";
import { siteContent } from "@/src/data/siteContent";
export const metadata: Metadata = { title: "A letter for my everything" };
export default function LetterPage() {
  return (
    <main id="main" className="letter-page">
      <div className="page-width">
        <PageIntro
          number="05"
          kicker="NO SCRIPT. JUST ME."
          title="For my"
          italic="everything."
          description="Beautiful baingan. Chunnilal. My everything. Different names for the same person I love."
        />
        <div className="letter-layout">
          <aside className="letter-aside">
            <div className="postage-stamp">
              <span className="tiny-label">SPECIAL DELIVERY</span>
              <span>♡</span>
              <span className="script">all my love</span>
            </div>
            <p className="script">
              No big speech.
              <br />
              Just the truth.
            </p>
          </aside>
          <article className="personal-letter">
            <span className="tiny-label">A LETTER TO KEEP</span>
            <h2>My beautiful baingan,</h2>
            {siteContent.letter.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <p className="letter-signature script">
              {siteContent.signature}
              <span>♡</span>
            </p>
            <span className="letter-ps script">
              P.S. Yes, I really cycled all that way for you.
            </span>
          </article>
        </div>
        <BirthdayCandles />
        <PageTurn
          next={5}
          aside="You can read this again. As many times as you want."
        />
      </div>
    </main>
  );
}
