import User from "../models/user-model.js";

const getUserFromSideBar = async (req, res) => {
    try {
        const loggedinId = req.user._id.toString();
        const filteredUser = await User.findOne({ _id: { $ne: loggedinId } });
        res.status(200).json(filteredUser);

    } catch (error) {
        console.log("Error in getUserFromSideBar", error);
        res.status(500).json({ error: "internal server error" });
    }
    const userId = req.user._id.toString();

}
export default getUserFromSideBar;