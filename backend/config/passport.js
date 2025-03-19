import dotenv from "dotenv";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import GoogleUserModal from "../models/googleUser.js";

dotenv.config();

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENTID,
    clientSecret: process.env.CLIENTSECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
},async(accesstoken,refreshToken,profile,done)=>{
    try {
       
        let user = await GoogleUserModal.findOne({googleId:profile.id});

        if(!user){
            user = await GoogleUserModal.create({
                googleId:profile.id,
                name:profile.displayName,
                email:profile.emails[0].value,
                profilePicture:profile.photos[0].value
            })

        }
   
        
        return done(null,user)
        
    } catch (error) {
        return done(error)
    }
}))

passport.serializeUser((user,done)=>{
    console.log("serialize user",user);
    done(null,user.id)
})

passport.deserializeUser(async(id,done)=>{
  try {
     console.log("deserialize user",id);
      let user = await GoogleUserModal.findById(id);
      console.log("user",user);
      return done(null,user)
    
  } catch (error) {
    return done(error)
    
  }
})

export default passport