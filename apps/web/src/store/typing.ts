import { atom } from 'nanostores'

export const isTyping = atom<boolean>(false);


export function setTyping(typing: boolean) {
  isTyping.set(typing);
}
