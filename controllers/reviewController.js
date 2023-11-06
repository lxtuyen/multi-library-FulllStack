import Books from "../models/Books.js"; 
import Review from "../models/Review.js";

export const createReview = async ( req, res) => {

    const id  = req.params.bookId;
    const newReview = new Review({ ...req.body});
    try {
        const savedReview = await newReview.save();
        // after creating a new review now update th reviews array of the book
        await Books.findByIdAndUpdate(id, {
            $push: {reviews: savedReview._id}
        })
        res.status(200).json({success: true , message: "Review submitted", data:savedReview})
    } catch (error) {
        res.status(500).json({success: false , message: error.message})
    }
}
