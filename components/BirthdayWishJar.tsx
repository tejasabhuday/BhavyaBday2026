"use client";
import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
const wishes = [
  "More days when you feel as beautiful as you are.",
  "Pink skies, golden little joys, and your favourite kind of laughter.",
  "Adventures that leave you with a story and a very full camera roll.",
  "The confidence to wear the outfit and make the entrance.",
  "A million little reasons to do that lovely smile.",
  "Dreams that grow right alongside you.",
  "Good surprises at the most wonderfully inconvenient times.",
  "The kind of friendships that make every chapter sweeter.",
  "More room for your silly, not-so-serious side.",
  "Ordinary days that quietly turn into favourite memories.",
  "A whole year of birthday-girl energy, even when it isn’t your birthday.",
  "Places that make you stop, look around, and say: this is lovely.",
  "Rest when you need it, without having to earn it.",
  "The certainty that every version of you is worth celebrating.",
  "A little more magic in the moments between the big plans.",
  "Laughs so good that the photograph comes out blurry.",
  "All the lovely things you haven’t thought to wish for yet.",
  "The courage to choose the things that make you feel like you.",
  "Something to smile about on even the most ordinary Tuesday.",
  "More light, more colour, and a very unreasonable amount of cake.",
  "Twenty-one looks gorgeous on you, beautiful baingan. May the whole chapter be just as lovely.",
];
export function BirthdayWishJar() {
  const [index, setIndex] = useState(-1);
  const reduced = useReducedMotion();
  return (
    <section className="birthday-wish-jar">
      <span className="tiny-label">
        21 LITTLE WISHES FOR 21 WONDERFUL YEARS
      </span>
      <h2>
        A wish for
        <br />
        <em>the birthday girl.</em>
      </h2>
      <div className="wish-jar-note" aria-live="polite">
        <motion.p
          key={index}
          className="script"
          initial={false}
          animate={reduced ? { y: 0 } : { y: [7, 0] }}
          transition={{ duration: 0.4 }}
        >
          {index < 0
            ? "There’s a little birthday wish waiting in here."
            : wishes[index]}
        </motion.p>
        {index >= 0 && (
          <span className="tiny-label">WISH {index + 1} / 21</span>
        )}
      </div>
      <button
        className="button button-ink"
        onClick={() => setIndex((index + 1) % wishes.length)}
      >
        {index < 0 ? "Pick a birthday wish" : "One more little wish"}{" "}
        <span aria-hidden="true">♡</span>
      </button>
    </section>
  );
}
