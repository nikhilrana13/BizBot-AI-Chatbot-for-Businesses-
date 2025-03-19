import mongoose from "mongoose";


const googleUserSchema =  mongoose.Schema({
       googleId: String,
       name: String,
       email: {type:String,required:true},
       profilePicture: String,
       createdAt: { type: Date, default: Date.now },
       updatedAt: { type: Date, default: Date.now },
})

const GoogleUserModal = mongoose.model("GoogleUser", googleUserSchema);

export default GoogleUserModal