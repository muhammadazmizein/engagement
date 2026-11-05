import { CONFIG } from "../config";
import Reveal from "./Reveal";
import SplitText from "./SplitText";

/** Satu "panggung" yang menempel (sticky) selama di-scroll: foto dulu perlahan berganti foto sekarang. */
function Stage({ item }) {
  return (
    <div data-tn className="tn">
      <div className="tn-stick">
        <div className="eyebrow">{item.name}</div>
        <div className="tn-frame">
          <img className="tn-then" src={item.then} style={{ objectPosition: item.thenPos }} alt={`${item.name} dulu`} loading="lazy" />
          <img className="tn-now" src={item.now} style={{ objectPosition: item.nowPos }} alt={`${item.name} sekarang`} loading="lazy" />
          <span className="tn-label tn-l-then">Dulu</span>
          <span className="tn-label tn-l-now">Sekarang</span>
        </div>
        <p className="font-script text-rose text-[2.2rem] leading-tight">{item.name}</p>
      </div>
    </div>
  );
}

export default function ThenNow() {
  return (
    <>
      <section className="section !min-h-0 !pb-0">
        <Reveal className="eyebrow">Tumbuh Bersama Waktu</Reveal>
        <SplitText as="h2" text="Dulu & Sekarang" className="h2" />
        <Reveal as="p" d={1} className="font-serif text-[1.1rem] opacity-80">Scroll pelan-pelan, lihat waktu berjalan.</Reveal>
      </section>
      {CONFIG.thenNow.map((item) => (
        <Stage key={item.name} item={item} />
      ))}
    </>
  );
}
