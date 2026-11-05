// Event-bus kecil supaya komponen mana pun bisa memicu efek di canvas.
export const fireworks = (n = 4) => window.dispatchEvent(new CustomEvent("fx:fireworks", { detail: n }));
export const rand = (a, b) => a + Math.random() * (b - a);
