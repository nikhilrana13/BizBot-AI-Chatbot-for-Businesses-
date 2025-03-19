import mongoose from "mongoose";

const chatHistorySchema = mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    googleUserId:{type:mongoose.Schema.Types.ObjectId,ref:"GoogleUser"},
    chatbotId:{type:mongoose.Schema.Types.ObjectId,ref:"Chatbot",required:true},
    userMessage:{type:String,required:true},
    botReply:{type:String,required:true},
    timestamp:{type:Date,default:Date.now},


})

const ChatHistoryModal = mongoose.model("ChatHistory", chatHistorySchema);
export default ChatHistoryModal