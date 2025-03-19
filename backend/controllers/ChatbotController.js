


import ChatbotModal from "../models/Chatbot.js";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ChatHistoryModal from "../models/ChatHistory.js";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const AiChatResponse = async (req, res) => {
    try {
        // console.log("user",req.user)
        let {userId,message } = req.body;
        // console.log("req.body",req.body);

         userId = req.user._id.toString() || req.user.googleUserId;     
        //  Check if chatbot exists for the user
        const chatbot = await ChatbotModal.findOne({
            $or: [{ userId }, { googleUserId: userId }]
        });

        if (!chatbot) {
            return res.status(400).json({ message: "Chatbot not found please train chatbot first" });
        }

        // Special Commands Handling
        const lowerMessage = message.toLowerCase().trim();

        if (lowerMessage.toLowerCase() === "/help") {
            return res.status(200).json({ reply: "Welcome to AI Chatbot! You can ask me anything related to our business." });
        }

        if (lowerMessage.toLowerCase() === "/reset") {
            await ChatHistoryModal.deleteMany({ userId });
            return res.status(200).json({ message: "Chat history deleted successfully!" });
        }

        // AI Prompt with Business FAQs
        const prompt = `
        Business: ${chatbot.businessname}
        FAQs: ${chatbot.faq.map(f => `${f.question}: ${f.answer}`).join("\n")}
        Customer: ${message}
        AI Reply:
        `;

        //  Send Prompt to AI Model 
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        // const result = await model.generateContent({ contents: [{ parts: [{ text: prompt }] }] });
        const response = await model.generateContent({ contents: [{ parts: [{ text: prompt }] }] });

        console.log("genAI response",response)

        if(!response.response.candidates[0].content.parts[0].text) return res.status(400).json({message:"AI response not found"});

        const aiReply = response.response.candidates?.[0].content?.parts?.[0].text || "I am sorry, I could not generate a response at this time.";
        // console.log(" AI Reply:", aiReply);
        //  Save Chat History
        await SaveChatHistory(userId, chatbot._id, message, aiReply);

        return res.status(200).json({ message: "Chatbot response", aiReply });

    } catch (error) {
        console.error("Failed to generate chatbot response:", error);
        return res.status(500).json({ message: "Internal Server Error", error });
    }
}
export const TrainChatbot = async(req,res)=>{
    try {

        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized: Please log in" });
        }
         const {faq} = req.body
        //  console.log("req.body",req.body);

        //  console.log("usertype",req.userType);
        //  console.log("user",req.user);

         const chatbotData ={
             faq

         }
         
        //  if (!businessname || !faq || !Array.isArray(faq)) {
        //     return res.status(400).json({ message: "Invalid data format" });
        // }

         if(req.userType === "jwt"){
            chatbotData.userId = req.user._id
         } else if(req.userType === "google"){
            chatbotData.googleUserId = req.user._id
         }

         const chatbot =  await ChatbotModal.create(chatbotData);
         await chatbot.save();
         return res.status(200).json({message:"chatbot trained successfully",chatbot});
        
    } catch (error) {
        return res.status(500).json({message:"Error training chatbot",error});
    }
}

export const FindUserChatbots = async(req,res)=>{
    try {
        let chatbots;

        if(req.userType === "jwt"){
            chatbots = await ChatbotModal.find({userId:req.user._id}).populate("userId","name email ");
        } else if(req.userType === "google"){
            chatbots = await ChatbotModal.find({googleUserId:req.user._id}).populate("googleUserId","name email ")
        }
        return res.status(200).json({message:"user chatbots found successfully",chatbots});
    } catch (error) {
        return res.status(500).json({message:"Error finding user chatbots",error});

    }
}

export const SaveChatHistory = async(userId,chatbotId,userMessage,botReply)=>{
    try {
   
         console.log("chatbot id",chatbotId);
        const chatHistory = await ChatHistoryModal.create({
            userId,
            chatbotId,
            userMessage,
            botReply
        })

        await chatHistory.save();
        return {message:"chat history saved successfully",chatHistory};
        
    } catch (error) {
          
        console.log("Error saving chat history:", error);
        return {message:"Error saving chat history"};
    }
}

export const GetChatHistory = async(req,res)=>{
    try {
        const {id} = req.params
        const chatHistory = await ChatHistoryModal.find({chatbotId:id}).sort({timestamp:-1}).populate("userId","name email").populate("chatbotId","businessname").limit(20);

        return res.status(200).json({message:"chat history found successfully",chatHistory});
    } catch (error) {
        return res.status(500).json({message:"Error finding chat history",error});
        
 }
}

export const DeleteChatHistory = async (req, res) => {
    try {
        const { chatbotId } = req.params;
        await ChatHistoryModal.deleteMany({ chatbotId });
        return res.status(200).json({ message: "Chat history deleted successfully!" });
    } catch (error) {
        return res.status(500).json({ message: "Error deleting chat history", error });
    }
};


