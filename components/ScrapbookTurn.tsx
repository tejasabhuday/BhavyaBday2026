"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useReducedMotion } from "motion/react";

export function ScrapbookTurn({ number, children }: { number: number; children: React.ReactNode }) {
  const router = useRouter();
  const reduced = useReducedMotion();
  const [turn, setTurn] = useState<"next" | "previous" | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const suppressClickUntil = useRef(0);
  const touch = useRef<{ x: number; y: number } | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  function navigate(target: number) {
    if (turn || target === number || target < 1 || target > 10) return;
    const href = `/love-notes/${target}`;
    if (reduced) { router.push(href); return; }
    setTurn(target > number ? "next" : "previous");
    timer.current = setTimeout(() => router.push(href), 420);
  }
  return <div className={`scrapbook-turn ${turn ? `turn-${turn}` : "turn-arriving"}`} onClickCapture={(e) => {
    if (Date.now() < suppressClickUntil.current) { e.preventDefault(); e.stopPropagation(); return; }
    if (e.defaultPrevented || e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
    const link = (e.target as HTMLElement).closest<HTMLAnchorElement>("a[href]");
    const match = link?.getAttribute("href")?.match(/^\/love-notes\/(\d+)$/);
    if (match) { e.preventDefault(); navigate(Number(match[1])); }
  }} onTouchStart={(e) => {
    const target = e.target as HTMLElement;
    if (e.touches.length !== 1 || target.closest("a, input, dialog") || (target.closest("button") && !target.closest(".photo-open"))) return;
    const t = e.touches[0];
    touch.current = { x: t.clientX, y: t.clientY };
  }} onTouchEnd={(e) => {
    if (!touch.current) return;
    const t = e.changedTouches[0], dx = t.clientX - touch.current.x, dy = t.clientY - touch.current.y;
    touch.current = null;
    if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.7) {
      suppressClickUntil.current = Date.now() + 500;
      navigate(number + (dx < 0 ? 1 : -1));
    }
  }} onTouchCancel={() => { touch.current = null; }}>
    {children}
    <p className="scrapbook-swipe-hint script">Turn a page. On your phone, a little swipe works too.</p>
  </div>;
}
