"use client";
import { useState } from "react";
export function DancingGlobe() {
  const [dancing, setDancing] = useState(false);
  const [shake, setShake] = useState(0);
  return (
    <section className="globe-experience" aria-labelledby="globe-heading">
      <div className={`keepsake-globe ${dancing ? "is-dancing" : ""}`}>
        <svg
          className="globe-art"
          viewBox="0 0 640 690"
          role="img"
          aria-label="A glass keepsake globe with an original dancing couple: a black suit and a bright yellow dress, surrounded by gold stars"
        >
          <defs>
            <radialGradient id="glass" cx="32%" cy="28%" r="75%">
              <stop offset="0" stopColor="#fff" stopOpacity=".58" />
              <stop offset=".6" stopColor="#fff" stopOpacity=".12" />
              <stop offset="1" stopColor="#fadd43" stopOpacity=".3" />
            </radialGradient>
            <linearGradient id="base" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#29231e" />
              <stop offset=".5" stopColor="#080808" />
              <stop offset="1" stopColor="#514328" />
            </linearGradient>
            <linearGradient id="dress">
              <stop stopColor="#fff16b" />
              <stop offset="1" stopColor="#f6b600" />
            </linearGradient>
            <clipPath id="globe-clip">
              <circle cx="320" cy="275" r="230" />
            </clipPath>
          </defs>
          <ellipse
            cx="320"
            cy="640"
            rx="210"
            ry="20"
            fill="#8d164e"
            opacity=".2"
          />
          <g clipPath="url(#globe-clip)">
            <circle cx="320" cy="275" r="230" fill="url(#glass)" />
            <ellipse
              cx="320"
              cy="443"
              rx="175"
              ry="25"
              fill="#f8d648"
              opacity=".65"
            />
            <g className="globe-grid" stroke="#fff" opacity=".15" fill="none">
              <ellipse cx="320" cy="275" rx="130" ry="230" />
              <ellipse cx="320" cy="275" rx="230" ry="80" />
              <path d="M90 275h460M320 45v460" />
            </g>
            <g className="dancer-pair">
              <g className="dancer-man" fill="#151416">
                <circle cx="283" cy="188" r="22" />
                <path d="M270 210q-24 7-28 43l-12 66 34 7 32-10-2-62 28 10 31-27-9-12-29 18-21-23Z" />
                <path d="m264 315-22 121 16 8 34-99 17 91 18-2-20-120Z" />
                <path d="m242 434-24 10q-9 9 8 9h36v-14Zm67-1 4 18h34q8-5-12-14Z" />
                <path d="m267 217 16 9 12-8-9 33Z" fill="#ffde38" />
                <path d="m255 248-41 13 10 14 37-7Z" />
              </g>
              <g className="dancer-lady">
                <path
                  d="M367 169q-25-17-34 7-10 24 3 46l24-8q25-10 20-30Z"
                  fill="#151416"
                />
                <circle cx="353" cy="190" r="19" fill="#151416" />
                <path
                  d="m339 210-11 34 23 28 27-28-12-34Z"
                  fill="url(#dress)"
                />
                <path
                  d="m337 224-21 12-30-19-9 12 34 28 28-13Zm30 0 37 39-12 13-31-31Z"
                  fill="#151416"
                />
                <path
                  className="dancing-skirt"
                  d="M343 259q-45 38-61 133 55 38 125-1-13-74-47-132Z"
                  fill="url(#dress)"
                />
                <path
                  d="m339 398-5 46h14l8-45Zm23-1 16 44 13-6-12-45Z"
                  fill="#151416"
                />
                <path
                  d="m333 440-17 12h34v-12Zm46-4 1 14h23l-12-14Z"
                  fill="#151416"
                />
                <path
                  d="M345 166q15-9 27 6"
                  stroke="#ffde38"
                  strokeWidth="6"
                  fill="none"
                />
              </g>
              <path
                d="m304 142 7-9q9-9 17 0 8-9 17 0 10 10-17 24Z"
                fill="#ffde38"
                className="dancer-heart"
              />
            </g>
            <g
              key={shake}
              className={`globe-sparkles ${shake ? "globe-shaken" : ""}`}
              fill="#ffe86d"
            >
              {Array.from({ length: 24 }, (_, i) => {
                const x = 135 + ((i * 83) % 365),
                  y = 100 + ((i * 61) % 335);
                return (
                  <path
                    key={i}
                    className="globe-particle"
                    style={{ animationDelay: `${i * 0.055}s` }}
                    d={`M${x} ${y - 5}l2 4 4 1-4 2-2 4-1-4-4-2 4-1Z`}
                  />
                );
              })}
            </g>
            <path
              d="M162 199q23-93 100-110"
              stroke="#fff"
              strokeWidth="10"
              opacity=".7"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M156 222l-3 18"
              stroke="#fff"
              strokeWidth="7"
              opacity=".55"
              fill="none"
              strokeLinecap="round"
            />
          </g>
          <circle
            cx="320"
            cy="275"
            r="230"
            fill="none"
            stroke="#fff4c8"
            strokeWidth="3"
          />
          <ellipse cx="320" cy="513" rx="165" ry="23" fill="#ffdf45" />
          <path
            d="M155 513v59q165 56 330 0v-59q-165 47-330 0Z"
            fill="url(#base)"
          />
          <ellipse cx="320" cy="578" rx="183" ry="24" fill="#eebc2b" />
          <path
            d="M137 578v32q183 59 366 0v-32q-183 48-366 0Z"
            fill="#1a1819"
          />
          <ellipse cx="320" cy="613" rx="183" ry="24" fill="#302729" />
          <rect x="262" y="542" width="116" height="28" rx="3" fill="#ffde45" />
          <text
            x="320"
            y="562"
            textAnchor="middle"
            fontFamily="Georgia,serif"
            fontSize="17"
            fill="#161416"
          >
            BHAVYA · 21
          </text>
        </svg>
      </div>
      <div className="globe-copy">
        <span className="tiny-label">
          A LITTLE KEEPSAKE FOR THE BIRTHDAY GIRL
        </span>
        <h2 id="globe-heading">
          A little twirl.
          <br />
          <em>A little birthday magic.</em>
        </h2>
        <p>
          A black suit, a sunshine-yellow dress, and a tiny world full of
          wishes. This little dance is dedicated to Bhavya.
        </p>
        <div className="globe-controls">
          <button
            className="button button-ink"
            aria-pressed={dancing}
            onClick={() => setDancing(!dancing)}
          >
            {dancing ? "Pause the dance" : "Let them dance"}{" "}
            <span aria-hidden="true">{dancing ? "Ⅱ" : "♡"}</span>
          </button>
          <button
            className="button globe-shake-button"
            onClick={() => setShake(shake + 1)}
          >
            Shake the globe <span aria-hidden="true">✧</span>
          </button>
        </div>
        <p className="globe-status script" aria-live="polite">
          {dancing
            ? "A tiny dance. An enormous birthday wish."
            : "Ready whenever the birthday girl is."}
        </p>
      </div>
    </section>
  );
}
