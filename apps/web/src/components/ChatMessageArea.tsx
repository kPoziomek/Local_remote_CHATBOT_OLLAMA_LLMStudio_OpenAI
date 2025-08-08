import {Bot, User} from "lucide-react";
import {useEffect, useRef} from "react";
import {useStore} from "@nanostores/react";
import {messages} from "../store/messages.ts";
import {isTyping} from "../store/typing.ts";

export const ChatMessageArea = () => {
  const $messages = useStore(messages)
  const $isTyping = useStore(isTyping);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  };

  useEffect(() => {
    scrollToBottom();
  }, [$messages]);

  const formatTime = (timestamp: Date) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="h-96 overflow-y-auto p-6 space-y-4">
      {$messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div className={`flex space-x-3 max-w-xs lg:max-w-md ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
            {/* Avatar */}
            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-lg ${
              message.sender === 'user'
                ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                : 'bg-gradient-to-r from-purple-500 to-pink-500'
            }`}>
              {message.sender === 'user' ? (
                <User className="w-4 h-4 text-white" />
              ) : (
                <Bot className="w-4 h-4 text-white" />
              )}
            </div>

            {/* Message Bubble */}
            <div className={`backdrop-blur-lg rounded-2xl px-4 py-3 border border-white/20 ${
              message.sender === 'user'
                ? 'bg-white/20 rounded-br-md'
                : 'bg-white/10 rounded-bl-md'
            }`}>
              <p className="text-white text-sm leading-relaxed">{message.text}</p>
              <p className="text-white/50 text-xs mt-1">{formatTime(message.timestamp)}</p>
            </div>
          </div>
        </div>
      ))}

      {/* Typing Indicator */}
      {$isTyping && (
        <div className="flex justify-start">
          <div className="flex space-x-3 max-w-xs lg:max-w-md">
            <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-lg bg-gradient-to-r from-purple-500 to-pink-500">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="backdrop-blur-lg bg-white/10 rounded-2xl rounded-bl-md px-4 py-3 border border-white/20">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>

  );
};

