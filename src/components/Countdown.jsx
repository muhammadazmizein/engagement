import { CONFIG } from "../config";
import { useCountdown } from "../hooks/useCountdown";
import Reveal from "./Reveal";
import SplitText from "./SplitText";

export default function Countdown() {
  const t = useCountdown(CONFIG.eventDate);
  const items = [
    ["Hari", t.hari],
    ["Jam", t.jam],
    ["Menit", t.menit],
    ["Detik", t.detik],
  ];
  return (
    <section className="section">
      <div className="wm" data-speed=".14" style={{ left: "5%", top: "20%" }}>2027</div>
      <Reveal className="eyebrow">Countdown</Reveal>
      <SplitText as="h2" text="Sebentar Lagi!" className="h2" />
      <Reveal v="z" d={2} className="mt-7 flex w-full flex-wrap justify-center gap-2 sm:gap-[clamp(10px,3vw,26px)]">
        {items.map(([label, val]) => (
          <div key={label} className="box">
            {/* key = nilai → animasi pop ter-retrigger tiap angka berganti */}
            <b key={val}>{val}</b>
            <span>{label}</span>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
