"use client";
import { useState } from "react";
const dreams = [
  {
    title: "More beautiful adventures",
    detail: "New places, lovely detours, and a camera roll full of stories.",
  },
  {
    title: "Laugh-until-it-hurts days",
    detail:
      "The silly kind. The unexpected kind. The please-stop-I-can’t-breathe kind.",
  },
  {
    title: "More days that feel like you",
    detail:
      "Taking up space. Wearing the outfit. Being completely, wonderfully you.",
  },
  {
    title: "Dreams with room to grow",
    detail: "Big ones, tiny ones, and the ones you haven’t thought of yet.",
  },
];
export function BirthdayDreams() {
  const [chosen, setChosen] = useState<number[]>([]);
  return (
    <section className="future-scenes birthday-dreams">
      <div className="section-title">
        <span className="tiny-label">A LITTLE WISHLIST FOR TWENTY-ONE</span>
        <h2>
          More of what
          <br />
          <em>makes her glow.</em>
        </h2>
        <p>Birthday-girl wishes. Pick as many as your heart likes.</p>
      </div>
      <div className="future-grid">
        {dreams.map((dream, i) => (
          <button
            key={dream.title}
            className={chosen.includes(i) ? "picked" : ""}
            aria-pressed={chosen.includes(i)}
            onClick={() =>
              setChosen(
                chosen.includes(i)
                  ? chosen.filter((n) => n !== i)
                  : [...chosen, i],
              )
            }
          >
            <span className="future-check" aria-hidden="true">
              {chosen.includes(i) ? "♡" : "+"}
            </span>
            <h3>{dream.title}</h3>
            <p>{dream.detail}</p>
            <span className="tiny-label">
              {chosen.includes(i)
                ? "A WISH FOR THE BIRTHDAY GIRL"
                : "ADD A LITTLE WISH"}
            </span>
          </button>
        ))}
      </div>
      <p className="wish-status script" aria-live="polite">
        {chosen.length
          ? `${chosen.length} little wishes. May twenty-one bring them all.`
          : "The next chapter is hers to dream."}
      </p>
    </section>
  );
}
