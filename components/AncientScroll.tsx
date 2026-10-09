import { siteContent } from "@/src/data/siteContent";
export function AncientScroll() {
  return (
    <div className="ancient-scroll">
      <details className="scroll-envelope">
        <summary>
          <span className="scroll-seal" aria-hidden="true">
            B.
          </span>
          <span className="script">A letter worth unfolding.</span>
          <span className="scroll-open-copy">
            Open your letter <span aria-hidden="true">↓</span>
          </span>
          <span className="scroll-close-copy">
            Roll it up again <span aria-hidden="true">↑</span>
          </span>
        </summary>
        <div className="scroll-unfurl">
          <div className="scroll-rod scroll-rod-top" aria-hidden="true" />
          <article className="scroll-parchment personal-letter">
            <span className="tiny-label">SEALED WITH ALL MY LOVE</span>
            <h2>My beautiful baingan,</h2>
            {siteContent.letter.map((p) => (
              <p key={p}>{p.replaceAll("\\n", "\n")}</p>
            ))}
            <p className="letter-signature script">
              {siteContent.signature}
              <span>♡</span>
            </p>
            <span className="letter-ps script">
              P.S. Yes, I really cycled all that way for you.
            </span>
          </article>
          <div className="scroll-rod scroll-rod-bottom" aria-hidden="true" />
        </div>
      </details>
    </div>
  );
}
