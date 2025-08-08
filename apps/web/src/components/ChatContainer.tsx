import {ChatMessageArea} from "./ChatMessageArea.tsx";
import {ChatInputs} from "./ChatInputs.tsx";

export const ChatContainer = () => {
  return (
    <div className="backdrop-blur-lg bg-white/10 rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
      <ChatMessageArea/>
      <ChatInputs/>
    </div>

  );
};

