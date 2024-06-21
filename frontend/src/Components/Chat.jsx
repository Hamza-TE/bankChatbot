import { useState } from 'react';
import { AiOutlineUser, AiOutlineRobot } from 'react-icons/ai';
import { BsArrowUpRightSquare } from "react-icons/bs";
import { getChatResponse } from '../services/chatService';

const Chat = ({ currentChat, addMessage }) => {
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (input.trim()) {
      console.log('-------------------inside handleSend');
      const userMessage = { message: input, timestamp: new Date(), from: 'user' };
      addMessage(userMessage);
      setInput('');
      console.log('-------------------userMessage:', userMessage);
      const response = await getChatResponse(userMessage);
      console.log('-------------------Response:', response);

      setTimeout(() => {
        const botMessage = { message: response.response, timestamp: new Date(), from: 'bot' };
        addMessage(botMessage);
      }, 500);
    }
  };

  return (
    <div className="flex flex-col p-[50px] h-screen w-full">
      <div className="flex-grow p-4 overflow-y-auto">
        {currentChat.messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.from === 'user' ? 'justify-start' : 'justify-end'} mb-4`}>
            {msg.from === 'user' && (
              <AiOutlineUser className="text-4xl mr-4 mt-2 bg-[#2d2d2d] text-white rounded-[50%] p-2" />
            )}
            <div className={`p-3 rounded-lg ${msg.from === 'user' ? 'bg-[#ECECEC] px-4 rounded-xl text-[#2d2d2d]' : 'bg-[#2d2d2d] rounded-xl text-white'}`}>
              {msg.message}
            </div>
            {msg.from === 'bot' && (
              <AiOutlineRobot className="text-4xl ml-4 mt-2 bg-[#2d2d2d] text-white rounded-[50%] p-2" />
            )}
          </div>
        ))}
      </div>
      <div className="w-full flex mb-8 mt-4 p-4">
        <input
          className="flex-grow text-[#424242] py-3 px-4 border border-gray-300 rounded-l-lg"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type Your Prompt Here..."
        />
        <button
          className="bg-[#424242] px-2 text-white rounded-r-lg"
          onClick={handleSend}
        >
          <BsArrowUpRightSquare className='text-3xl' />
        </button>
      </div>
    </div>
  );
};

export default Chat;
