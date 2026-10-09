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
          kicker="HER BIRTHDAY. THE ROM-COM CUT."
          title="A little cinema."
          italic="A lot of you."
          description="A little Poo-level confidence. A little sunshine. A little beautiful chaos. Six cinematic moods, one very special birthday girl."
        />
        <FilmShelf />
        <PageTurn next={4} aside="The birthday girl gets every close-up." />
      </div>
    </main>
  );
}
