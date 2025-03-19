import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'
import { useRef } from 'react';
import { Send } from '@mui/icons-material';
import { useSelector } from 'react-redux';

const TestChatBot = () => {
     const [istyping,setTyping] = useState(false);
    const [chatMessages, setChatMessages] = useState([]);
    const [userMessage, setUserMessage] = useState("");
    const chatBoxRef = useRef(null);

    // function to scroll to the bottom of the chat box
    useEffect(()=>{
        chatBoxRef.current?.scrollTo(0,chatBoxRef.current.scrollHeight);
    },[chatMessages])




    const sendMessage = async () => {
        if(!userMessage.trim()) return;

        const timestamp = new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"});

        setChatMessages([...chatMessages, { user: userMessage, bot: null, timestamp }]);
        setUserMessage("");
        
         try {
            setTyping(true);
            const response = await axios.post('http://localhost:3000/chatbot/chat', { message: userMessage }, { withCredentials: true });
            setTimeout(() => {
                setChatMessages(prevMessages => {
                    const updatedMessages = [...prevMessages];

                    const cleanedResponse = response.data.aiReply.replace(/\*\*/g, "").trim();

                    updatedMessages[updatedMessages.length - 1].bot = cleanedResponse;
                    return updatedMessages;
                });
                setTyping(false);
            }, 1500);
            
         } catch (error) {
            console.error(error);
         }finally{
            setTyping(false);
         }
    };
  return (
    <div>
        <h1 className='text-2xl font-bold'>Test ChatBot</h1>
       <div className='flex justify-center '>
       <div className=" p-3 rounded-md flex flex-col gap-2 w-full border max-w-[500px] mt-4">
              <div className='flex  items-center justify-center gap-2   px-3 py-4 bg-black text-white rounded-md '>BIZBOT</div>
            <div ref={chatBoxRef} className=" p-3 h-[400px] overflow-y-auto bg-gray-50 rounded">
                  <p className='text-sm text-gray-500 text-center'>{new Date().toLocaleDateString("en-IN")}</p>
                 {chatMessages.map((msg, index) => (
                        <div key={index} className="mb-4 mt-4">
                              {/* User Message */}
                            <div className="flex flex-col items-end">
                                <div className="bg-black text-white  p-3 rounded-md shadow-md max-w-[75%]">
                                    {msg.user}
                                </div>
                                <span className="text-xs text-gray-500 mt-1">{msg.timestamp}</span>
                            </div>

                            {/* Bot Message */}
                            <div className="flex flex-col items-start mt-2">
                                {msg.bot ? (
                                    <div className="bg-[#F0F1F8] p-3 rounded-md shadow-md max-w-[75%]">
                                        {msg.bot}
                                    </div>
                                ) : (
                                    <div className="animate-pulse bg-[#F0F1F8] p-5 rounded-md shadow-md max-w-[100%] min-h-[40px]">
                                    </div>
                                )}
                                <span className="text-xs text-gray-500 mt-1">{msg.bot ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ""}</span>
                            </div>      
                        </div>
                    ))}
                     
            </div>

            <div className="flex mt-3 items-center gap-3 cursor-pointer">
                <input
                    type="text"
                    placeholder="Ask something..."
                    className="flex-1 p-3 border rounded-full focus:outline-none"
                    value={userMessage}
                    onChange={(e) => setUserMessage(e.target.value)}
                />
                <Send className='w-10 h-10 bg-hover:text-gray-600' onClick={sendMessage} />
              
            </div>
            
        </div>
       </div>
    </div>
  )
}

export default TestChatBot


