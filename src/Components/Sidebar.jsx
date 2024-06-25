import React from 'react';
import { format, isToday, isYesterday, subDays } from 'date-fns';
import { AiOutlineUser, AiOutlineLogout, AiOutlineMenu, AiOutlineEllipsis } from 'react-icons/ai';
import { HiMiniPencilSquare } from "react-icons/hi2";
import { LuArrowLeftCircle } from "react-icons/lu";
import { IoMdShareAlt } from "react-icons/io";
import { MdDriveFileRenameOutline, MdDelete } from "react-icons/md";
import { BsChatLeftText } from "react-icons/bs";
import { Link } from 'react-router-dom';

const Sidebar = ({ chatSessions, currentChat, setCurrentChat, startNewChat, deleteChat }) => {
  const [isOpen, setIsOpen] = React.useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
   
  const handleLogout = () => {
    auth.signOut().then(() => {
      setUser(null); // Clear the user context
    }).catch((error) => {
      console.error('Error signing out:', error);
    });
  };

  const handleAction = (action, index) => {
    switch (action) {
      case 'share':
        alert(`Share chat ${index}`);
        break;
      case 'rename':
        const newName = prompt('Enter new name:');
        if (newName) {
          alert(`Rename chat ${index} to ${newName}`);
        }
        break;
      case 'archive':
        alert(`Archive chat ${index}`);
        break;
      case 'delete':
        deleteChat(index);
        break;
      default:
        break;
    }
  };

  const renderChatSessions = () => {
    const groupedChats = chatSessions.reduce((groups, session) => {
      let timeLabel = '';

      if (isToday(new Date(session.timestamp))) {
        timeLabel = 'Today';
      } else if (isYesterday(new Date(session.timestamp))) {
        timeLabel = 'Yesterday';
      } else if (new Date(session.timestamp) >= subDays(new Date(), 7)) {
        timeLabel = 'Last 7 Days';
      } else if (new Date(session.timestamp) >= subDays(new Date(), 30)) {
        timeLabel = 'Last Month';
      } else {
        timeLabel = format(new Date(session.timestamp), 'MMM dd, yyyy');
      }

      if (!groups[timeLabel]) {
        groups[timeLabel] = [];
      }
      groups[timeLabel].push(session);

      return groups;
    }, {});

    return Object.keys(groupedChats).map((timeLabel, index) => (
      <div key={index}>
        <div className="text-sm text-[#d9d9d9] mt-4 mb-6">{timeLabel}</div>
        {groupedChats[timeLabel].map((session, sessionIndex) => {
          const firstUserMessage = session.messages.find(msg => msg.from === 'user');
          const chatTitle = firstUserMessage ? firstUserMessage.message : 'New Chat';

          return (
            <div
              key={sessionIndex}
              className={`p-2 mb-4 border-solid border-[#d9d9d9] border-[1px] cursor-pointer ${currentChat === sessionIndex ? 'bg-[#1c1c1c] rounded-lg text-[#d9d9d9]' : 'bg-[#1c1c1c] text-[#d9d9d9] rounded-lg'}`}
              onClick={() => setCurrentChat(sessionIndex)}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <BsChatLeftText className="mr-4 mt-2 text-lg" />
                  <div>
                    <div className="text-sm">{chatTitle}</div>
                  </div>
                </div>
                <div className="relative">
                  <button className="p-1 focus:outline-none" onClick={(e) => {
                    e.stopPropagation();
                    document.getElementById(`dropdown-${sessionIndex}`).classList.toggle('hidden');
                  }}>
                    <AiOutlineEllipsis className="text-lg" />
                  </button>
                  <div id={`dropdown-${sessionIndex}`} className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg hidden">
                    <div className="py-1">
                      <button className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={(e) => { e.stopPropagation(); handleAction('share', sessionIndex); }}>
                        <IoMdShareAlt className="mr-2" /> Share
                      </button>
                      <button className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={(e) => { e.stopPropagation(); handleAction('rename', sessionIndex); }}>
                        <MdDriveFileRenameOutline className="mr-2" /> Rename
                      </button>
                      <button className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={(e) => { e.stopPropagation(); handleAction('delete', sessionIndex); }}>
                        <MdDelete className="mr-2" /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    ));
  };

  return (
    <div className="flex">
      <div className={`${isOpen ? 'w-64' : 'w-16'} transition-width duration-300 bg-[#2D2D2D] text-white h-screen flex flex-col justify-between`}>
        <div className="flex justify-between items-center p-2 ">
          <button className="focus:outline-none" onClick={toggleSidebar}>
            {isOpen ? <LuArrowLeftCircle className="text-2xl" /> : <AiOutlineMenu className="text-2xl" />}
          </button>
          {isOpen && (
            <button className="ml-2 p-2 rounded flex items-center justify-center" onClick={startNewChat}>
              <HiMiniPencilSquare className="text-2xl" />
            </button>
          )}
        </div>
        <div className="flex-grow overflow-y-auto">
          <div className="p-4">
            {isOpen && renderChatSessions()}
          </div>
        </div>
        <div className="p-4">
          {isOpen && (
            <Link to="/profile">
            <button className="w-full p-2 mb-2 bg-[#1c1c1c] hover:bg-gray-600 rounded-2xl text-center flex items-center justify-center space-x-6">
              <AiOutlineUser className="mr-2 bg-[#D9D9D9] text-[#292D32] rounded-[50%] w-[40px] h-[40px] py-2" />
              <span>Profile</span>
            </button>
            </Link>
          )}
          {isOpen && (
            <Link to="/subscribe">
            <button onClick={handleLogout} className="w-full  mb-2 p-2 bg-[#1c1c1c] hover:bg-gray-600 rounded-2xl text-center flex items-center justify-center space-x-6">
              <AiOutlineLogout className="mr-2 bg-[#D9D9D9] text-[#292D32] rounded-[50%] w-[40px] h-[40px] py-2" />
              <span>Subscribe</span>
            </button>
            </Link>
          )}
          {isOpen && (
            <Link to="/login">
            <button onClick={handleLogout} className="w-full p-2 bg-[#1c1c1c] hover:bg-gray-600 rounded-2xl text-center flex items-center justify-center space-x-6">
              <AiOutlineLogout className="mr-2 bg-[#D9D9D9] text-[#292D32] rounded-[50%] w-[40px] h-[40px] py-2" />
              <span>Logout</span>
            </button>
            </Link>
          )}
        </div>
      </div>
      <div className="flex-grow p-4">
        {/* Main content goes here */}
      </div>
    </div>
  );
};

export default Sidebar;
