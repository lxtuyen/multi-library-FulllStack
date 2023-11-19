import Message from "../models/Message.js";
import User from '../models/User.js';

export const createMessage = async (req, res) => {

    const id  = req.params.userId;
    const newMessage = new Message({ ...req.body});
    try {
        const savedMessage = await newMessage.save();
        // after creating a new review now update th reviews array of the book
        await User.findByIdAndUpdate(id, {
            $push: {messages: savedMessage._id}
        })
        res.status(200).json({success: true , message: "Message submitted", data:savedMessage})
    } catch (error) {
        res.status(500).json({success: false , message: error.message})
    }
}
export const getMessage = async (req, res) => {
    const {id} = req.params.id;
  
    try {
      const messages = await Message.find({ userId: id });
      const response = {
        error: false,
        messages,
      };
      res.status(200).json(response);
    } catch (error) {
      res.status(404).json({ success: false, message: "not found" });
    }
  };