import { useEffect, useRef } from "react";

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

/**
 * Efek yang terhubung ke posisi scroll:
 *  - progress bar di atas
 *  - [data-speed]  parallax watermark
 *  - [data-px]     parallax halus untuk foto (di dalam bingkai)
 *  - [data-tn]     progres 0→1 untuk bagian "Dulu & Sekarang" (diset ke CSS var --p)
 */
export default function ScrollFx() {
  const bar = useRef(null);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      const h = document.documentElement.scrollHeight - innerHeight;
      bar.current.style.transform = `scaleX(${h > 0 ? scrollY / h : 0})`;

      document.querySelectorAll("[data-speed]").forEach((el) => {
        const r = el.parentElement.getBoundingClientRect();
        if (r.bottom < 0 || r.top > innerHeight) return;
        el.style.transform = `translate3d(0,${(r.top + r.height / 2 - innerHeight / 2) * parseFloat(el.dataset.speed)}px,0)`;
      });

      document.querySelectorAll("[data-px]").forEach((el) => {
        const r = el.parentElement.getBoundingClientRect();
        if (r.bottom < -50 || r.top > innerHeight + 50) return;
        const off = clamp(r.top + r.height / 2 - innerHeight / 2, -innerHeight, innerHeight);
        el.style.transform = `translate3d(0,${-off * parseFloat(el.dataset.px)}px,0) scale(1.16)`;
      });

      document.querySelectorAll("[data-tn]").forEach((el) => {
        const r = el.getBoundingClientRect();
        const p = clamp(-r.top / (r.height - innerHeight), 0, 1);
        el.style.setProperty("--p", p.toFixed(4));
      });
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    return () => {
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      ref={bar}
      className="from-rose2 via-gold2 to-rose fixed left-0 top-0 z-[95] h-[3px] w-full origin-left scale-x-0 bg-gradient-to-r"
    />
  );
}
