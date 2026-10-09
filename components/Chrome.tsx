"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import { chapters } from "@/src/data/siteContent";
const visitKey = "bhavya-visited-chapters-v2";
function subscribe(callback: () => void) {
  window.addEventListener("bhavya-visit", callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("bhavya-visit", callback);
    window.removeEventListener("storage", callback);
  };
}
function snapshot() {
  try {
    return localStorage.getItem(visitKey) || "[]";
  } catch {
    return "[]";
  }
}
function serverSnapshot() {
  return "[]";
}
export function useVisited() {
  const raw = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return [
      ...new Set(
        parsed
          .filter((p): p is string => typeof p === "string")
          .map((p) => (p === "/screening-room" ? "/a-little-magic" : p))
          .filter((p) => chapters.some((c) => c.href === p)),
      ),
    ];
  } catch {
    return [];
  }
}
export function Navigation() {
  const pathname = usePathname();
  const chapterPath = pathname.startsWith("/love-notes/")
    ? "/love-notes"
    : pathname;
  const [menuFor, setMenuFor] = useState<string | null>(null);
  const open = menuFor === pathname;
  useEffect(() => {
    try {
      const previous = JSON.parse(snapshot());
      const list = Array.isArray(previous) ? previous : [];
      if (
        chapters.some((c) => c.href === chapterPath) &&
        !list.includes(chapterPath)
      ) {
        localStorage.setItem(visitKey, JSON.stringify([...list, chapterPath]));
        window.dispatchEvent(new Event("bhavya-visit"));
      }
    } catch {
      /* Storage is optional; browsing works without it. */
    }
  }, [chapterPath]);
  return (
    <header
      className="site-header"
      onKeyDown={(e) => {
        if (e.key === "Escape" && open) {
          setMenuFor(null);
          document.querySelector<HTMLButtonElement>(".menu-button")?.focus();
        }
      }}
    >
      <Link className="wordmark" href="/" aria-label="For Bhavya, home">
        for Bhavya<span>.</span>
      </Link>
      <nav className="desktop-nav" aria-label="Chapters">
        {chapters.map((c) => (
          <Link
            href={c.href}
            key={c.href}
            aria-current={chapterPath === c.href ? "page" : undefined}
          >
            {c.short}
          </Link>
        ))}
      </nav>
      <button
        className="menu-button"
        aria-expanded={open}
        aria-controls="mobile-navigation"
        onClick={() => setMenuFor(open ? null : pathname)}
      >
        {open ? "Close" : "Chapters"}
        <span aria-hidden="true">{open ? "−" : "+"}</span>
      </button>
      <nav
        className="mobile-nav"
        id="mobile-navigation"
        hidden={!open}
        aria-label="Mobile chapters"
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            setMenuFor(null);
            document.querySelector<HTMLButtonElement>(".menu-button")?.focus();
          }
        }}
      >
        {chapters.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            aria-current={chapterPath === c.href ? "page" : undefined}
            onClick={() => setMenuFor(null)}
          >
            <span>{c.number}</span>
            {c.title}
            <span>→</span>
          </Link>
        ))}
      </nav>
    </header>
  );
}
export function ChapterPassport() {
  const visited = useVisited();
  return (
    <div className="passport">
      <div>
        <span className="tiny-label">YOUR LITTLE BIRTHDAY PASSPORT</span>
        <p>Take your time. There’s no wrong order.</p>
      </div>
      <div
        className="passport-stamps"
        aria-label={`${visited.length} of ${chapters.length} chapters visited`}
      >
        {chapters.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className={visited.includes(c.href) ? "stamped" : ""}
            aria-label={`${c.short}${visited.includes(c.href) ? ", visited" : ""}`}
          >
            <span>{c.number}</span>
            <small>{c.short}</small>
          </Link>
        ))}
      </div>
      {visited.length === chapters.length && (
        <p className="passport-complete" role="status">
          Every chapter, all for you. Come back whenever you like. ♡
        </p>
      )}
    </div>
  );
}
