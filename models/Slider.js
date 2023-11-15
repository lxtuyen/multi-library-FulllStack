import mongoose from "mongoose"

const sliderSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            require: true,
        },
        img: {
            type: String,
            require: true,
        },
    },
    { timestamps: true}
);

export default mongoose.model("Slider", sliderSchema);