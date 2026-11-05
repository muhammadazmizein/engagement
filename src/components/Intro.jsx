import Reveal from "./Reveal";
import SplitText from "./SplitText";
import Words from "./Words";

export default function Intro() {
  return (
    <section className="section">
      <div className="wm" data-speed=".12" style={{ left: "-8%", top: "10%" }}>♥</div>
      <Reveal className="eyebrow">She said yes ✦ He said yes</Reveal>
      <SplitText as="h2" text="Kami Bertunangan!" className="h2" />
      <Words
        className="lead"
        text="Satu langkah kecil menuju perjalanan yang lebih panjang. Kami ingin merayakan momen ini bersama keluarga dan sahabat terdekat. Yuk, hadir dan berbagi kebahagiaan bersama kami."
      />
      <Reveal className="divider" />
    </section>
  );
}
