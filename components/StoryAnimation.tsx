"use client";
import { motion, useReducedMotion } from "motion/react";
export function PaperArrival({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className="paper-arrival"
      initial={false}
      animate={
        reduced ? { rotate: 0, y: 0 } : { rotate: [-1.2, 0.4, 0], y: [12, 0] }
      }
      transition={{ duration: 0.65, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
export function StoryReveal({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={false}
      whileInView={reduced ? { y: 0 } : { y: [10, 0] }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55 }}
    >
      {children}
    </motion.div>
  );
}
