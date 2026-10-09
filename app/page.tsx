import { existsSync } from "node:fs";
import path from "node:path";
import { siteContent } from "@/src/data/siteContent";
import {
  photos,
  heroImage,
  childhoodPhotos,
  adventurePhotos,
  clips,
  approvedWishes,
} from "@/src/data/media";
import {
  StoryMotion,
  PhotoFrame,
  LoveCards,
  Polaroids,
  VideoGallery,
  SaveMemory,
} from "@/components/Experience";
const exists = (file: string) =>
  existsSync(path.join(process.cwd(), "public", file));
export default function Home() {
  const available = photos
    .filter((p) => exists(`media/photos/${p.id}.webp`))
    .map((p) => p.id);
  const videos = [
    ...clips
      .filter((p) => exists(`media/videos/${p.id}.mp4`))
      .map((p) => ({ title: p.title, file: `/media/videos/${p.id}.mp4` })),
    ...approvedWishes.filter((p) => exists(p.file.replace(/^\//, ""))),
  ];
  return (
    <StoryMotion>
      <a className="skip-link" href="#poster">
        Skip to the story
      </a>
      <main>
        <section className="intro" id="premiere" aria-labelledby="intro-title">
          <nav className="intro-nav">
            <a className="brand" href="#premiere">
              B<span>✦</span>
            </a>
            <span className="eyebrow">A VERY SPECIAL PREMIERE</span>
            <a href="#poster" className="skip-intro">
              Skip intro →
            </a>
          </nav>
          <div className="intro-content">
            <p className="opening-line">
              In a world full of ordinary days…
              <br />
              <em>one girl made every scene unforgettable.</em>
            </p>
            <p className="eyebrow intro-starring">TODAY, THE SPOTLIGHT IS ON</p>
            <h1 id="intro-title">
              BHAVYA
              <span className="title-star" aria-hidden="true">
                ✦
              </span>
            </h1>
            <p className="handwritten">the main character, obviously.</p>
            <a className="button yellow" href="#poster">
              ROLL THE OPENING CREDITS <span>↓</span>
            </a>
          </div>
          <div className="intro-footer">
            <span>A BIRTHDAY ORIGINAL</span>
            <span>STARRING HER. CELEBRATING HER.</span>
            <span>SCROLL FOR THE GOOD PART ↓</span>
          </div>
        </section>
        <section
          className="poster section"
          id="poster"
          aria-labelledby="poster-title"
        >
          <div className="poster-top">
            <span className="eyebrow">THE BIRTHDAY PREMIERE OF THE YEAR</span>
            <span className="edition">THE BHAVYA ISSUE · 2026</span>
          </div>
          <div className="poster-grid">
            <div className="poster-copy">
              <p className="chapter">01 / THE LEADING LADY</p>
              <h2 id="poster-title">
                How to be
                <br />
                the{" "}
                <em>
                  main
                  <br />
                  character.
                </em>
              </h2>
              <div className="edition-ribbon">BHAVYA EDITION</div>
              <p className="poster-subtitle">
                Starring the girl who makes
                <br />
                every plot twist worth it.
              </p>
              <a href="#ten-things" className="button dark">
                Explore her story <span>→</span>
              </a>
              <p className="birthday-note">Happy Birthday, Bhavya ♡</p>
            </div>
            <div className="hero-art">
              <div className="hero-frame">
                <PhotoFrame
                  photo={heroImage}
                  available={available.includes(heroImage.id)}
                  priority
                />
              </div>
              <span className="hero-sticker">
                ONE OF
                <br />A KIND <span>✦</span>
              </span>
              <span className="hero-caption handwritten">
                She’s the whole plot.
              </span>
            </div>
          </div>
          <div className="poster-credits">
            <span>A LIFE FULL OF LITTLE BIG MOMENTS</span>
            <span>LAUGHTER · ADVENTURE · HER PEOPLE</span>
            <span>NO SCRIPT REQUIRED</span>
          </div>
        </section>
        <section
          className="love section"
          id="ten-things"
          aria-labelledby="love-title"
        >
          <div className="section-heading">
            <p className="chapter">02 / THE THINGS THAT MAKE HER, HER</p>
            <h2 id="love-title">
              10 things we <em>love</em>
              <br />
              about Bhavya.
            </h2>
            <p>You didn’t need a script to become iconic.</p>
          </div>
          <LoveCards items={siteContent.compliments} />
          <p className="handwritten section-aside">
            Ten is honestly just the beginning.
          </p>
        </section>
        <section
          className="childhood section"
          id="early-years"
          aria-labelledby="childhood-title"
        >
          <div className="section-heading">
            <p className="chapter">03 / THE ORIGIN STORY</p>
            <h2 id="childhood-title">
              Once upon
              <br />
              <em>a little star…</em>
            </h2>
            <p>
              Before all the movie-star energy…
              <br />
              there was this little scene-stealer.
            </p>
          </div>
          <Polaroids photos={childhoodPhotos} available={available} />
          <p className="album-ending">
            Some stars were born for the spotlight.
            <br />
            <em>Others just brought their own.</em>
          </p>
        </section>
        <section
          className="adventure section"
          aria-labelledby="adventure-title"
        >
          <div className="adventure-heading">
            <div>
              <p className="chapter">04 / LOCATION: EVERYWHERE</p>
              <h2 id="adventure-title">
                The plot
                <br />
                <em>thickens.</em>
                <span aria-hidden="true">✦</span>
              </h2>
            </div>
            <p>
              New places. New scenes.
              <br />
              Same unforgettable leading lady.
            </p>
          </div>
          <div className="adventure-grid">
            {adventurePhotos.map((photo, i) => (
              <figure key={photo.id}>
                <PhotoFrame
                  photo={photo}
                  available={available.includes(photo.id)}
                />
                <figcaption>
                  <span>SCENE 0{i + 1}</span>
                  {photo.caption}
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="gallery-footer">
            <span className="handwritten">
              Collect moments. Keep the magic.
            </span>
            <VideoGallery items={videos} />
          </div>
        </section>
        <section className="cast section" aria-labelledby="cast-title">
          <p className="chapter">05 / THE SUPPORTING CAST</p>
          <div className="cast-stars" aria-hidden="true">
            ✦ ♡ ✦
          </div>
          <h2 id="cast-title">
            Every main character
            <br />
            has her <em>favorite cast.</em>
          </h2>
          <p>And they’re lucky to be in your story.</p>
          <div className="cast-tickets">
            {[
              "The familiar faces",
              "The shared laughter",
              "The ones cheering you on",
            ].map((title, i) => (
              <div className="cast-ticket" key={title}>
                <span className="eyebrow">
                  ADMIT ONE · A PLACE IN YOUR STORY
                </span>
                <span className="ticket-icon" aria-hidden="true">
                  {["♡", "✧", "☆"][i]}
                </span>
                <h3>{title}</h3>
                <span className="ticket-bottom">
                  ALWAYS PART OF THE GOOD SCENES
                </span>
              </div>
            ))}
          </div>
          <p className="cast-note">
            For your people, and every memory still to come.
          </p>
        </section>
        <section className="letter section" aria-labelledby="letter-title">
          <div className="letter-margin">
            <span className="chapter">06 / A NOTE FOR YOU</span>
            <span className="letter-stamp" aria-hidden="true">
              WITH
              <br />
              LOVE ♡
            </span>
          </div>
          <article className="letter-paper">
            <span className="letter-doodle" aria-hidden="true">
              ♡
            </span>
            <h2 id="letter-title">Dear Bhavya,</h2>
            {siteContent.letter.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <p className="signature">
              With love,
              <br />
              <span className="handwritten">everyone cheering you on.</span>
            </p>
          </article>
        </section>
        <section className="finale section" aria-labelledby="finale-title">
          <p className="chapter">07 / THE END CREDITS</p>
          <p className="eyebrow">AND THE BEST PART?</p>
          <h2 id="finale-title">
            The story is just
            <br />
            <em>getting started.</em>
          </h2>
          <div className="finale-rule">
            <span>✦</span>
          </div>
          <p className="final-birthday">HAPPY BIRTHDAY, BHAVYA</p>
          {siteContent.movieUrl ? (
            <a
              className="button yellow"
              href={siteContent.movieUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Watch your birthday movie →
            </a>
          ) : (
            <p className="movie-coming">The full feature is coming soon</p>
          )}
          <div className="finale-actions">
            <a href="#premiere">Replay the premiere</a>
            <SaveMemory />
          </div>
          <footer>
            <span>MADE WITH LOVE FOR BHAVYA</span>
            <span>A BIRTHDAY ORIGINAL · 2026</span>
          </footer>
        </section>
      </main>
    </StoryMotion>
  );
}
