import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "./config/passport.js";
import session from "express-session";
import UserRoute from "./routes/UserRoute.js";
import GoogleAuthRoute from "./routes/GoogleAuth.js";
import ChatRoute from "./routes/ChatRoute.js";
import MongoStore from "connect-mongo";



dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(session({
    secret: process.env.SECRETKEY,
    resave: false,
    saveUninitialized: false,
    store:MongoStore.create({
        mongoUrl:process.env.MONGO_URL,
        collectionName:"sessions",
    }),
    cookie:{
        httpOnly:true,
    }
    }))

app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes //
app.use("/user",UserRoute)
app.use("/auth",GoogleAuthRoute)
app.use("/chatbot",ChatRoute);

app.use((req, res, next) => {
    console.log("🔍 Middleware - req.session:", req.session);
    console.log("🔍 Middleware - req.user:", req.user);
    next();
});

// connect to database 
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("connected to database")
}).catch((error)=>{
    console.log("failed to connect",error)
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})