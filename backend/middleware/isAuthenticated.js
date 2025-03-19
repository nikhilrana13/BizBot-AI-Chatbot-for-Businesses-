import jwt from "jsonwebtoken";
import GoogleUserModal from "../models/googleUser.js";
import userModel from "../models/User.js";


const isAuthenticated = async(req,res,next)=>{

    try { 
        console.log("🔍 SESSION CHECK - req.session:", req.session);
        console.log("🔍 USER CHECK - req.user:", req.user);

        //    console.log("req.cookies.token",req.cookies.token);
           const token = req.cookies.token;

        if(req.cookies.token){
            const decoded = jwt.verify(token,process.env.JWT_SECRET);
            // console.log("decoded",decoded);
            req.user = await userModel.findById(decoded.id)
            req.userType = "jwt"

        } else if(req.session.passport && req.session.passport.user){
            req.user = await GoogleUserModal.findOne({googleId:req.session.passport.user});
            console.log("req.user",req.user.googleId);
            req.userType = "google"
        } else{
            return res.status (401).json({message:"Authorization failed"});
        }
        next();
    } catch (error) {
        return res.status(401).json({message:"Authorization failed"});
        
    }
}

export default isAuthenticated