import mongoose from "mongoose";

const ChatbotSchema = mongoose.Schema({
       userId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
       googleUserId:{type:mongoose.Schema.Types.ObjectId,ref:"GoogleUser"},
       businessname:{type:String},
       faq:[{
        question:{type:String,required:true},
        answer:{type:String,required:true}
       }],
       createdAt: { type: Date, default: Date.now },
       updatedAt: { type: Date, default: Date.now },

})

const ChatbotModal = mongoose.model("Chatbot", ChatbotSchema);
export default ChatbotModal