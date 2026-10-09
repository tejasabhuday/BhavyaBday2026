"use client";
import { useEffect, useRef, useState } from "react";
import { Motif } from "./Artwork";
export type ScreeningClip = {
  title: string;
  file: string;
  poster?: string;
  captions?: string;
};
export function ScreeningRoom({
  items,
  movieUrl,
}: {
  items: ScreeningClip[];
  movieUrl: string;
}) {
  const [index, setIndex] = useState(0);
  const [opened, setOpened] = useState(false);
  const [error, setError] = useState(false);
  const [status, setStatus] = useState("");
  const video = useRef<HTMLVideoElement>(null);
  const active = items[index];
  useEffect(() => {
    const element = video.current;
    return () => {
      element?.pause();
    };
  }, [opened, index]);
  function choose(i: number) {
    video.current?.pause();
    setIndex(i);
    setOpened(false);
    setError(false);
    setStatus("");
  }
  return (
    <>
      <section className="screening-theatre" aria-label="Personal video player">
        <div className="theatre-top">
          <span className="tiny-label">A BHAVYA ORIGINAL</span>
          <span className="tiny-label">
            {items.length
              ? `${index + 1} / ${items.length} LITTLE MOMENTS`
              : "RESERVED FOR YOUR LITTLE MOMENTS"}
          </span>
        </div>
        <div className="cinema-screen">
          {active && opened ? (
            <>
              <video
                key={active.file}
                ref={video}
                controls
                muted
                playsInline
                preload="none"
                poster={active.poster}
                aria-label={active.title}
                onError={() => setError(true)}
              >
                <source
                  src={active.file}
                  type="video/mp4"
                  onError={() => setError(true)}
                />
                {active.captions && (
                  <track
                    src={active.captions}
                    kind="captions"
                    srcLang="en"
                    label="English"
                  />
                )}
              </video>
              {error && (
                <div className="player-error" role="status">
                  <p>This little scene couldn’t play.</p>
                  <button
                    onClick={() => {
                      setOpened(false);
                      setError(false);
                    }}
                  >
                    Back to the title card
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="screen-title-card">
              <Motif name="film" />
              <span className="tiny-label">
                {active
                  ? "READY WHEN YOU ARE"
                  : "A LITTLE FEATURE, STILL IN THE MAKING"}
              </span>
              <h2>
                {active ? (
                  active.title
                ) : (
                  <>
                    Some scenes
                    <br />
                    are worth <em>waiting for.</em>
                  </>
                )}
              </h2>
              <p>
                {active
                  ? "You press play. Nothing starts without you."
                  : "Your clips will have a home right here. Until then, I’ve left you the best seat."}
              </p>
              {active && (
                <button
                  className="button button-butter"
                  onClick={() => setOpened(true)}
                >
                  Open this scene <span>▶</span>
                </button>
              )}
            </div>
          )}
        </div>
        <div className="theatre-bottom">
          <span>{active ? active.title : "FOR YOU. FROM ME. ALWAYS."}</span>
          {active && opened ? (
            <button
              onClick={() => {
                video.current?.pause();
                setStatus("Paused. Take your time.");
              }}
            >
              Pause this scene
            </button>
          ) : (
            <span>ADMIT TWO ♡</span>
          )}
        </div>
      </section>
      {items.length > 0 && (
        <div
          className="screening-playlist"
          role="group"
          aria-label="Choose a personal clip"
        >
          {items.map((item, i) => (
            <button
              key={item.file}
              aria-pressed={index === i}
              onClick={() => choose(i)}
            >
              <span className="tiny-label">
                SCENE {String(i + 1).padStart(2, "0")}
              </span>
              <span>{item.title}</span>
              <span aria-hidden="true">{index === i ? "✓" : "→"}</span>
            </button>
          ))}
        </div>
      )}
      <p className="player-status" role="status">
        {status}
      </p>
      <div className="feature-ticket">
        <Motif name="ticket" />
        <div>
          <span className="tiny-label">THE FULL BIRTHDAY FEATURE</span>
          <h2>This one’s all about you.</h2>
          <p>
            {movieUrl
              ? "A birthday film, made with love. Watch it whenever you’re ready."
              : "I’m keeping this seat for you. The full birthday film is still to come."}
          </p>
          {movieUrl ? (
            <a
              className="button button-butter"
              href={movieUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Watch your birthday film <span>→</span>
            </a>
          ) : (
            <span className="coming-label">
              THE FULL FEATURE IS COMING SOON
            </span>
          )}
        </div>
      </div>
    </>
  );
}
