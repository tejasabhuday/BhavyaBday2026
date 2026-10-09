import Link from "next/link";
import { chapters } from "@/src/data/siteContent";
export function PageIntro({
  number,
  kicker,
  title,
  italic,
  description,
}: {
  number: string;
  kicker: string;
  title: string;
  italic: string;
  description: string;
}) {
  return (
    <div className="page-intro">
      <div className="chapter-kicker">
        <span>{number}</span>
        <span>{kicker}</span>
      </div>
      <h1>
        {title}
        <br />
        <em>{italic}</em>
      </h1>
      <p>{description}</p>
    </div>
  );
}
export function PageTurn({ next, aside }: { next: number; aside?: string }) {
  const c = chapters[next];
  return (
    <div className="page-turn">
      <span className="script">
        {aside || "There’s a little more, just for you."}
      </span>
      <Link href={c.href}>
        <span className="tiny-label">TURN THE PAGE · {c.number}</span>
        <span>
          {c.title} <b aria-hidden="true">→</b>
        </span>
      </Link>
    </div>
  );
}
export function Footer() {
  return (
    <footer className="site-footer">
      <Link href="/" className="footer-wordmark">
        for Bhavya.
      </Link>
      <p>Made by me. For you. With a lot of love.</p>
      <span className="tiny-label">A BIRTHDAY ORIGINAL · 2026</span>
    </footer>
  );
}
