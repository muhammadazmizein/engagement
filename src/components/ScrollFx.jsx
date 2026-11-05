import { useEffect, useRef } from "react";

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

/**
 * Efek yang terhubung ke posisi scroll:
 *  - progress bar di atas
 *  - [data-speed]  parallax watermark (dimatikan di layar sentuh)
 *  - [data-px]     parallax halus untuk foto di dalam bingkai
 *  - [data-tn]     progres 0→1 untuk "Dulu & Sekarang" (diset ke CSS var --p)
 *
 * Dibuat hemat: elemen di-cache, hanya elemen yang dekat layar yang diproses
 * (IntersectionObserver), dan semua pembacaan layout dilakukan SEBELUM penulisan style
 * supaya browser tidak menghitung layout berulang kali per frame.
 */
export default function ScrollFx() {
  const bar = useRef(null);

  useEffect(() => {
    const coarse = matchMedia("(pointer: coarse)").matches;
    const groups = {
      speed: coarse ? [] : [...document.querySelectorAll("[data-speed]")],
      px: [...document.querySelectorAll("[data-px]")],
      tn: [...document.querySelectorAll("[data-tn]")],
    };
    const near = new Set(); // elemen yang sedang dekat layar
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? near.add(e.target) : near.delete(e.target)));
        onScroll(); // segarkan segera, termasuk saat halaman melompat jauh tanpa event scroll lanjutan
      },
      { rootMargin: "120px 0px" }
    );
    // parallax dihitung dari parent (kotak yang tidak ikut bergeser); tn dari dirinya sendiri
    groups.speed.forEach((el) => io.observe(el.parentElement));
    groups.px.forEach((el) => io.observe(el.parentElement));
    groups.tn.forEach((el) => io.observe(el));
    const isNear = (el, useParent) => near.has(useParent ? el.parentElement : el);

    let ticking = false;
    const update = () => {
      ticking = false;
      const vh = innerHeight;

      // 1) BACA semua dulu
      const reads = [];
      groups.speed.forEach((el) => {
        if (!isNear(el, true)) return;
        const r = el.parentElement.getBoundingClientRect();
        reads.push(() => (el.style.transform = `translate3d(0,${(r.top + r.height / 2 - vh / 2) * parseFloat(el.dataset.speed)}px,0)`));
      });
      groups.px.forEach((el) => {
        if (!isNear(el, true)) return;
        const r = el.parentElement.getBoundingClientRect();
        const off = clamp(r.top + r.height / 2 - vh / 2, -vh, vh);
        reads.push(() => (el.style.transform = `translate3d(0,${-off * parseFloat(el.dataset.px)}px,0) scale(1.16)`));
      });
      groups.tn.forEach((el) => {
        if (!isNear(el, false)) return;
        const r = el.getBoundingClientRect();
        const p = clamp(-r.top / (r.height - vh), 0, 1);
        reads.push(() => el.style.setProperty("--p", p.toFixed(3)));
      });
      const h = document.documentElement.scrollHeight - vh;
      const prog = h > 0 ? scrollY / h : 0;

      // 2) baru TULIS semua
      bar.current.style.transform = `scaleX(${prog})`;
      reads.forEach((write) => write());
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
      io.disconnect();
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
