"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import { MotionConfig, motion } from "motion/react";
import type { Photo } from "@/src/data/media";

export function StoryMotion({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
export function PhotoFrame({
  photo,
  available,
  priority = false,
}: {
  photo: Photo;
  available: boolean;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={`photo-frame photo-${photo.id}`}>
      {available && !failed ? (
        <Image
          src={`/media/photos/${photo.id}.webp`}
          alt={photo.alt}
          fill
          sizes={
            priority
              ? "(max-width: 760px) 90vw, 45vw"
              : "(max-width: 760px) 80vw, 30vw"
          }
          priority={priority}
          onError={() => setFailed(true)}
          style={{ objectFit: "contain" }}
        />
      ) : (
        <div
          className="photo-placeholder"
          aria-label={`${photo.caption}: photo not yet supplied`}
        >
          <span className="placeholder-star" aria-hidden="true">
            ✦
          </span>
          <span className="eyebrow">A SCENE RESERVED FOR</span>
          <span className="placeholder-caption">{photo.caption}</span>
          <span className="placeholder-note">Her photograph goes here</span>
        </div>
      )}
    </div>
  );
}
export function LoveCards({ items }: { items: string[] }) {
  const [selected, setSelected] = useState<number[]>([]);
  return (
    <div className="love-grid">
      {items.map((item, i) => (
        <motion.button
          key={item}
          className={`love-card ${selected.includes(i) ? "saved" : ""}`}
          aria-pressed={selected.includes(i)}
          onClick={() =>
            setSelected(
              selected.includes(i)
                ? selected.filter((x) => x !== i)
                : [...selected, i],
            )
          }
          whileHover={{ y: -5, rotate: 0 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="card-number">{String(i + 1).padStart(2, "0")}</span>
          <span className="card-heart" aria-hidden="true">
            {selected.includes(i) ? "♥" : "♡"}
          </span>
          <span>{item}</span>
          <small>
            {selected.includes(i)
              ? "A favorite. Obviously."
              : "Tap to mark a favorite"}
          </small>
        </motion.button>
      ))}
    </div>
  );
}
export function Polaroids({
  photos,
  available,
}: {
  photos: Photo[];
  available: string[];
}) {
  const rail = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  function move(direction: number) {
    const next = Math.max(0, Math.min(photos.length - 1, active + direction));
    setActive(next);
    const element = rail.current?.children[next] as HTMLElement | undefined;
    element?.scrollIntoView({
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
      block: "nearest",
      inline: "center",
    });
  }
  return (
    <>
      <div
        className="polaroid-rail"
        ref={rail}
        onScroll={() => {
          if (rail.current) {
            const el = rail.current;
            const children = Array.from(el.children) as HTMLElement[];
            setActive(
              children.reduce(
                (best, child, i) =>
                  Math.abs(child.offsetLeft - el.offsetLeft - el.scrollLeft) <
                  Math.abs(
                    children[best].offsetLeft - el.offsetLeft - el.scrollLeft,
                  )
                    ? i
                    : best,
                0,
              ),
            );
          }
        }}
      >
        {photos.map((photo, i) => (
          <figure className="polaroid" key={photo.id}>
            <span className="tape" aria-hidden="true" />
            <PhotoFrame
              photo={photo}
              available={available.includes(photo.id)}
            />
            <figcaption>
              <span>0{i + 1} / THE EARLY YEARS</span>
              {photo.caption}
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="rail-controls">
        <button
          aria-label="Previous childhood photo"
          onClick={() => move(-1)}
          disabled={active === 0}
        >
          ←
        </button>
        <span aria-live="polite">
          {active + 1} / {photos.length}
        </span>
        <button
          aria-label="Next childhood photo"
          onClick={() => move(1)}
          disabled={active === photos.length - 1}
        >
          →
        </button>
      </div>
    </>
  );
}
export function VideoGallery({
  items,
}: {
  items: { title: string; file: string; captions?: string }[];
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const opener = useRef<HTMLButtonElement>(null);
  const [index, setIndex] = useState(0);
  const [error, setError] = useState(false);
  function close() {
    video.current?.pause();
    dialog.current?.close();
    document.body.style.overflow = "";
    opener.current?.focus();
  }
  return (
    <>
      <button
        className="button dark"
        ref={opener}
        onClick={() => {
          setError(false);
          dialog.current?.showModal();
          document.body.style.overflow = "hidden";
        }}
      >
        Watch the little moments <span>→</span>
      </button>
      <dialog
        ref={dialog}
        aria-label="Little moments gallery"
        onKeyDown={(e) => {
          if (e.key !== "Tab") return;
          const focusable = Array.from(
            dialog.current?.querySelectorAll<HTMLElement>(
              'button, video[controls], a[href], [tabindex="0"]',
            ) || [],
          );
          const first = focusable[0],
            last = focusable[focusable.length - 1];
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last?.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first?.focus();
          }
        }}
        onCancel={close}
        onClick={(e) => {
          if (e.target === dialog.current) close();
        }}
      >
        <div className="dialog-inner">
          <button
            className="dialog-close"
            onClick={close}
            aria-label="Close gallery"
          >
            ✕
          </button>
          <p className="eyebrow">THE LITTLE MOMENTS</p>
          {items.length ? (
            <>
              <h3>{items[index].title}</h3>
              <video
                ref={video}
                key={items[index].file}
                controls
                muted
                playsInline
                preload="none"
                poster={`/media/videos/${items[index].file.split("/").pop()?.replace(".mp4", ".jpg")}`}
                onError={() => setError(true)}
              >
                <source src={items[index].file} type="video/mp4" />
                {items[index].captions && (
                  <track
                    kind="captions"
                    src={items[index].captions}
                    srcLang="en"
                    label="English"
                  />
                )}
              </video>
              {error && (
                <p role="status">
                  This scene couldn’t play. Please try again later.
                </p>
              )}
              <div className="video-tabs">
                {items.map((item, i) => (
                  <button
                    key={item.file}
                    aria-pressed={i === index}
                    onClick={() => {
                      video.current?.pause();
                      setError(false);
                      setIndex(i);
                    }}
                  >
                    {item.title}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="coming-scene">
              <span aria-hidden="true">✦</span>
              <h3>
                A few little moments,
                <br />
                coming soon.
              </h3>
              <p>
                The personal clips haven’t arrived yet.
                <br />
                The story is already yours to explore.
              </p>
            </div>
          )}
        </div>
      </dialog>
    </>
  );
}
export function SaveMemory() {
  const [message, setMessage] = useState("");
  return (
    <>
      <button
        className="text-button"
        onClick={async () => {
          try {
            if (navigator.share)
              await navigator.share({
                title: "Bhavya · The Main Character",
                url: location.href,
              });
            else if (navigator.clipboard) {
              await navigator.clipboard.writeText(location.href);
              setMessage("Link copied. Share it with care.");
            } else {
              window.print();
            }
          } catch (e) {
            if (!(e instanceof DOMException && e.name === "AbortError"))
              setMessage(
                "Sharing unavailable. You can copy the address from your browser.",
              );
          }
        }}
      >
        Save this memory →
      </button>
      <span className="share-status" role="status">
        {message}
      </span>
    </>
  );
}
