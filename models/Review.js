import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    bookId: {
      type: mongoose.Types.ObjectId,
      ref: "Book",
    },
    username: {
      type: String,
      required: true,
    },
    avatarUser: {
      type: String,
    },
    reviewText: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Review", reviewSchema);