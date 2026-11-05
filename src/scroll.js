// Penghubung ke instance Lenis (smooth scroll) supaya komponen lain bisa mengunci scroll.
let inst = null;
export const setLenis = (l) => { inst = l; };
export const getLenis = () => inst;
export const lockScroll = () => inst?.stop();
export const unlockScroll = () => inst?.start();
