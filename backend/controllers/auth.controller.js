import User from "../models/user-model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateTokens.js";
export const signup = async (req, res) => {
    try {
        const { fullName, userName, password, confirmPassword, gender } = req.body;
        if (password != confirmPassword) {
            res.status(400).json({ error: "password do not match" });
        }
        const user = await User.findOne({ userName });


        const boyAvatar = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
        const girlAvatar = `https://avatar.iran.liara.run/public/girl?username=${userName}`


        //Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            userName,
            password: hashPassword,
            gender,
            profilePic: gender === "male" ? boyAvatar : girlAvatar,
        });

        if (newUser) {
            //generatecookie
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                userId: newUser.userId,
                profilePic: newUser.profilePic,
            });

        }
        else {
            res.status(501).json({ error: "invalid user data" });
        }

    } catch (error) {
        console.log(error);
        res.status(501).json({ error: "Internal server error" });
    }
}
export const login = async (req, res) => {
    try {
        const { userName, password } = req.body;
        const user = await User.findOne({ userName });
        const ispasswordcorrect = await bcrypt.compare(password, user?.password || "");

        if (!user || !ispasswordcorrect) {
            res.status(400).json({ error: "invalid user" });
        }
        generateTokenAndSetCookie(user._id, res);
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            userId: user.userId,
            profilePic: user.profilePic,
        });
    }
    catch (error) {
        console.log(error);
        res.status(501).json({ error: "Internal server error" });
    }
}
export const logout = (req, res) => {
    res.cookie("jwt", "", { maxAge: 0 });
    res.send("logout successful");
}

