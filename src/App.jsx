import { useState } from 'react';
import Sidebar from './Components/Sidebar';
import Chat from './Components/Chat';

function App() {
  const [chatSessions, setChatSessions] = useState([]);
  const [currentChatIndex, setCurrentChatIndex] = useState(null);

  const startNewChat = () => {
    const newChat = { messages: [], timestamp: new Date() };
    setChatSessions([...chatSessions, newChat]);
    setCurrentChatIndex(chatSessions.length);
  };

  const addMessage = (message) => {
    setChatSessions(prevChats => {
      const updatedChats = prevChats.map((chat, index) =>
        index === currentChatIndex ? { ...chat, messages: [...chat.messages, message] } : chat
      );
      return updatedChats;
    });
  };

  const deleteChat = (index) => {
    setChatSessions(prevChats => {
      const updatedChats = prevChats.filter((_, i) => i !== index);
      if (updatedChats.length === 0) {
        setCurrentChatIndex(null);
      } else if (currentChatIndex >= updatedChats.length) {
        setCurrentChatIndex(updatedChats.length - 1);
      } else {
        setCurrentChatIndex(currentChatIndex);
      }
      return updatedChats;
    });
  };

  return (
    <div className="flex bg-[#D9D9D9] h-screen">
      <Sidebar
        chatSessions={chatSessions}
        currentChat={currentChatIndex}
        setCurrentChat={setCurrentChatIndex}
        startNewChat={startNewChat}
        deleteChat={deleteChat}
      />
      {currentChatIndex !== null && chatSessions[currentChatIndex] && (
        <Chat
          currentChat={chatSessions[currentChatIndex]}
          addMessage={addMessage}
        />
      )}
      {currentChatIndex === null && (
        <div className="flex-grow flex items-center justify-center">
          <span className="text-lg text-gray-700">No active chat. Start a new chat to begin!</span>
        </div>
      )}
    </div>
  );
}

export default App;
