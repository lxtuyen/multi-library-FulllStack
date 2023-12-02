import mongoose from "mongoose"

const contentSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            require: true,
            unique: true,
        },
        content: {
            type: String,
            require: true,
        },
        chapter: {
            type: Number,
            require: true,
        },
    },
    { timestamps: true}
);

export default mongoose.model("Content", contentSchema);