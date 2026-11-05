import { useCallback, useEffect, useRef, useState } from "react";

const PROG = [
  [220, 261.63, 329.63],
  [174.61, 220, 261.63],
  [261.63, 329.63, 392],
  [196, 246.94, 293.66],
];
const PAT = [0, 1, 2, 1, 2, 1, 0, 2];

/** Memutar file mp3; kalau gagal dimuat, otomatis pakai melodi sintetis bawaan. */
export function useMusic(url) {
  const [playing, setPlaying] = useState(false);
  const audio = useRef(null);
  const synth = useRef({ ac: null, master: null, timer: null, step: 0 });
  const useSynth = useRef(!url);
  const playingRef = useRef(false);

  const synthStart = useCallback(() => {
    const s = synth.current;
    if (!s.ac) {
      const AC = window.AudioContext || window.webkitAudioContext;
      s.ac = new AC();
      s.master = s.ac.createGain();
      s.master.gain.value = 0.55;
      const dl = s.ac.createDelay();
      const fb = s.ac.createGain();
      dl.delayTime.value = 0.42;
      fb.gain.value = 0.42;
      s.master.connect(s.ac.destination);
      s.master.connect(dl);
      dl.connect(fb);
      fb.connect(dl);
      dl.connect(s.ac.destination);
    }
    s.ac.resume();
    clearInterval(s.timer);
    const note = (f, t, d, v = 0.1) => {
      const o = s.ac.createOscillator();
      const g = s.ac.createGain();
      o.type = "sine";
      o.frequency.value = f;
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(v, t + 0.04);
      g.gain.exponentialRampToValueAtTime(0.0001, t + d);
      o.connect(g);
      g.connect(s.master);
      o.start(t);
      o.stop(t + d + 0.05);
    };
    s.timer = setInterval(() => {
      const t = s.ac.currentTime + 0.05;
      const i = s.step & 7;
      const ch = PROG[(s.step >> 3) & 3];
      note(ch[PAT[i]] * 2, t, 1.8);
      if (i === 0) note(ch[0] / 2, t, 3.4, 0.16);
      s.step++;
    }, 430);
  }, []);

  const fallback = useCallback(() => {
    if (useSynth.current) return;
    useSynth.current = true;
    if (playingRef.current) synthStart();
  }, [synthStart]);

  const start = useCallback(() => {
    try {
      if (!useSynth.current) {
        if (!audio.current) {
          const a = new Audio(url);
          a.loop = true;
          a.volume = 0.8;
          a.addEventListener("error", fallback);
          audio.current = a;
        }
        audio.current.play().catch(fallback);
      } else {
        synthStart();
      }
      playingRef.current = true;
      setPlaying(true);
    } catch {
      /* abaikan */
    }
  }, [url, fallback, synthStart]);

  const stop = useCallback(() => {
    audio.current?.pause();
    clearInterval(synth.current.timer);
    synth.current.ac?.suspend();
    playingRef.current = false;
    setPlaying(false);
  }, []);

  const toggle = useCallback(() => (playingRef.current ? stop() : start()), [start, stop]);

  useEffect(
    () => () => {
      audio.current?.pause();
      clearInterval(synth.current.timer);
    },
    []
  );

  return { playing, start, stop, toggle };
}
