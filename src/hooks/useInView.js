import { useContext, useEffect, useRef, useState } from "react";
import { OpenCtx } from "../ctx";

export function useInView(threshold = 0.18) {
  const opened = useContext(OpenCtx);
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!opened || inView || !ref.current) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [opened, inView, threshold]);

  return [ref, inView];
}
