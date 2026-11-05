import { useState } from "react";
import { CONFIG } from "../config";
import Lightbox from "./Lightbox";
import Reveal from "./Reveal";
import SplitText from "./SplitText";

function Track({ offset, reverse, onOpen }) {
  const { photos } = CONFIG;
  const half = Array.from({ length: photos.length }, (_, i) => {
    const idx = (i + offset) % photos.length;
    return { ...photos[idx], idx };
  });
  const items = [...half, ...half]; // digandakan untuk loop mulus (-50%)
  return (
    <div className={`track ${reverse ? "rev" : ""}`}>
      {items.map((p, i) => (
        <button type="button" className="t" key={i} onClick={() => onOpen(p.idx)} aria-label="Lihat foto lebih besar">
          <img src={p.src} style={{ objectPosition: p.pos }} alt="Foto Azmi & Gina" loading="lazy" draggable="false" />
        </button>
      ))}
    </div>
  );
}

export default function Gallery() {
  const [open, setOpen] = useState(null);
  return (
    <section className="section">
      <Reveal className="eyebrow">Galeri</Reveal>
      <SplitText as="h2" text="Momen Kami" className="h2" />
      <Reveal d={1} className="marq">
        <Track offset={0} onOpen={setOpen} />
        <Track offset={Math.floor(CONFIG.photos.length / 2)} reverse onOpen={setOpen} />
      </Reveal>
      <Reveal as="p" d={2} className="font-serif mt-2 text-[1rem] opacity-60">Ketuk foto untuk memperbesar</Reveal>
      {open !== null && <Lightbox index={open} onChange={setOpen} onClose={() => setOpen(null)} />}
    </section>
  );
}
