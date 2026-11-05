import { CONFIG } from "../config";
import Reveal from "./Reveal";
import SplitText from "./SplitText";
import Tilt from "./Tilt";

const calendarUrl =
  "https://calendar.google.com/calendar/render?action=TEMPLATE" +
  `&text=${encodeURIComponent("Pertunangan Azmi & Gina")}` +
  "&dates=20270130T000000Z/20270130T040000Z" +
  `&location=${encodeURIComponent(CONFIG.calendarLocation)}`;

export default function EventCard() {
  return (
    <section className="section">
      <div className="wm" data-speed="-.12" style={{ right: "-5%", top: "5%" }}>♥</div>
      <Reveal className="eyebrow">Save The Date</Reveal>
      <SplitText as="h2" text="Engagement Day" className="h2" />

      <Tilt>
        <Reveal v="z" d={2} className="card">
          <div className="eyebrow">Sabtu</div>
          <h3 className="font-serif text-rose my-[10px] text-[1.7rem] font-medium sm:text-[2rem]">30 Januari 2027</h3>
          <div className="font-serif text-gold2 text-[1.25rem] sm:text-2xl">Pukul 07.00 WIB – Selesai</div>
          <div className="divider" />
          <p className="mt-2 leading-[1.8] opacity-90">
            <b className="font-medium">{CONFIG.place}</b>
            {CONFIG.addressLines.map((l) => (
              <span key={l}><br />{l}</span>
            ))}
          </p>
          <div className="mt-[14px] flex flex-wrap justify-center gap-2">
            <a className="btn-gold" href={CONFIG.mapsUrl} target="_blank" rel="noopener noreferrer">Lihat Lokasi</a>
            <a className="btn-gold ghost" href={calendarUrl} target="_blank" rel="noopener noreferrer">Simpan ke Kalender</a>
          </div>
        </Reveal>
      </Tilt>
    </section>
  );
}
