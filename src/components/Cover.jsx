import { useEffect, useMemo, useRef, useState } from "react";
import { rand } from "../fx";

const guestFromUrl = () => new URLSearchParams(location.search).get("to") || "Tamu Undangan";

export default function Cover({ onStart, onOpened }) {
  const [opening, setOpening] = useState(false); // amplop terbuka
  const [open, setOpen] = useState(false); // cover terangkat
  const [gone, setGone] = useState(false);
  const timers = useRef([]);
  const guest = useMemo(guestFromUrl, []);
  const stars = useMemo(
    () => Array.from({ length: 45 }, () => ({
      left: `${rand(0, 100)}%`, top: `${rand(0, 100)}%`,
      animationDelay: `${rand(0, 3)}s`, animationDuration: `${rand(2, 5)}s`, scale: rand(0.5, 1.4),
    })),
    []
  );

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const handleOpen = () => {
    if (opening) return;
    setOpening(true);
    onStart(); // dipanggil langsung dari klik supaya musik boleh diputar browser
    timers.current.push(
      setTimeout(() => { setOpen(true); onOpened(); }, 2200),
      setTimeout(() => setGone(true), 4000)
    );
  };

  if (gone) return null;

  return (
    <div className={`cover ${open ? "open" : ""}`}>
      {stars.map((s, i) => (
        <div key={i} className="star" style={{ left: s.left, top: s.top, animationDelay: s.animationDelay, animationDuration: s.animationDuration, scale: s.scale }} />
      ))}

      <div className="relative z-[2] flex flex-col items-center">
        <div className="text-gold2 animate-[fade_2s_.3s_both] text-[.68rem] uppercase tracking-[.5em] max-[360px]:tracking-[.3em]">
          The Engagement of
        </div>
        <div className="c-title">
          Azmi<em className="text-rose mx-[.15em] text-[.5em] not-italic">&amp;</em>Gina
        </div>

        <div className="env-wrap">
          <div className={`env ${opening ? "opening" : ""} max-[360px]:!h-[52vw] max-[360px]:!w-[82vw]`}>
            <div className="letter">
              <b>Azmi &amp; Gina</b>
              <span>You're Invited</span>
            </div>
            <div className="pocket" />
            <div className="flap" />
            <div className="seal">A&amp;G</div>
          </div>
        </div>

        <div className="animate-[fade_2s_1.6s_both] text-[.72rem] tracking-[.2em] opacity-80">
          Hai, kamu diundang!
          <b className="font-serif text-gold2 mt-1 block text-2xl font-medium tracking-[.05em]">{guest}</b>
        </div>

        <button className="btn-open" onClick={handleOpen} disabled={opening}>
          Buka Undangan
        </button>
      </div>
    </div>
  );
}
