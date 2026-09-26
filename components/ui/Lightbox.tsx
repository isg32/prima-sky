"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Icon from "./Icon";

export type LightboxItem = { src: string; alt: string; title?: string; caption?: string };

type Labels = { close: string; prev: string; next: string };

export default function Lightbox({
  items,
  index,
  onClose,
  labels,
}: {
  items: LightboxItem[];
  index: number | null;
  onClose: () => void;
  labels: Labels;
}) {
  const [i, setI] = useState(index ?? 0);
  const [prevIndex, setPrevIndex] = useState(index);
  const closeRef = useRef<HTMLButtonElement>(null);
  const x0 = useRef<number | null>(null);
  const open = index !== null;
  const many = items.length > 1;

  if (index !== prevIndex) {
    setPrevIndex(index);
    if (index !== null) setI(index);
  }

  const go = useCallback((d: number) => setI((v) => (v + d + items.length) % items.length), [items.length]);

  useEffect(() => {
    if (!open) return;
    const last = document.activeElement as HTMLElement | null;
    window.__lenis?.stop();
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (many && e.key === "ArrowRight") go(1);
      if (many && e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      window.__lenis?.start();
      last?.focus();
    };
  }, [open, many, go, onClose]);

  if (!open || typeof document === "undefined") return null;
  const item = items[i];

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.title ?? item.alt}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-night/95 p-4 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onTouchStart={(e) => (x0.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (x0.current === null || !many) return;
        const dx = e.changedTouches[0].clientX - x0.current;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        x0.current = null;
      }}
    >
      <div className="relative h-[80vh] w-full max-w-[1600px]" onClick={onClose}>
        <Image key={item.src} src={item.src} alt={item.alt} fill sizes="100vw" className="object-contain" quality={85} />
      </div>
      {(item.title || item.caption) && (
        <p className="absolute inset-x-0 bottom-5 px-16 text-center text-sm text-white/80">
          {item.title && <b className="font-semibold text-white">{item.title}</b>}
          {item.caption && <> — {item.caption}</>}
        </p>
      )}
      <button ref={closeRef} onClick={onClose} aria-label={labels.close} className="absolute top-4 right-4 p-3 text-white/80 hover:text-white">
        <Icon name="close" size={26} />
      </button>
      {many && (
        <>
          <button onClick={() => go(-1)} aria-label={labels.prev} className="absolute top-1/2 left-2 -translate-y-1/2 p-3 text-white/70 hover:text-white">
            <Icon name="chevL" size={30} />
          </button>
          <button onClick={() => go(1)} aria-label={labels.next} className="absolute top-1/2 right-2 -translate-y-1/2 p-3 text-white/70 hover:text-white">
            <Icon name="chevR" size={30} />
          </button>
          <span className="mono absolute top-6 left-6 text-xs tracking-widest text-white/60">
            {String(i + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
          </span>
        </>
      )}
    </div>,
    document.body,
  );
}
