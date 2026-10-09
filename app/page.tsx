import Link from "next/link";
import { BirthdayStillLife, Motif } from "@/components/Artwork";
import { PhotoFrame } from "@/components/Experience";
import { ChapterPassport } from "@/components/Chrome";
import { SecretHeart } from "@/components/Surprises";
import { chapters, siteContent } from "@/src/data/siteContent";
import { heroImage } from "@/src/data/media";
import { availablePhotos } from "@/src/data/media.server";
export default function Home() {
  const hasHero = availablePhotos().includes(heroImage.id);
  return (
    <main id="main" className="home-page">
      <section className="home-hero" id="poster">
        <div className="hero-topline">
          <span className="tiny-label">
            THE BHAVYA 21ST BIRTHDAY PRODUCTION
          </span>
          <span className="tiny-label">21 YEARS. ALL MY LOVE.</span>
        </div>
        <div className="home-hero-grid">
          <div className="home-hero-copy">
            <p className="hero-issue">
              Twenty-one, <span className="script">beautiful baingan.</span>
            </p>
            <h1>
              Bhavya,
              <br />
              in full <em>bloom.</em>
            </h1>
            <p className="home-dedication">
              {siteContent.dedication}
              <br />A birthday world as bright as its leading lady.
            </p>
            <Link className="button button-ink" href="/love-notes">
              Let me count the ways <span>→</span>
            </Link>
            <div className="hero-footnote">
              <SecretHeart />
              <span>THE LEADING LADY IS YOU. OBVIOUSLY.</span>
            </div>
          </div>
          <div className="home-art">
            {hasHero ? (
              <figure className="home-portrait">
                <PhotoFrame photo={heroImage} available priority />
                <figcaption className="script">
                  The girl this is all about.
                </figcaption>
              </figure>
            ) : (
              <BirthdayStillLife />
            )}
          </div>
        </div>
        <div className="hero-bottomline">
          <span>21 CANDLES. ONE BEAUTIFUL BAINGAN.</span>
          <span>WRITTEN BY ME · STARRING YOU</span>
          <span>NO INTERMISSION REQUIRED</span>
        </div>
      </section>
      <section className="chapter-directory page-width">
        <div className="directory-heading">
          <div>
            <span className="tiny-label">THE TABLE OF CONTENTS</span>
            <h2>
              Pick a little <em>chapter.</em>
            </h2>
          </div>
          <p>
            Browse in order. Skip around.
            <br />
            Stay a while. It’s all yours.
          </p>
        </div>
        <div className="chapter-grid">
          {chapters.slice(1).map((c, i) => (
            <Link
              className={`chapter-card card-${c.tone} ${i === 0 ? "chapter-featured" : ""}`}
              href={c.href}
              key={c.href}
            >
              <div className="chapter-card-top">
                <span className="tiny-label">CHAPTER {c.number}</span>
                <span aria-hidden="true">→</span>
              </div>
              <Motif name={c.motif} />
              <h3>{c.title}</h3>
              <p>{c.description}</p>
              <span className="chapter-card-bottom">
                A LITTLE SOMETHING FOR YOU
              </span>
            </Link>
          ))}
        </div>
        <ChapterPassport />
      </section>
      <section className="home-postscript">
        <p className="script">P.S. Twenty-one looks beautiful on you.</p>
        <h2>
          Her favourite colours.
          <br />
          <em>Her kind of magic.</em>
        </h2>
        <Link href="/letter" className="underlined-link">
          I wrote you something →
        </Link>
      </section>
    </main>
  );
}
