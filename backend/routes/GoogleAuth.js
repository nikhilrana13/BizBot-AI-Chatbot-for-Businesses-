import express from "express"
import passport from "passport";

const router = express.Router();

router.get("/google",passport.authenticate("google",{scope:["profile","email"],accessType:"offline",prompt:"select_account"}));
router.get("/google/callback",passport.authenticate("google"),(req,res)=>{
console.log("google auth",req.user)
    res.redirect("http://localhost:5173/dashboard/train")
})

router.get("/logout",(req,res)=>{
    req.logout((error)=>{
        if(error) return res.status(400).json({error:"failed to logout"})

            req.session.destroy((error)=>{
                if(error) return res.status(400).json({error:"failed to destroy session"})
                    res.clearCookie("connect.sid",{httpOnly:true}).status(200).json({message:"logout successful"})
            })

    })
})

router.get("/user",(req,res)=>{
    console.log("Session Data:", req.session); // 🔍 Session debug karo
    console.log("User from Session:", req.user);
    console.log("req.user",req.user)
    req.user ? res.status(200).json(req.user) : res.status(404).json({error:"user not found"})
})

export default router


