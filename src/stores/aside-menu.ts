import { atom } from 'nanostores';

export const state = atom(false);

const open = () => state.set(true);
const close = () => state.set(false);
const toggle = () => state.set(!state.get());

export { open, close, toggle };
