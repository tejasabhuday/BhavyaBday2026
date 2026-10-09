export type MotifName =
  "star" | "heart" | "flower" | "ticket" | "envelope" | "film" | "train";
export function Motif({
  name,
  className = "",
}: {
  name: string;
  className?: string;
}) {
  return (
    <svg
      className={`motif ${className}`}
      viewBox="0 0 160 160"
      fill="none"
      aria-hidden="true"
    >
      <g
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {name === "heart" && (
          <>
            <path d="M80 126C65 115 23 83 23 56c0-31 40-38 57-11 17-27 57-20 57 11 0 27-42 59-57 70Z" />
            <path d="m42 50-7 10m64-20 10 5" />
          </>
        )}
        {name === "star" && (
          <>
            <path d="m80 17 15 43 46 1-37 28 13 44-37-26-37 26 13-44-37-28 46-1Z" />
            <path d="m80 5 0-3m68 47 6-3M12 47l-6-3m130 98 5 5m-113-5-5 5" />
          </>
        )}
        {name === "flower" && (
          <>
            <path d="M80 143V65m0 46c-27 0-34-19-34-19 23-3 34 19 34 19Zm0 14c27 0 34-19 34-19-23-3-34 19-34 19Z" />
            <path d="M80 70C41 82 30 41 46 33c12-6 22 8 25 14-9-31 6-46 16-37 11 10 4 28-1 36 20-19 41-10 37 4-4 15-25 24-43 20Z" />
          </>
        )}
        {name === "envelope" && (
          <>
            <rect x="19" y="44" width="122" height="78" rx="4" />
            <path d="m21 48 59 43 59-43m-118 70 43-36m75 36-43-36" />
            <path d="M80 78c-17-11-14-22-6-22 4 0 6 4 6 4s2-4 6-4c8 0 11 11-6 22Z" />
          </>
        )}
        {name === "ticket" && (
          <>
            <path d="M19 42h122v23c-16 0-16 29 0 29v23H19V94c16 0 16-29 0-29Z" />
            <path d="M111 48v8m0 10v8m0 10v8m0 10v8M38 61h47M38 77h32M38 96h47" />
          </>
        )}
        {name === "film" && (
          <>
            <rect x="23" y="18" width="114" height="124" rx="4" />
            <rect x="43" y="34" width="74" height="92" rx="2" />
            <path d="m71 63 25 17-25 17V63Z" />
            {[30, 53, 76, 99, 122].map((y) => (
              <g key={y}>
                <path d={`M29 ${y}h7m88 0h7`} />
              </g>
            ))}
          </>
        )}
        {name === "train" && (
          <>
            <rect x="35" y="22" width="90" height="108" rx="22" />
            <path d="M35 78h90M60 22v56m40-56v56m-50 52-13 17m73-17 13 17M50 45h60" />
            <circle cx="56" cy="104" r="7" />
            <circle cx="104" cy="104" r="7" />
          </>
        )}
      </g>
    </svg>
  );
}
export function BirthdayStillLife() {
  return (
    <div
      className="still-life"
      aria-label="Original birthday illustration: flowers, a love letter, and a cinema ticket"
      role="img"
    >
      <div className="still-life-paper">
        <span className="tiny-label">THE TWENTY-FIRST BIRTHDAY EDITION</span>
        <div className="still-life-monogram">
          B<span>.</span>
        </div>
        <span className="script">my favourite person.</span>
        <div className="still-life-lines" />
      </div>
      <div className="illustrated-flower flower-one">
        <Motif name="flower" />
      </div>
      <div className="illustrated-flower flower-two">
        <Motif name="flower" />
      </div>
      <div className="still-life-envelope">
        <Motif name="envelope" />
        <span>for you, always.</span>
      </div>
      <div className="still-life-ticket">
        <span>HER 21ST BIRTHDAY</span>
        <b>BHAVYA · 21</b>
        <span>A REALLY GOOD NEXT CHAPTER</span>
      </div>
      <span className="still-life-star star-one">✳</span>
      <span className="still-life-star star-two">✳</span>
    </div>
  );
}
