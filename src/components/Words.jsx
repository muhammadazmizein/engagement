import { useInView } from "../hooks/useInView";

/** Paragraf muncul kata per kata. */
export default function Words({ text, className = "" }) {
  const [ref, inView] = useInView();
  return (
    <p ref={ref} aria-label={text} className={`words ${inView ? "in" : ""} ${className}`}>
      {text.split(/\s+/).map((w, i) => (
        <span key={i} aria-hidden="true">
          <span className="w" style={{ "--i": i }}>
            {w}
          </span>{" "}
        </span>
      ))}
    </p>
  );
}
