import Link from "next/link";
import { Motif } from "@/components/Artwork";
export default function NotFound() {
  return (
    <main id="main" className="not-found-page">
      <Motif name="ticket" />
      <span className="tiny-label">A LITTLE WRONG TURN</span>
      <h1>
        This scene
        <br />
        <em>isn’t in the script.</em>
      </h1>
      <p>Your birthday story is right over here.</p>
      <Link href="/" className="button button-ink">
        Back to the premiere →
      </Link>
    </main>
  );
}
