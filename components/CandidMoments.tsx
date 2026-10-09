"use client";
import { useEffect, useRef, useState } from "react";
type Clip = { title: string; file: string; poster?: string; captions?: string };
export function CandidMoments({ items }: { items: Clip[] }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [error, setError] = useState(false);
  const player = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const el = player.current;
    return () => {
      el?.pause();
    };
  }, [selected]);
  if (!items.length) return null;
  return (
    <section className="candid-moments">
      <div className="section-title">
        <span className="tiny-label">THE LAUGHS BETWEEN THE PHOTOGRAPHS</span>
        <h2>
          Her little
          <br />
          <em>moving moments.</em>
        </h2>
        <p>A little candid magic. Only plays when you choose it.</p>
      </div>
      <div className="candid-buttons">
        {items.map((clip, i) => (
          <button
            key={clip.file}
            className="button button-ink"
            aria-pressed={selected === i}
            onClick={() => {
              player.current?.pause();
              setSelected(selected === i ? null : i);
              setError(false);
            }}
          >
            {clip.title} <span>{selected === i ? "−" : "▶"}</span>
          </button>
        ))}
      </div>
      {selected !== null && (
        <div className="candid-player">
          <video
            key={items[selected].file}
            ref={player}
            controls
            muted
            playsInline
            preload="none"
            poster={items[selected].poster}
            aria-label={items[selected].title}
            onError={() => setError(true)}
          >
            <source
              src={items[selected].file}
              type="video/mp4"
              onError={() => setError(true)}
            />
            {items[selected].captions && (
              <track
                src={items[selected].captions}
                kind="captions"
                srcLang="en"
                label="English"
              />
            )}
          </video>
          {error && (
            <p role="status">
              This moment couldn’t play. Try a different little scene.
            </p>
          )}
          <button
            className="underlined-link"
            onClick={() => {
              player.current?.pause();
              setSelected(null);
            }}
          >
            Close this moment
          </button>
        </div>
      )}
    </section>
  );
}
