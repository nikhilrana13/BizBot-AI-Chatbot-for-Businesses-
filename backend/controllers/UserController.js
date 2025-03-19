
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModal from "../models/User.js";


export const Signup = async(req,res)=>{
    try {
        const {name,email,password,businessname} = req.body;
        // console.log("req.body",req.body);

        const userExists = await UserModal.findOne({email});

        if(userExists){
            return res.status(400).json({message:"user already exists"});
        }
        
        const hashedPassword = await bcrypt.hash(password,10);
        const user = await UserModal.create({
            name,
            email,
            password:hashedPassword,
            businessname
        })

        await user.save();
        return res.status(200).json({message:"user created successfully",user});

        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"internal server error",error});
    }
}

export const Login = async(req,res)=>{
    try {
        const {email,password} = req.body;
        // console.log("req.body",req.body);

        // check if user exists

        let user = await UserModal.findOne({email});

        if(!user){
            return res.status(400).json({message:"user not found"});
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.status(400).json({message:"invalid email or password"});
        }

        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1d"});
        res.cookie("token",token,{httpOnly:true});

        return res.status(200).json({message:"login successful",user,token});

    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"server error",error});
        
    }
}


export const Logout = async(req,res)=>{
    try {
        res.clearCookie("token",{httpOnly:true});
        return res.status(200).json({message:"logout successful"});
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"server error",error});
    }
}