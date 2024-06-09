import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import getUserFromSideBar from "../controllers/user.contoller.js";

const router = express.Router();

router.get('/', protectRoute, getUserFromSideBar);

export default router;