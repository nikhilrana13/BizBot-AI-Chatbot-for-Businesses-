import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import DashBoard from './pages/DashBoard'
import ErrorBoundary from './pages/ErrorBoundry'
import Login from './components/Login'
import SignUp from './components/SignUp'
import { Toaster } from './components/ui/sonner'
import ProtectedRoutes from './components/ProtectedRoutes'

import TestChatBot from './components/TestChatBot'
import ChatBothistory from './components/ChatBothistory'
import ChatbotTrain from './components/ChatbotTrain'

function App() {


  return (
    <>
      <ErrorBoundary>
        <div className="app px-3 sm:px-[4vw] md:px-[6vw] lg:px-[9vw] ">

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<ProtectedRoutes><DashBoard /></ProtectedRoutes>}>
                <Route path="train" element={<ChatbotTrain />} /> 
                <Route path='test' element={<TestChatBot />} />
                <Route path="chatbothistory" element={<ChatBothistory />} />


            </Route>
            <Route path="/login" element={<Login />} />
            
          </Routes>
          <Toaster />

        </div>

      </ErrorBoundary>

    </>
  )
}

export default App
