import { CONFIG } from "../config";
import { useInView } from "../hooks/useInView";
import Reveal from "./Reveal";
import SplitText from "./SplitText";

export default function Schedule() {
  const [ref, inView] = useInView(0.12);
  const { schedule, dressCode } = CONFIG;

  return (
    <section className="section">
      <div className="wm" data-speed=".12" style={{ left: "-4%", top: "8%" }}>♥</div>
      <Reveal className="eyebrow">Rundown</Reveal>
      <SplitText as="h2" text="Rangkaian Acara" className="h2" />

      {/* timeline: garis tergambar saat di-scroll, kartu muncul bergantian kiri–kanan */}
      <div ref={ref} className={`tl ${inView ? "in" : ""}`}>
        {schedule.map((s, i) => (
          <Reveal key={s.time} v={i % 2 ? "r" : "l"} d={Math.min(i, 3)} className={`tl-item ${i % 2 ? "right" : "left"}`}>
            <span className="tl-dot" />
            <div className="tl-card">
              <b className="font-serif text-gold2 text-[1.7rem] font-medium leading-none">{s.time}</b>
              <h4 className="font-serif text-rose mt-1 text-[1.25rem] font-medium">{s.title}</h4>
              <p className="font-serif mt-1 text-[1.02rem] leading-[1.5] opacity-85">{s.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal v="z" d={1} className="mt-6 max-w-[420px]">
        <div className="divider" />
        <div className="eyebrow">Dress Code</div>
        <p className="font-serif mt-3 text-[1.1rem] opacity-90">{dressCode.note}</p>
        <div className="mt-5 flex justify-center gap-4">
          {dressCode.colors.map((c, i) => (
            <div key={c.name} className="flex flex-col items-center gap-2">
              <span className="swatch" style={{ background: c.hex, animationDelay: `${i * 0.4}s` }} />
              <span className="text-[.55rem] uppercase tracking-[.2em] opacity-75">{c.name}</span>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
