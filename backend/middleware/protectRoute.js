import jwt from "jsonwebtoken";
import User from "../models/user-model.js"

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ error: "NOT AUTHORIZED" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (!decoded) {
            return res.status(401).json({ error: "NOT AUTHORIZED" });
        }
        const user = await User.findById(decoded.userid).select("-password");

        if (!user) {
            return res.status(404).json({ error: "USER NOT FOUND" });
        }
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "internal server error" });
    }
}

export default protectRoute;