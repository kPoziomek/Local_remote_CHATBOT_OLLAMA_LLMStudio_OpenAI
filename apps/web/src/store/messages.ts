import { atom } from 'nanostores'

export const messages = atom<{
  id:number,
  text: string,
  sender: string,
  timestamp: Date
}[]>([{
  id: 1,
  text: "Hello! I'm your AI assistant. How can I help you today?",
  sender: 'assistant',
  timestamp: new Date()
}])


export function setMessages(newMessages: {
  id:number,
  text: string,
  sender: 'user' | 'bot' | 'assistant',
  timestamp: Date
}[]) {
  messages.set(newMessages);
}

export function addMessage(newMessage: {
  id:number,
  text: string,
  sender: 'user' | 'bot' | 'assistant',
  timestamp: Date
}) {
  messages.set([...messages.get(), newMessage]);
}
