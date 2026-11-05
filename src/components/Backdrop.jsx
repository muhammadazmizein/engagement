import { useEffect, useRef } from "react";
import { rand } from "../fx";

const COLS = ["#e8b4bc", "#f4c6cf", "#d98ca0", "#d9b46a", "#f5e0a8", "#ffffff"];

/** Aurora + grain + canvas (kelopak halus, bintang, kembang api sesekali). */
export default function Backdrop() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const c = canvasRef.current;
    const x = c.getContext("2d");
    let W, H, raf;
    const size = () => {
      W = c.width = innerWidth;
      H = c.height = innerHeight;
    };
    size();

    const mk = (init) => ({
      x: rand(0, W), y: init ? rand(0, H) : -20, r: 4 + Math.random() * 7,
      vy: 0.25 + Math.random() * 0.55, vx: rand(-0.25, 0.25), rot: rand(0, 6), vr: rand(-0.015, 0.015),
      sw: rand(0, 6), col: COLS[(Math.random() * 4) | 0], a: 0.25 + Math.random() * 0.35,
    });
    const parts = Array.from({ length: innerWidth < 600 ? 9 : 24 }, () => mk(true));
    const stars = Array.from({ length: innerWidth < 600 ? 22 : 60 }, () => ({ x: rand(0, 1), y: rand(0, 1), r: rand(0.5, 1.4), p: rand(0, 6), s: rand(0.008, 0.03) }));
    const bursts = [];

    const burst = (px, py, n, sp = 7) => {
      for (let i = 0; i < n; i++) {
        const a = rand(0, 6.283), s = rand(1.5, sp);
        bursts.push({ x: px, y: py, vx: Math.cos(a) * s, vy: Math.sin(a) * s - 1.5, life: 1, col: COLS[(Math.random() * COLS.length) | 0], r: rand(1.5, 3.2) });
      }
    };
    const timeouts = [];
    const fireworks = (n) => {
      for (let i = 0; i < n; i++) timeouts.push(setTimeout(() => burst(rand(W * 0.2, W * 0.8), rand(H * 0.15, H * 0.45), 60, 8), i * 420));
    };

    const petal = (p) => {
      x.save(); x.translate(p.x, p.y); x.rotate(p.rot); x.globalAlpha = p.a; x.fillStyle = p.col;
      x.beginPath(); x.moveTo(0, -p.r);
      x.bezierCurveTo(p.r, -p.r / 2, p.r, p.r / 2, 0, p.r);
      x.bezierCurveTo(-p.r, p.r / 2, -p.r, -p.r / 2, 0, -p.r);
      x.fill(); x.restore();
    };

    // di layar sentuh gambar tiap 2 frame (~30fps): gerakan pelan, beban separuhnya
    const half = matchMedia("(pointer: coarse)").matches;
    let skip = false;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (half && (skip = !skip)) return;
      x.clearRect(0, 0, W, H);
      stars.forEach((s) => {
        s.p += s.s; x.globalAlpha = 0.2 + 0.7 * Math.abs(Math.sin(s.p)); x.fillStyle = "#f5e0a8";
        x.beginPath(); x.arc(s.x * W, s.y * H, s.r, 0, 6.283); x.fill();
      });
      parts.forEach((p, i) => {
        p.y += p.vy; p.sw += 0.015; p.x += p.vx + Math.sin(p.sw) * 0.5; p.rot += p.vr; petal(p);
        if (p.y > H + 20) parts[i] = mk();
      });
      for (let i = bursts.length - 1; i >= 0; i--) {
        const b = bursts[i];
        b.x += b.vx; b.y += b.vy; b.vy += 0.09; b.vx *= 0.985; b.life -= 0.012;
        if (b.life <= 0) { bursts.splice(i, 1); continue; }
        x.globalAlpha = b.life; x.fillStyle = b.col; x.shadowBlur = 10; x.shadowColor = b.col;
        x.beginPath(); x.arc(b.x, b.y, b.r * b.life + 0.5, 0, 6.283); x.fill(); x.shadowBlur = 0;
      }
      x.globalAlpha = 1;
    };
    loop();

    const onFw = (e) => fireworks(e.detail);
    addEventListener("resize", size);
    addEventListener("fx:fireworks", onFw);
    return () => {
      cancelAnimationFrame(raf);
      timeouts.forEach(clearTimeout);
      removeEventListener("resize", size);
      removeEventListener("fx:fireworks", onFw);
    };
  }, []);

  return (
    <>
      <div className="aurora"><i /><i /><i /></div>
      <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-[1]" />
      <div className="grain" />
    </>
  );
}
