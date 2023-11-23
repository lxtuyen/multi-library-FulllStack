import Books from "../models/Books.js";
import Review from "../models/Review.js";

export const createReview = async (req, res) => {
  const id = req.params.bookId;
  const newReview = new Review();

  newReview.set("bookId", req.params.bookId);
  newReview.set("username", req.body.username);
  newReview.set("avatarUser", req.body.avatarUser);
  newReview.set("reviewText", req.body.reviewText);
  newReview.set("rating", req.body.rating);
  try {
    const savedReview = await newReview.save();
    // after creating a new review now update th reviews array of the book
    await Books.findByIdAndUpdate(id, {
      $push: { reviews: savedReview._id },
      $set: { avgRating: req.body.avgRating },
    });
    res
      .status(200)
      .json({ success: true, message: "Review submitted", data: savedReview });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
