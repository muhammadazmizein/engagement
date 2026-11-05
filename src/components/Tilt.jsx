import { useRef } from "react";

/** Efek miring 3D mengikuti kursor (hanya di perangkat dengan hover). */
export default function Tilt({ children, className = "" }) {
  const ref = useRef(null);
  const canHover = typeof matchMedia !== "undefined" && matchMedia("(hover:hover)").matches;

  const move = (e) => {
    if (!canHover) return;
    const el = ref.current;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${px * 14}deg) rotateX(${-py * 14}deg) scale(1.02)`;
  };
  const leave = () => ref.current && (ref.current.style.transform = "");

  return (
    <div ref={ref} className={`tilt ${className}`} onMouseMove={move} onMouseLeave={leave}>
      {children}
    </div>
  );
}
