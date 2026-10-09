import Link from "next/link";
import { PhotoFrame } from "./Experience";
import { Motif } from "./Artwork";
import { siteContent } from "@/src/data/siteContent";
import { photos } from "@/src/data/media";
import { PaperArrival } from "./StoryAnimation";
export function ScrapbookContents({ available }: { available: string[] }) {
  return (
    <>
      <Link className="scrapbook-cover" href="/love-notes/1">
        <span className="cover-tape" aria-hidden="true" />
        <span className="tiny-label">THE TWENTY-FIRST BIRTHDAY EDITION</span>
        <Motif name="heart" />
        <h2>
          Ten little reasons
          <br />
          <em>you’re so very lovely.</em>
        </h2>
        <span className="script">
          For beautiful baingan. With extra cheese.
        </span>
        <span className="scrapbook-open-label">
          OPEN YOUR SCRAPBOOK <span aria-hidden="true">→</span>
        </span>
        <span className="scrapbook-corner-sticker" aria-hidden="true">
          21
          <br />♡
        </span>
      </Link>
      <div className="scrapbook-index">
        {siteContent.loveNotes.map((note, i) => {
          const photo = photos.find((p) => p.id === note.photoId)!;
          return (
            <Link
              className={`scrap-index-card scrap-color-${i % 4}`}
              href={`/love-notes/${i + 1}`}
              key={note.title}
            >
              <span className="tiny-label">
                PAGE {String(i + 1).padStart(2, "0")}
              </span>
              {available.includes(note.photoId) ? (
                <PhotoFrame photo={photo} available />
              ) : (
                <div className="scrap-index-art" aria-hidden="true">
                  <Motif
                    name={
                      i % 3 === 0 ? "heart" : i % 3 === 1 ? "flower" : "star"
                    }
                  />
                </div>
              )}
              <h3>{note.title}</h3>
              <span className="tiny-label">TURN TO THIS PAGE →</span>
            </Link>
          );
        })}
      </div>
    </>
  );
}
export function ScrapbookSpread({
  number,
  available,
}: {
  number: number;
  available: string[];
}) {
  const note = siteContent.loveNotes[number - 1];
  const photo = photos.find((p) => p.id === note.photoId)!;
  return (
    <>
      <nav className="scrap-page-tabs" aria-label="Scrapbook pages">
        {siteContent.loveNotes.map((n, i) => (
          <Link
            key={n.title}
            href={`/love-notes/${i + 1}`}
            aria-current={number === i + 1 ? "page" : undefined}
            aria-label={`Page ${i + 1}: ${n.title}`}
          >
            {String(i + 1).padStart(2, "0")}
          </Link>
        ))}
      </nav>
      <PaperArrival key={number}>
        <article className={`scrapbook-spread scrap-color-${(number - 1) % 4}`}>
          <div className="scrapbook-photo-leaf">
            <span className="scrapbook-photo-tape" aria-hidden="true" />
            <figure className="scrapbook-photo">
              <PhotoFrame
                photo={photo}
                available={available.includes(photo.id)}
              />
              <figcaption className="script">
                {
                  [
                    "That smile deserves its own page.",
                    "Every expression. Every bit of you.",
                    "The leading lady, in her own light.",
                    "Ordinary days. Extraordinary girl.",
                    "A very serious little scene-stealer.",
                    "The outfit has entered the chat.",
                    "Tiny Bhavya. Already iconic.",
                    "A girl with places to go.",
                    "Twenty-one. A whole story ahead.",
                    "The very lovely birthday girl.",
                  ][number - 1]
                }
              </figcaption>
            </figure>
            <span className="scrap-flower-sticker" aria-hidden="true">
              ✿
            </span>
            <span className="scrapbook-margin-note script">
              Exhibit {String(number).padStart(2, "0")}:<br />
              extremely lovable.
            </span>
          </div>
          <div className="scrapbook-writing-leaf">
            <span className="tiny-label">
              THING {String(number).padStart(2, "0")} / 10
            </span>
            <h1>{note.title}</h1>
            <p>{note.note}</p>
            <p>{note.extra}</p>
            <span className="scrapbook-signoff script">
              A whole page. Still not enough lovely.
            </span>
            <Motif name="heart" className="scrapbook-doodle" />
            <span className="scrapbook-page-number">
              {String(number).padStart(2, "0")}
            </span>
          </div>
        </article>
      </PaperArrival>
      <div className="scrapbook-pagination">
        {number > 1 ? (
          <Link
            className="button button-ink"
            href={`/love-notes/${number - 1}`}
          >
            ← Previous page
          </Link>
        ) : (
          <Link className="underlined-link" href="/love-notes">
            ← Scrapbook cover
          </Link>
        )}
        <span className="tiny-label">{number} / 10</span>
        {number < 10 ? (
          <Link
            className="button button-ink"
            href={`/love-notes/${number + 1}`}
          >
            Next lovely thing →
          </Link>
        ) : (
          <Link className="button button-ink" href="/memories">
            Her memory book →
          </Link>
        )}
      </div>
    </>
  );
}
