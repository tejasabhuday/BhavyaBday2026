"use client";
import { useState } from "react";
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
