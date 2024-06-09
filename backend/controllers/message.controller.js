import Conversation from "../models/conversation.model.js"
import Message from "../models/message.model.js"
export const sendmessage = async (req, res) => {
    try {
        const message = req.body.message;
        const receiverId = req.params.id;
        const senderId = req.user._id.toString();
        let conversation = await Conversation.findOne({
            participant: { $all: [senderId, receiverId] }
        })
        if (!conversation) {
            conversation = await Conversation.create({
                participant: [senderId, receiverId],
            })
        }
        let newMessage = new Message({
            senderId,
            receiverId,
            message,
        });
        console.log(newMessage._id.toString());
        console.log(conversation);
        if (newMessage) {
            conversation.messages.push(newMessage._id.toString());
        };
        await Promise.all([conversation.save(), newMessage.save()]);
        res.status(201).json(newMessage);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "internal server error" });
    }
}

export const getMessage = async (req, res) => {
    try {
        const { id: usertochat } = req.params;
        const senderId = req.user._id.toString();
        const conversation = await Conversation.findOne({
            participant: { $all: [senderId, usertochat] },
        }).populate("messages");
        if (!conversation.messages) {
            res.status(200).json([]);
        }
        res.status(200).json(conversation.messages);
    } catch (error) {
        console.log("error in getmessage controller");
        res.status(500).json({ error: "Internal server error" });
    }
}