import Reveal from "./Reveal";
import SplitText from "./SplitText";

export default function Hero() {
  return (
    <section className="section">
      <div className="rays" />
      <Reveal as="svg" v="z" className="rings" viewBox="0 0 100 68" aria-hidden="true">
        <circle cx="38" cy="34" r="28" />
        <circle cx="62" cy="34" r="28" />
        <polygon className="gem" points="50,4 54,9 50,14 46,9" />
      </Reveal>

      <Reveal className="eyebrow" d={1}>We're Getting Engaged</Reveal>

      <h1 className="hero-name mt-[14px]">
        <SplitText text="Azmi" grad className="block" />
        <span className="amp">&amp;</span>
        <SplitText text="Gina" grad className="block" />
      </h1>

      <Reveal className="date-pill" d={3}>30 · 01 · 2027</Reveal>
      <div className="scroll-hint">SCROLL</div>
    </section>
  );
}
