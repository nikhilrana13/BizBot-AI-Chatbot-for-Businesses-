import React from 'react'
import { useSelector } from 'react-redux'
import Navbar from '@/components/Navbar'
import { NavLink, Outlet } from 'react-router-dom'
import { Bot, History, List } from 'lucide-react'


const DashBoard = () => {
  // const {user}= useSelector((state)=>state.user)
  // console.log("user",user)
  return (
    <div>
      <Navbar />
      <div className='dashboard w-full    mt-12 flex'>
            <div className='w-[20%] rounded-md bg-[#F5F5FB] min-h-screen border-r-2 '>
               <div className='flex flex-col gap-5 py-10 font-[500]  text-gray-600'>
                  <NavLink to="train" className={({isActive})=>`rounded-md py-3 px-2 transition-all duration-300 ${isActive ? "bg-[#EBECF6] text-black":"bg-transparent"}`}>
                    <div className='flex items-center gap-2 mx-4'>
                      <Bot />
                      <span className='hidden md:inline'>Chatbot Train</span>
                    </div>
                  </NavLink>
                  <NavLink to="test" className={({isActive})=>`rounded-md py-3 px-2 transition-all duration-300 ${isActive ? "bg-[#EBECF6] text-black":"bg-transparent"}`}>
                    <div className='flex items-center gap-2 mx-4'>
                      🤖 
                      <span className='hidden md:inline'>Test Chatbot</span>
                    </div>
                  </NavLink>
                  <NavLink to="chatbothistory" className={({isActive})=>`rounded-md py-3 px-2 transition-all duration-300 ${isActive ? "bg-[#EBECF6] text-black":"bg-transparent"}`}>
                    <div className='flex items-center gap-2 mx-4'>
                      <History />
                      <span className='hidden md:inline'>Chatbot Lists</span>
                    </div>
                  </NavLink>
                   
               </div>
            </div>
            <div className='w-[80%] min-h-screen mx-4 p-4 my-8  text-gray-600 text-base'>
              <Outlet />
            </div>

      </div>
    </div>
  )
}

export default DashBoard
