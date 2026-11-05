// ====== EDIT DI SINI ======
const base = import.meta.env.BASE_URL;

export const CONFIG = {
  // Rangkaian acara — ubah jam & kegiatan sesuai rencana
  schedule: [
    { time: "07.00", title: "Tamu Hadir", desc: "Keluarga dan sahabat mulai berdatangan." },
    { time: "08.00", title: "Pembukaan", desc: "Sambutan dan doa bersama." },
    { time: "09.00", title: "Pertukaran Cincin", desc: "Momen inti: Azmi & Gina resmi bertunangan." },
    { time: "10.00", title: "Makan Bersama & Foto", desc: "Ramah tamah dan sesi foto bersama." },
  ],
  // Dress code — warna yang disarankan untuk tamu
  dressCode: {
    note: "Biar fotonya serasi, yuk pakai warna-warna lembut ini.",
    colors: [
      { name: "Cream", hex: "#f5e6d3" },
      { name: "Dusty Rose", hex: "#d98ca0" },
      { name: "Gold", hex: "#d9b46a" },
      { name: "Mauve", hex: "#8a5a78" },
    ],
  },
  eventDate: "2027-01-30T07:00:00+07:00",
  musicUrl: `${base}musik/canon.m4a`, // kalau file tidak ada, otomatis pakai melodi bawaan
  place: "Kediaman Pihak Wanita",
  addressLines: ["Taman Raya Rajeg, Blok C6/30", "RT 003, RW 005 Rajeg, Kab. Tangerang"],
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Taman+Raya+Rajeg+Blok+C6+Rajeg+Tangerang",
  calendarLocation: "Taman Raya Rajeg Blok C6/30, RT 003 RW 005 Rajeg, Kab. Tangerang",
  photos: [
    { src: `${base}foto/g1.jpg`, pos: "50% 45%" },
    { src: `${base}foto/g5.jpg`, pos: "50% 35%" },
    { src: `${base}foto/g2.jpg`, pos: "50% 40%" },
    { src: `${base}foto/g7.jpg`, pos: "50% 30%" },
    { src: `${base}foto/g3.jpg`, pos: "50% 40%" },
    { src: `${base}foto/g8.jpg`, pos: "50% 55%" },
    { src: `${base}foto/g4.jpg`, pos: "50% 20%" },
    { src: `${base}foto/g6.jpg`, pos: "50% 5%" },
    { src: `${base}foto/g9.jpg`, pos: "50% 0%" },
  ],

  // "Dulu & Sekarang" — foto lama berganti foto sekarang saat di-scroll.
  // Tukar `then` / `now` / `name` sesuai foto yang benar.
  thenNow: [
    { name: "Azmi", then: `${base}foto/g7.jpg`, thenPos: "50% 30%", now: `${base}foto/azmi.jpg`, nowPos: "50% 40%" },
    { name: "Gina", then: `${base}foto/g5.jpg`, thenPos: "50% 35%", now: `${base}foto/gina.jpg`, nowPos: "50% 50%" },
  ],
  people: {
    azmi: {
      name: "Muhammad Azmi",
      initial: "A",
      photo: `${base}foto/azmi.jpg`, // taruh fotonya di public/foto/azmi.jpg
      pos: "50% 40%", // posisi crop supaya wajah tidak terpotong
      bio: "Pendiam tapi hangat, suka bercanda di waktu yang tepat. Yang selalu bikin hari-harinya Gina terasa lebih tenang.",
    },
    gina: {
      name: "Gina",
      initial: "G",
      photo: `${base}foto/gina.jpg`, // taruh fotonya di public/foto/gina.jpg
      pos: "50% 50%",
      bio: "Senyumnya ceria dan menular, hatinya lembut. Yang selalu bikin hari-harinya Azmi terasa lebih berwarna.",
    },
  },
};
