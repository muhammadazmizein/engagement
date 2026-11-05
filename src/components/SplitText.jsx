import { useInView } from "../hooks/useInView";

/** Teks muncul huruf per huruf. Per kata dibungkus nowrap supaya baris tetap bisa turun dengan rapi. */
export default function SplitText({ text, as: Tag = "span", grad = false, className = "" }) {
  const [ref, inView] = useInView();
  let i = 0;
  return (
    <Tag ref={ref} aria-label={text} className={`split ${grad ? "grad" : ""} ${inView ? "in" : ""} ${className}`}>
      {text.split(" ").map((word, wi, arr) => (
        <span key={wi} aria-hidden="true">
          <span className="inline-block whitespace-nowrap">
            {[...word].map((c) => (
              <span key={i} className="ch" style={{ "--i": i++ }}>
                {c}
              </span>
            ))}
          </span>
          {wi < arr.length - 1 && " "}
        </span>
      ))}
    </Tag>
  );
}
