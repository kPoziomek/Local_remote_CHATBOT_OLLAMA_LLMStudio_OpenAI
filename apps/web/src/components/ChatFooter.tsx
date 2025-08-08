import {MessageSquare} from "lucide-react";

const ChatFooter = () => {
  return (

  <div className="mt-6 text-center">
    <p className="text-white/50 text-sm">
      <MessageSquare className="w-4 h-4 inline mr-1" />
      Chat with your local AI agent and remote AI
    </p>
  </div>
  );
};

export default ChatFooter;
