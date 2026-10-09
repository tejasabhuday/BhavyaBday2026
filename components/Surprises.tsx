"use client";
import { useState, useSyncExternalStore } from "react";
import { motion } from "motion/react";
import { Motif } from "./Artwork";
import { siteContent } from "@/src/data/siteContent";
export function SecretHeart() {
  const [open, setOpen] = useState(false);
  return (
    <div className="secret-heart">
      <button
        aria-label="A tiny secret for you"
        aria-expanded={open}
        aria-controls="tiny-secret"
        onClick={() => setOpen(!open)}
      >
        <Motif name="heart" />
      </button>
      <p id="tiny-secret" hidden={!open}>
        Beautiful baingan, even this tiny heart is yours.
      </p>
    </div>
  );
}
export function LoveNotes() {
  const [opened, setOpened] = useState<number[]>([]);
  return (
    <>
      <div className="notes-counter" aria-live="polite">
        <span>{opened.length} / 10 little confessions opened</span>
        <button
          onClick={() =>
            setOpened(
              opened.length === 10
                ? []
                : siteContent.loveNotes.map((_, i) => i),
            )
          }
        >
          {opened.length === 10 ? "Fold them back" : "Open every note"}{" "}
          <span aria-hidden="true">→</span>
        </button>
      </div>
      <div className="notes-grid">
        {siteContent.loveNotes.map((note, i) => {
          const open = opened.includes(i);
          return (
            <motion.article
              className={`note-card note-${i % 4} ${open ? "note-open" : ""}`}
              key={note.title}
              whileHover={{ y: -4 }}
            >
              <button
                aria-expanded={open}
                aria-controls={`love-note-${i}`}
                onClick={() =>
                  setOpened(
                    open ? opened.filter((n) => n !== i) : [...opened, i],
                  )
                }
              >
                <span className="note-index">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="note-mark" aria-hidden="true">
                  {open ? "−" : "+"}
                </span>
                <h2>{note.title}</h2>
                <span className="tiny-label">
                  {open ? "I MEAN EVERY WORD" : "A LITTLE CONFESSION INSIDE"}
                </span>
              </button>
              <p id={`love-note-${i}`} hidden={!open}>
                {note.note}
              </p>
            </motion.article>
          );
        })}
      </div>
    </>
  );
}
export function OpenWhen() {
  const [selected, setSelected] = useState<number | null>(null);
  return (
    <section className="open-when">
      <div>
        <span className="tiny-label">SAVE THESE FOR LATER</span>
        <h2>Open when…</h2>
        <p>Sometimes the small notes matter most.</p>
      </div>
      <div className="open-when-list">
        {siteContent.openWhen.map((note, i) => (
          <div key={note.label}>
            <button
              aria-expanded={selected === i}
              aria-controls={`when-${i}`}
              onClick={() => setSelected(selected === i ? null : i)}
            >
              <Motif name="envelope" />
              <span>{note.label}</span>
              <b aria-hidden="true">{selected === i ? "−" : "+"}</b>
            </button>
            <p id={`when-${i}`} hidden={selected !== i}>
              {note.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
export function BirthdayCandles() {
  const [lit, setLit] = useState(true);
  return (
    <div className="birthday-wish">
      <div className={`cake ${lit ? "candles-lit" : ""}`} aria-hidden="true">
        <div className="candles">
          {[0, 1, 2].map((i) => (
            <span className="candle" key={i}>
              <i />
            </span>
          ))}
        </div>
        <div className="cake-top" />
        <div className="cake-base">TWENTY ONE ♡</div>
        <div className="cake-plate" />
      </div>
      <div>
        <span className="tiny-label">21 CANDLES. A WHOLE LOT OF WISHES.</span>
        <h2>{lit ? "Make a wish, beautiful." : "I hope it comes true."}</h2>
        <p aria-live="polite">
          {lit
            ? "Keep it to yourself. This bit is just yours."
            : "Every good thing you wished for. And a little more."}
        </p>
        <button className="button button-ink" onClick={() => setLit(!lit)}>
          {lit ? "Blow out the candles" : "Light them again"}{" "}
          <span aria-hidden="true">{lit ? "♡" : "↺"}</span>
        </button>
      </div>
    </div>
  );
}
const planKey = "bhavya-next-scenes-v1";
function subscribe(cb: () => void) {
  window.addEventListener("bhavya-plans", cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener("bhavya-plans", cb);
    window.removeEventListener("storage", cb);
  };
}
function snapshot() {
  try {
    return localStorage.getItem(planKey) || "[]";
  } catch {
    return "[]";
  }
}
function empty() {
  return "[]";
}
export function FutureScenes() {
  const raw = useSyncExternalStore(subscribe, snapshot, empty);
  let selected: string[] = [];
  try {
    const value = JSON.parse(raw);
    if (Array.isArray(value))
      selected = value.filter((v) => typeof v === "string");
  } catch {}
  const [status, setStatus] = useState("");
  function toggle(id: string) {
    try {
      const next = selected.includes(id)
        ? selected.filter((x) => x !== id)
        : [...selected, id];
      localStorage.setItem(planKey, JSON.stringify(next));
      window.dispatchEvent(new Event("bhavya-plans"));
      setStatus("Saved on this device. A little plan for a future scene.");
    } catch {
      setStatus(
        "This browser can’t save a list. The ideas are still yours to keep.",
      );
    }
  }
  return (
    <section className="future-scenes">
      <div className="section-title">
        <span className="tiny-label">AFTER THE DISTANCE</span>
        <h2>
          A few scenes
          <br />
          <em>I’d love with you.</em>
        </h2>
        <p>
          Pick the ones you like. No grand schedule. Just things to look forward
          to.
        </p>
      </div>
      <div className="future-grid">
        {siteContent.futureScenes.map((scene) => (
          <button
            className={selected.includes(scene.id) ? "picked" : ""}
            key={scene.id}
            aria-pressed={selected.includes(scene.id)}
            onClick={() => toggle(scene.id)}
          >
            <span className="future-check" aria-hidden="true">
              {selected.includes(scene.id) ? "✓" : "+"}
            </span>
            <h3>{scene.title}</h3>
            <p>{scene.detail}</p>
            <span className="tiny-label">
              {selected.includes(scene.id)
                ? "ON YOUR LITTLE LIST"
                : "ADD TO YOUR LITTLE LIST"}
            </span>
          </button>
        ))}
      </div>
      <p className="storage-note" role="status">
        {status ||
          "Your picks stay in this browser. Nothing is sent to me or a server."}
      </p>
    </section>
  );
}
