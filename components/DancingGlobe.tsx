"use client";
import { useEffect, useRef, useState } from "react";
type GlobeMusic = { title: string; artist: string; file: string };
export function DancingGlobe({ music = null }: { music?: GlobeMusic | null }) {
  const [dancing, setDancing] = useState(false);
  const [requested, setRequested] = useState(false);
  const [shake, setShake] = useState(0);
  const [muted, setMuted] = useState(false);
  const [musicError, setMusicError] = useState(false);
  const audio = useRef<HTMLAudioElement>(null);
  const danceRequested = useRef(false);
  useEffect(() => {
    const player = audio.current;
    if (player) player.volume = 0.45;
    const pauseWhenHidden = () => {
      if (document.visibilityState === "hidden") {
        danceRequested.current = false;
        setRequested(false);
        player?.pause();
        setDancing(false);
      }
    };
    document.addEventListener("visibilitychange", pauseWhenHidden);
    return () => {
      danceRequested.current = false;
      player?.pause();
      document.removeEventListener("visibilitychange", pauseWhenHidden);
    };
  }, [music?.file]);
  function toggleDance() {
    const next = !danceRequested.current;
    danceRequested.current = next;
    setRequested(next);
    setDancing(next && !audio.current);
    if (!next) {
      audio.current?.pause();
      return;
    }
    const player = audio.current;
    if (player) {
      if (player.ended) player.currentTime = 0;
      setMusicError(false);
      // Invoke play directly from the click, preserving the browser's user gesture.
      void player.play().then(() => {
        if (!danceRequested.current) player.pause();
      }).catch(() => {
        if (danceRequested.current) { setMusicError(true); setDancing(true); }
      });
    }
  }
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
              <stop offset="0" stopColor="#fff" stopOpacity=".35" />
              <stop offset=".6" stopColor="#fff" stopOpacity=".12" />
              <stop offset="1" stopColor="#fadd43" stopOpacity=".18" />
            </radialGradient>
            <filter id="soft-glass"><feGaussianBlur stdDeviation="7" /></filter>
            <radialGradient id="glass-light"><stop stopColor="#fff" stopOpacity=".8" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></radialGradient>
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
            <g className="globe-floating-gold" fill="#f3cc57" aria-hidden="true">{Array.from({ length: 32 }, (_, i) => <circle key={i} cx={140 + i * 67 % 360} cy={90 + i * 53 % 350} r={i % 3 === 0 ? 2.5 : 1.4} style={{ animationDelay: `${-i * .7}s`, animationDuration: `${6 + i % 5}s` }} />)}</g>
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
              opacity=".28"
              filter="url(#soft-glass)"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M156 222l-3 18"
              stroke="#fff"
              strokeWidth="7"
              opacity=".2"
              fill="none"
              strokeLinecap="round"
            />
            <ellipse cx="195" cy="180" rx="48" ry="105" transform="rotate(28 195 180)" fill="url(#glass-light)" opacity=".55" />
            <path d="M458 151q82 150-6 266" fill="none" stroke="#fff" strokeWidth="18" opacity=".18" filter="url(#soft-glass)" />
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
            aria-pressed={requested}
            onClick={toggleDance}
          >
            {requested ? "Pause the dance" : "Let them dance"}{" "}
            <span aria-hidden="true">{requested ? "Ⅱ" : "♡"}</span>
          </button>
          <button
            className="button globe-shake-button"
            onClick={() => setShake(shake + 1)}
          >
            Shake the globe <span aria-hidden="true">✧</span>
          </button>
        </div>
        {music && (
          <div className="globe-music">
            <audio
              ref={audio}
              src={music.file}
              preload="none"
              muted={muted}
              aria-label={`${music.title} by ${music.artist}`}
              onError={() => { setMusicError(true); if (danceRequested.current) setDancing(true); }}
              onPlaying={() => { if (danceRequested.current) setDancing(true); }}
              onPause={() => setDancing(false)}
              onWaiting={() => setDancing(false)}
              onEnded={() => {
                danceRequested.current = false;
                setRequested(false);
                setDancing(false);
              }}
            />
            <p className="globe-song-credit">♪ {music.title} · {music.artist}</p>
            <div className="globe-sound-controls">
              <button className="underlined-link" aria-pressed={muted} onClick={() => setMuted(!muted)}>
                {muted ? "Unmute song" : "Mute song"}
              </button>
              <label>
                Volume
                <input type="range" min="0" max="1" step="0.05" defaultValue="0.45" aria-label="Song volume" onChange={(e) => {
                  if (audio.current) audio.current.volume = Number(e.target.value);
                }} />
              </label>
            </div>
            {musicError && <p role="status">The song couldn’t play. The little dance can still go on.</p>}
          </div>
        )}
        <p className="globe-status script" aria-live="polite">
          {dancing
            ? "A tiny dance. An enormous birthday wish."
            : "Ready whenever the birthday girl is."}
        </p>
      </div>
    </section>
  );
}
