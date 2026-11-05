import { useInView } from "../hooks/useInView";

/** Membungkus elemen apa pun dengan animasi muncul saat di-scroll. v: "", "l", "r", "z" · d: 0–4 */
export default function Reveal({ as: Tag = "div", v = "", d = 0, className = "", children, ...props }) {
  const [ref, inView] = useInView();
  return (
    <Tag ref={ref} className={`rv ${v} ${d ? `d${d}` : ""} ${inView ? "in" : ""} ${className}`} {...props}>
      {children}
    </Tag>
  );
}
