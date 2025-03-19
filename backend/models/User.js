import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {type:String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    businessname: {type: String, required: true},
    plan:{type:String,enum:["free","premium"],default:"free"},
})

const userModel = mongoose.model("User", userSchema);
export default userModel

