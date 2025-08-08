import { atom } from 'nanostores'

export const endpoints = [
  { value: '/api/model', label: 'Model API', description: 'AI agent interactions with Ollama local' },
  { value: '/api/agent', label: 'Agent API', description: 'AI agent interactions with LM Studio local' },
  { value: '/api/ai-sdk', label: 'AI SDK', description: 'AI agent interactions with OPEN-AI' }
]

export const selectedEndpoint = atom<string>(endpoints[0].value);



export function setSelectedEndpoint(value:string) {
  selectedEndpoint.set(value);
}
