import {Send} from "lucide-react";
import {addMessage, setMessages} from "../store/messages.ts";
import {sendMessageToAPI} from "../utils/sendMessage.ts";
import {useStore} from "@nanostores/react";
import {selectedEndpoint} from "../store/endpoints.ts";
import {useState} from "react";
import {isTyping, setTyping} from "../store/typing.ts";

export const ChatInputs = () => {
  const [inputText, setInputText] = useState('');
  const $isTyping = useStore(isTyping);
  const setIsTyping = (typing: boolean) => {
    setTyping(typing);
  };

  const $selectedEndpoint = useStore(selectedEndpoint);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputText,
      sender: 'user' as const,
      timestamp: new Date()
    };

    const currentInput = inputText;
    addMessage(userMessage);
    setInputText('');
    setIsTyping(true);

    try {
      const responseText = await sendMessageToAPI(currentInput, $selectedEndpoint);
      const botResponse = {
        id: Date.now() + 1,
        text: responseText,
        sender: 'bot',
        timestamp: new Date()
      };
      addMessage(botResponse);
    } catch (error) {
      const errorResponse = {
        id: Date.now() + 1,
        text: 'Sorry, I encountered an error while processing your request.',
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(errorResponse);
    } finally {
      setIsTyping(false);
    }
  };
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="p-6 border-t border-white/20 backdrop-blur-lg bg-white/5">
      <div className="flex space-x-4">
        <div className="flex-1 relative">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type your message here..."
            className="w-full px-4 py-3 backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            rows={1}
            style={{ minHeight: '48px', maxHeight: '120px' }}
          />
        </div>
        <button
          onClick={handleSendMessage}
          disabled={!inputText.trim() || $isTyping}
          className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 backdrop-blur-lg border border-white/20 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 group"
        >
          <Send className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
        </button>
      </div>
    </div>
  );
};

