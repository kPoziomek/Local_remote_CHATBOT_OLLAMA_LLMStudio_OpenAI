import {Bot, Trash2} from "lucide-react";
import {endpoints} from "../store/endpoints.ts";
import { selectedEndpoint, setSelectedEndpoint } from '../store/endpoints.ts';
import { useStore } from '@nanostores/react'
import * as React from "react";
import {setMessages} from "../store/messages.ts";


const ChatHeader =React.memo(() => {

  const $selectedEndpoint = useStore(selectedEndpoint);

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        text: "Hello! I'm your AI assistant. How can I help you today?",
        sender: 'bot',
        timestamp: new Date()
      }
    ]);
  };
  return (
    <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-6 mb-6 border border-white/20 shadow-2xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 backdrop-blur-lg">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">AI Assistant</h1>
            <p className="text-white/70">Using {endpoints.find(ep => ep.value === $selectedEndpoint)?.label}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={$selectedEndpoint}
            onChange={(e) => setSelectedEndpoint(e.target.value)}
            className="px-3 py-2 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {endpoints.map((endpoint) => (
              <option key={endpoint.value} value={endpoint.value} className="bg-gray-800">
                {endpoint.label}
              </option>
            ))}
          </select>

          <button
            onClick={clearChat}
            className="p-3 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/20 transition-all duration-300 group"
            title="Clear chat"
          >
            <Trash2 className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
});

export default ChatHeader;
