import { useEffect, useState } from "react";
import Lenis from "lenis";
import { CONFIG } from "./config";
import { OpenCtx } from "./ctx";
import { fireworks } from "./fx";
import { getLenis, setLenis } from "./scroll";
import { useMusic } from "./hooks/useMusic";
import Backdrop from "./components/Backdrop";
import ScrollFx from "./components/ScrollFx";
import Cover from "./components/Cover";
import MusicButton from "./components/MusicButton";
import Hero from "./components/Hero";
import Intro from "./components/Intro";
import Couple from "./components/Couple";
import ThenNow from "./components/ThenNow";
import Countdown from "./components/Countdown";
import EventCard from "./components/EventCard";
import Gallery from "./components/Gallery";
import Schedule from "./components/Schedule";
import Footer from "./components/Footer";

export default function App() {
  const [opened, setOpened] = useState(false);
  const music = useMusic(CONFIG.musicUrl);

  // smooth scroll (inertia) — dilewati kalau pengguna memilih "kurangi animasi"
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (matchMedia("(pointer: coarse)").matches) return; // HP/tablet: pakai scroll native yang sudah mulus
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    lenis.stop(); // dikunci sampai undangan dibuka
    setLenis(lenis);
    let id;
    const raf = (t) => {
      lenis.raf(t);
      id = requestAnimationFrame(raf);
    };
    id = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  // kunci scroll selama cover masih tampil
  useEffect(() => {
    document.body.classList.toggle("locked", !opened);
  }, [opened]);

  const handleOpened = () => {
    setOpened(true);
    scrollTo(0, 0);
    getLenis()?.start();
    getLenis()?.scrollTo(0, { immediate: true });
    fireworks(4);
  };

  return (
    <OpenCtx.Provider value={opened}>
      <Backdrop />
      <ScrollFx />
      <Cover onStart={music.start} onOpened={handleOpened} />
      <MusicButton show={opened} playing={music.playing} onToggle={music.toggle} />

      <main className="relative z-[2]">
        <Hero />
        <Intro />
        <Couple />
        <ThenNow />
        <Countdown />
        <EventCard />
        <Gallery />
        <Schedule />
        <Footer />
      </main>
    </OpenCtx.Provider>
  );
}
