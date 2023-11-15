import mongoose from "mongoose"

const carouselSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            require: true,
            unique: true,
        },
        image: {
            type: String,
            require: true,
        },
        text: {
            type: [String],
            require: true,
        },
    },
    { timestamps: true}
);

export default mongoose.model("Carousel", carouselSchema);