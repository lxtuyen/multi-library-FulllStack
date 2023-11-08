import mongoose from "mongoose";

const followedSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    bookId: {
      type: mongoose.Types.ObjectId,
      ref: "Book",
    },
    bookName: {
      type: String,
      required: true,
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

export default mongoose.model("followed", followedSchema);
