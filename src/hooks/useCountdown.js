import { useEffect, useState } from "react";

const calc = (target) => {
  const d = Math.max(0, target - Date.now());
  const p = (n) => String(n).padStart(2, "0");
  return {
    hari: String(Math.floor(d / 864e5)),
    jam: p(Math.floor((d / 36e5) % 24)),
    menit: p(Math.floor((d / 6e4) % 60)),
    detik: p(Math.floor((d / 1e3) % 60)),
  };
};

export function useCountdown(iso) {
  const target = new Date(iso).getTime();
  const [t, setT] = useState(() => calc(target));
  useEffect(() => {
    const id = setInterval(() => setT(calc(target)), 1000);
    return () => clearInterval(id);
  }, [target]);
  return t;
}
