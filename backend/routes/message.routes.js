import express from "express";
import { sendmessage } from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";
import { getMessage } from "../controllers/message.controller.js";

const router = express.Router();

router.get('/:id', protectRoute, getMessage);
router.post('/send/:id', protectRoute, sendmessage);

export default router;