import express from "express"
import isAuthenticated from "../middleware/isAuthenticated.js";
import { AiChatResponse, DeleteChatHistory, FindUserChatbots, GetChatHistory, TrainChatbot } from "../controllers/ChatbotController.js";

const router = express.Router();

router.post("/chat",isAuthenticated,AiChatResponse);
router.post("/train",isAuthenticated,TrainChatbot);
router.get("/userchatbots",isAuthenticated,FindUserChatbots);
router.get("/history/:id",isAuthenticated,GetChatHistory);
router.delete("/history/:id",isAuthenticated,DeleteChatHistory);

export default router