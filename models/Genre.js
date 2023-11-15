import mongoose from "mongoose"

const genreSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
        },
    },
    { timestamps: true}
);

export default mongoose.model("Genre", genreSchema);