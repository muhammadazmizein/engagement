import { useState } from "react";
import { CONFIG } from "../config";
import Reveal from "./Reveal";
import SplitText from "./SplitText";

function Person({ p, v }) {
  const [broken, setBroken] = useState(false); // kalau file foto belum ada, tampilkan inisial
  return (
    <Reveal v={v} className="max-w-[300px]">
      <div className="photo">
        <div>
          {p.photo && !broken ? (
            // mask reveal: foto terbuka pelan dari bawah + zoom-out, lalu parallax halus saat scroll
            <div className="mask">
              <div className="mask-in">
                <img data-px=".05" src={p.photo} alt={p.name} style={{ objectPosition: p.pos }} onError={() => setBroken(true)} />
              </div>
            </div>
          ) : (
            p.initial
          )}
        </div>
      </div>
      <h3 className="font-script text-gold2 text-[2.3rem] font-normal leading-tight [word-spacing:.18em] sm:text-[2.7rem]">{p.name}</h3>
      <p className="font-serif mt-[6px] text-[1.1rem] opacity-85">{p.bio}</p>
    </Reveal>
  );
}

export default function Couple() {
  const { azmi, gina } = CONFIG.people;
  return (
    <section className="section">
      <div className="wm" data-speed="-.1" style={{ right: "-10%", bottom: 0 }}>&amp;</div>
      <Reveal className="eyebrow">Si Dua Orang Ini</Reveal>
      <SplitText as="h2" text="Azmi & Gina" className="h2" />
      <div className="mt-[34px] flex flex-col items-center justify-center gap-[22px] sm:flex-row sm:flex-wrap sm:gap-[clamp(24px,6vw,80px)] xl:gap-[110px]">
        <Person p={azmi} v="l" />
        <Reveal v="z" d={2} className="text-rose2 text-[2.2rem] opacity-80 sm:text-[2.8rem]">♥</Reveal>
        <Person p={gina} v="r" />
      </div>
    </section>
  );
}
