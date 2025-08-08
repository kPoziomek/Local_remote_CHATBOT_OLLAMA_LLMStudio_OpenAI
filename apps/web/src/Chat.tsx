import ChatHeader from "./components/ChatHeader.tsx";
import ChatFooter from "./components/ChatFooter.tsx";
import {ChatContainer} from "./components/ChatContainer.tsx";

const App = () => {

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <div className="max-w-4xl mx-auto">
        <ChatHeader/>
        <ChatContainer />
        <ChatFooter />
      </div>
    </div>
  );
};

export default App;
