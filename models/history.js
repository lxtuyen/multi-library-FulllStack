import mongoose from "mongoose";

const historySchema = new mongoose.Schema(
  {
    bookId: {
      type: mongoose.Types.ObjectId,
      ref: "Book",
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    author: {
      type: String,
      required: true,
    },
    avgRating: {
      type: Number,
    },
    language: {
      type: String,
      require: true,
  },
    photo: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("history", historySchema);
