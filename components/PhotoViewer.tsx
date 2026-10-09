"use client";
import Image from "next/image";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { photos } from "@/src/data/media";

const ViewerContext = createContext<(id: string) => void>(() => {});
export const usePhotoViewer = () => useContext(ViewerContext);
export function PhotoViewer({ children, available }: { children: React.ReactNode; available: string[] }) {
  const pathname = usePathname();
  const [selection, setSelection] = useState<{ ids: string[]; index: number; path: string } | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const active = selection?.path === pathname ? selection : null;
  const photo = active ? photos.find((p) => p.id === active.ids[active.index]) : null;
  const isOpen = !!photo;
  useEffect(() => {
    const element = dialog.current;
    if (!isOpen || !element) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    element.showModal();
    return () => {
      element.close();
      document.body.style.overflow = previousOverflow;
      if (opener.current?.isConnected) opener.current.focus({ preventScroll: true });
    };
  }, [isOpen]);
  function open(id: string) {
    const chosen = photos.find((p) => p.id === id);
    if (!chosen || !available.includes(id)) return;
    const ids = photos.filter((p) => p.group === chosen.group && available.includes(p.id)).map((p) => p.id);
    opener.current = document.activeElement as HTMLElement;
    setSelection({ ids, index: ids.indexOf(id), path: pathname });
  }
  function move(direction: number) {
    setSelection((current) => current ? { ...current, index: Math.max(0, Math.min(current.ids.length - 1, current.index + direction)) } : null);
  }
  return <ViewerContext.Provider value={open}>
    {children}
    <dialog ref={dialog} className="photo-viewer" aria-label="Full-screen photo album" onCancel={(e) => { e.preventDefault(); setSelection(null); }} onClick={(e) => { if (e.target === e.currentTarget) setSelection(null); }} onKeyDown={(e) => {
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") { e.preventDefault(); move(e.key === "ArrowRight" ? 1 : -1); }
    }}>
      {photo && active && <div className="photo-viewer-panel">
        <div className="photo-viewer-top"><span className="tiny-label">A LITTLE MOMENT TO KEEP</span><button className="viewer-close" autoFocus aria-label="Close photo album" onClick={() => setSelection(null)}>✕</button></div>
        <div className="photo-viewer-image" onTouchStart={(e) => { const t = e.touches[0]; touch.current = { x: t.clientX, y: t.clientY }; }} onTouchEnd={(e) => {
          if (!touch.current) return;
          const t = e.changedTouches[0], dx = t.clientX - touch.current.x, dy = t.clientY - touch.current.y;
          touch.current = null;
          if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.5) move(dx < 0 ? 1 : -1);
        }} onTouchCancel={() => { touch.current = null; }}>
          <Image key={photo.id} src={`/media/photos/${photo.id}.webp?v=${photo.revision ?? "1"}`} alt={photo.alt} fill sizes="100vw" unoptimized style={{ objectFit: "contain" }} />
        </div>
        <div className="photo-viewer-bottom"><button aria-label="Previous photo" disabled={active.index === 0} onClick={() => move(-1)}>←</button><div aria-live="polite"><p className="script">{photo.caption}</p><span className="tiny-label">{active.index + 1} / {active.ids.length}</span></div><button aria-label="Next photo" disabled={active.index === active.ids.length - 1} onClick={() => move(1)}>→</button></div>
      </div>}
    </dialog>
  </ViewerContext.Provider>;
}
