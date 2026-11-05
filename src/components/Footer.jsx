import Reveal from "./Reveal";

export default function Footer() {
  return (
    <footer className="relative z-[2] px-5 pb-[110px] pt-[70px] text-center">
      <div className="divider" />
      <Reveal as="p" className="font-serif text-[1.1rem] opacity-75">
        Terima kasih sudah menjadi bagian dari cerita kami. Sampai jumpa di hari spesial!
      </Reveal>
      <Reveal d={1} className="font-script text-gold2 text-[clamp(3rem,12vw,4.4rem)] [text-shadow:0_0_40px_rgba(217,180,106,.5)]">
        Azmi &amp; Gina
      </Reveal>
      <Reveal as="p" d={2} className="font-serif mt-2 text-[1.1rem] opacity-75">#AzmiGinaEngaged</Reveal>
    </footer>
  );
}
