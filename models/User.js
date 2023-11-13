import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    address: {
      type: String,
    },
    followed: [{
      type: mongoose.Types.ObjectId,
      ref: "followed"
  }],
    readingHistory:[{
      type: mongoose.Types.ObjectId,
      ref: "history"
  }],
    role: {
      type: String,
      default: "user",
    },
  },
  { timestamps: true }
);

userSchema.index({ title_1: 1 }, { unique: true, sparse: true });

export default mongoose.model("User", userSchema);