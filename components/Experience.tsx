"use client";
import Image from "next/image";
import { useState } from "react";
import { MotionConfig } from "motion/react";
import type { Photo } from "@/src/data/media";
export function StoryMotion({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
export function PhotoFrame({
  photo,
  available,
  priority = false,
}: {
  photo: Photo;
  available: boolean;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={`photo-frame photo-${photo.id}`}>
      {available && !failed ? (
        <Image
          src={`/media/photos/${photo.id}.webp`}
          alt={photo.alt}
          fill
          sizes={
            priority
              ? "(max-width: 800px) 90vw, 40vw"
              : "(max-width: 480px) 90vw, (max-width: 800px) 45vw, 30vw"
          }
          priority={priority}
          onError={() => setFailed(true)}
          style={{ objectFit: "contain" }}
        />
      ) : (
        <div
          className="photo-placeholder"
          role="img"
          aria-label={`${photo.caption}. Personal photo to be added.`}
        >
          <span className="placeholder-star" aria-hidden="true">
            ♡
          </span>
          <span className="placeholder-caption">{photo.caption}</span>
          <span className="placeholder-note">A little moment to keep.</span>
        </div>
      )}
    </div>
  );
}
