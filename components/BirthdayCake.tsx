"use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { motion, useReducedMotion } from "motion/react";

export function BirthdayCake() {
  const [phase, setPhase] = useState<"lit" | "blowing" | "wished">("lit");
  const [round, setRound] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reduced = useReducedMotion();
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  function blow() {
    if (phase !== "lit") return;
    setRound((r) => r + 1);
    setPhase(reduced ? "wished" : "blowing");
    if (!reduced) timer.current = setTimeout(() => setPhase("wished"), 1400);
  }
  function relight() {
    if (timer.current) clearTimeout(timer.current);
    setPhase("lit");
  }
  return (
    <section className={`birthday-finale cake-${phase}`} id="birthday-cake" aria-labelledby="cake-heading">
      <div className="cake-finale-copy">
        <span className="tiny-label">ONE BIRTHDAY GIRL. TWENTY-ONE LITTLE WISHES.</span>
        <p className="script cake-dedication">And of course, a cake just for you.</p>
        <h2 id="cake-heading">{phase === "wished" ? <>Happy twenty-first,<br /><em>my beautiful baingan.</em></> : <>Make a wish,<br /><em>beautiful baingan.</em></>}</h2>
        <p className="cake-wish-message" role="status" aria-live="polite">
          {phase === "wished" ? "Every good thing you wished for. And a little more. ♡" : phase === "blowing" ? "A little breath. A little birthday magic…" : "Close your eyes. Keep your wish a secret. This moment is all yours."}
        </p>
      </div>
      <motion.div className="cake-scene" initial={false} whileInView={reduced ? { y: 0, rotate: 0 } : { y: [24, 0], rotate: [-2, 1, 0] }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.9 }}>
        <svg className="birthday-cake-art" viewBox="0 0 640 590" role="img" aria-label={`A large pink birthday cake with twenty-one ${phase === "lit" ? "lit" : "extinguished"} candles on a golden stand`}>
          <defs>
            <linearGradient id="cake-pink"><stop stopColor="#db3d88" /><stop offset=".45" stopColor="#ff99c9" /><stop offset="1" stopColor="#e14f93" /></linearGradient>
            <linearGradient id="cake-cream"><stop stopColor="#fff0c7" /><stop offset=".5" stopColor="#fffdf2" /><stop offset="1" stopColor="#f9dba4" /></linearGradient>
            <linearGradient id="cake-gold"><stop stopColor="#b87922" /><stop offset=".45" stopColor="#ffdf6f" /><stop offset=".7" stopColor="#f6c54b" /><stop offset="1" stopColor="#a56821" /></linearGradient>
            <radialGradient id="cake-flame"><stop stopColor="#fff7b5" /><stop offset=".55" stopColor="#ffe34a" /><stop offset="1" stopColor="#ff8b35" /></radialGradient>
          </defs>
          <ellipse cx="320" cy="558" rx="215" ry="18" fill="#b52a59" opacity=".12" />
          <path d="M292 475h56l-8 52 38 16h-116l38-16Z" fill="url(#cake-gold)" />
          <ellipse cx="320" cy="544" rx="118" ry="13" fill="url(#cake-gold)" />
          <ellipse cx="320" cy="470" rx="252" ry="34" fill="url(#cake-gold)" />
          <ellipse cx="320" cy="458" rx="252" ry="30" fill="#ffe997" />
          <path d="M90 335v99c0 58 460 58 460 0v-99Z" fill="url(#cake-pink)" />
          <ellipse cx="320" cy="433" rx="230" ry="35" fill="#d94b8b" />
          <path d="M90 335v99c0 44 460 44 460 0v-99Z" fill="url(#cake-pink)" />
          <ellipse cx="320" cy="335" rx="230" ry="42" fill="url(#cake-cream)" />
          <path d="M91 335c5 28 24 10 31 34s20 21 25-2 31-9 38 16 25 24 28-4 27-6 34 19 27 22 31-5 27-8 36 19 27 17 29-10 31-9 38 14 23 16 28-12 30-11 38 10 22 18 29-10 28-8 35 3 21 12 26-12 30-12 39-5V335Z" fill="#fff7e5" />
          {Array.from({ length: 17 }, (_, i) => <g key={i} transform={`translate(${112 + i * 26},${439 + Math.sin(i / 16 * Math.PI) * 15})`}><circle r="10" fill="#fff1cc" /><circle cy="-4" r="7" fill="#fffaf0" /></g>)}
          <path d="M160 220v94c0 39 320 39 320 0v-94Z" fill="url(#cake-cream)" />
          <path d="M161 272q159 50 318 0v27q-159 44-318 0Z" fill="#ff83b9" />
          <ellipse cx="320" cy="220" rx="160" ry="31" fill="#ffc1de" />
          <path d="M160 220v12q12 17 20 1t25 6 25 7 28 4 26 8 29 5 28 0 32-1 29-6 26-7 28-4 24-9V220q-160 37-320 0Z" fill="#fffaf0" />
          <text x="320" y="311" textAnchor="middle" fontFamily="Georgia,serif" fontSize="51" fontStyle="italic" fill="#a8205c">21</text>
          {[0, 1, 2, 3, 4, 5].map((i) => <g key={i} transform={`translate(${192 + i * 51},${325 + Math.sin(i / 5 * Math.PI) * 10})`}><circle r="9" fill="#f365a5" /><path d="M-5 1q5-9 10 0-5 5-10 0" fill="#ffd0e6" /></g>)}
          <g key={round} className="cake-candles">
            {Array.from({ length: 21 }, (_, i) => {
              const back = i < 11;
              const index = back ? i : i - 11;
              const x = (back ? 200 : 212) + index * 24;
              const y = back ? 209 - Math.sin(index / 10 * Math.PI) * 8 : 228 + Math.sin(index / 9 * Math.PI) * 9;
              return <g className="cake-candle" key={i} transform={`translate(${x},${y})`} style={{ "--blow-delay": `${(20 - i) * 0.022}s`, "--flicker-delay": `${-i * 0.23}s` } as CSSProperties}>
                <rect x="-4" y="-45" width="8" height="45" rx="2" fill={i % 2 ? "#fff9de" : "#ffd655"} />
                <path d="M-4-35l8-5m-8 18 8-5m-8 18 8-5" stroke={i % 2 ? "#f57ab1" : "#df9c21"} strokeWidth="2" />
                <path d="M0-46v-6" stroke="#694735" strokeWidth="2" />
                <g className="cake-flame"><path d="M0-74C-11-62-9-51 0-51S10-61 0-74" fill="url(#cake-flame)" /><path d="M0-64q-5 10 0 11 5-1 0-11" fill="#fffde1" /></g>
                <path className="cake-smoke" d="M0-53q-13-12 0-22t-3-25" fill="none" stroke="#936774" strokeWidth="2" strokeLinecap="round" />
              </g>;
            })}
          </g>
          {phase === "blowing" && <g className="cake-breath" fill="none" stroke="#fffaf0" strokeWidth="4" strokeLinecap="round"><path d="M520 147q-62-28-133 6" /><path d="M559 169q-72-23-150 4" /><path d="M537 193q-49-13-93 3" /></g>}
          <g fill="#e25491" opacity=".7"><path d="m94 185 5-12 5 12 12 5-12 5-5 12-5-12-12-5Z" /><path d="m526 274 4-9 4 9 9 4-9 4-4 9-4-9-9-4Z" /><path d="M536 105q-14-20-22-3t22 27q33-21 23-33-12-10-23 9Z" /></g>
        </svg>
      </motion.div>
      {phase !== "lit" && <div className="cake-confetti" key={round} aria-hidden="true">{Array.from({ length: 48 }, (_, i) => <span key={i} style={{ "--confetti-x": `${4 + (i * 37 % 92)}%`, "--confetti-drift": `${(i % 2 ? 1 : -1) * (30 + i % 7 * 16)}px`, "--confetti-delay": `${i % 9 * 0.065}s`, "--confetti-color": ["#ff368f", "#ffdd43", "#c996f1", "#fff9de"][i % 4], "--confetti-turn": `${180 + i * 47}deg` } as CSSProperties} />)}</div>}
      <div className="cake-finale-controls">
        <button className="button button-ink cake-blow-button" aria-disabled={phase === "blowing"} onClick={phase === "wished" ? relight : blow}>
          {phase === "wished" ? "Light them again" : phase === "blowing" ? "Making birthday magic…" : "Blow out the candles"}<span aria-hidden="true">{phase === "wished" ? "↺" : "♡"}</span>
        </button>
        <p className="script">Twenty-one looks beautiful on you.</p>
      </div>
    </section>
  );
}
