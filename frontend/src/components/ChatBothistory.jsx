import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { useSelector } from 'react-redux';

const ChatBothistory = () => {
  const [chatbots, setChatbots] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user.user);
  const userbusineesname = user?.businessname
//   console.log("userbusineesname",userbusineesname);

  useEffect(() => {
      const fetchChatbots = async () => {
          try {
              const response = await axios.get('http://localhost:3000/chatbot/userchatbots', { withCredentials: true });
              // console.log("Chatbots:", response.data.chatbots);
              setChatbots(response.data.chatbots);
          } catch (error) {
              console.error("Error fetching chat history:", error);
          } finally {
              setTimeout(() => {
                setLoading(false);
                
              }, 1000);
          }
      };
      
      fetchChatbots();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen  p-4">
    <div className="p-5  border rounded-lg w-full max-w-lg bg-white">
        <h1 className='text-2xl font-bold text-center mb-4'>Chatbot Lists</h1>

        {loading ? (
            <div className='flex'>
                   <Loader2 className="animate-spin w-10 h-10 mx-auto" />
            </div>
            
        ) : chatbots.length === 0 ? (
            <p className="text-center text-gray-500">No Chatbots Created</p>
        ) : (
            <ul className="divide-y divide-gray-300">
                {chatbots.map((bot) => (
                    <li key={bot._id} className="p-3 flex justify-between items-center">
                        <div>
                            <h2 className="text-lg font-semibold">{userbusineesname}</h2>
                            <p className="text-gray-500 text-sm">
                                Updated: {new Date(bot.updatedAt).toLocaleDateString()} - {new Date(bot.updatedAt).toLocaleTimeString()}
                            </p>
                        </div>
                        <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-sm">Trained</span>
                    </li>
                ))}
            </ul>
        )}
    </div>
</div>
  )
}

export default ChatBothistory
