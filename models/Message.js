import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    sender: {
        type: String,
        required: true,
      },
    direction: {
        type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Message", messageSchema);