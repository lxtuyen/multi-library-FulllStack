import mongoose from "mongoose"

const bookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            require: true,
            unique: true,
        },
        author: {
            type: String,
            require: true,
        },
        genre: {
            type: [String],
            require: true,
        },
        photo: {
            type: String,
            require: true,
        },
        publishingDate: {
            type: String,
            require: true,
        },
        language: {
            type: String,
            require: true,
        },
        page: {
            type: Number,
            require: true,
        },
        previewAvailable: {
            type: String,
            require: true,
        },
        publishingCompany: {
            type: String,
            require: true,
        },
        currentlyReading: {
            type: Number,
            require: true,
        },
        haveRead: {
            type: Number,
            require: true,
        },
        people: {
            type: String,
            require: true,
        },
        versionNotes: {
            type: String,
            require: true,
        },
        Series: {
            type: String,
            require: true,
        },
        CopyrightDate: {
            type: Number,
            require: true,
        },
        publishedIn: {
            type: String,
            require: true,
        },
        places: {
            type: String,
            require: true,
        },
        desc: {
            type: String,
            require: true,
        },
        detailHead: {
            type: String,
            require: true,
        },
        detailLast: {
            type: [String],
            require: true,
        },
        avgRating: {
            type: String,
        },
        reviews: [{
            type: mongoose.Types.ObjectId,
            ref: "Review"
        }],
        follower: [{
            type: mongoose.Types.ObjectId,
            ref: "followed"
        }],
        history: [{
            type: mongoose.Types.ObjectId,
            ref: "history"
        }],
        featured: {
            type: Boolean,
            require: true,
        },
        linkOut: {
            type: [String],
            require: true,
        },
        buyThisBook: {
            type: [String],
            require: true,
        },
        checkNearbyLibraries: {
            type: [String],
            require: true,
        },
    },
    { timestamps: true}
);

export default mongoose.model("Book", bookSchema);