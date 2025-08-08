import { atom } from 'nanostores'

export const isTyping = atom<boolean>(false);


export function setTyping(typing: boolean) {
  console.log('Setting typing state:', typing);
  isTyping.set(typing);
}
