import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { CONFIG } from "../config";
import { lockScroll, unlockScroll } from "../scroll";

/** Foto layar penuh: tombol panah / keyboard / geser jari untuk pindah, Esc atau klik latar untuk menutup. */
export default function Lightbox({ index, onClose, onChange }) {
  const { photos } = CONFIG;
  const n = photos.length;
  const touchX = useRef(null);
  const go = (d) => onChange((index + d + n) % n);

  useEffect(() => {
    lockScroll();
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prevOverflow;
      unlockScroll();
    };
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  });

  // portal ke <body> supaya tidak terjebak di stacking context <main> (z-index rendah)
  return createPortal(
    <div
      className="lb"
      role="dialog"
      aria-modal="true"
      aria-label="Foto"
      onClick={onClose}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current == null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
    >
      <img key={index} className="lb-img" src={photos[index].src} alt="Foto Azmi & Gina" onClick={(e) => e.stopPropagation()} />
      <button className="lb-btn lb-close" aria-label="Tutup" onClick={onClose}>✕</button>
      <button className="lb-btn lb-prev" aria-label="Sebelumnya" onClick={(e) => { e.stopPropagation(); go(-1); }}>‹</button>
      <button className="lb-btn lb-next" aria-label="Berikutnya" onClick={(e) => { e.stopPropagation(); go(1); }}>›</button>
      <span className="lb-count">{index + 1} / {n}</span>
    </div>,
    document.body
  );
}
