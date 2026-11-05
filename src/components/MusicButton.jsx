export default function MusicButton({ show, playing, onToggle }) {
  return (
    <button
      type="button"
      aria-label={playing ? "Matikan musik" : "Putar musik"}
      onClick={onToggle}
      className={`music-btn ${show ? "show" : ""} ${playing ? "on" : ""}`}
    >
      <i /><i /><i /><i />
    </button>
  );
}
