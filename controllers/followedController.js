import Followed from "../models/followed.js";
import User from "../models/User.js";
import Book from "../models/Books.js";

export const createFollow = async (req, res) => {
  const idUser = req.body.userId;
  const idBook = req.body.bookId;
  const newFollowed = new Followed({ ...req.body });
  try {
    const savedFollowed = await  newFollowed.save();
    await User.findByIdAndUpdate(idUser, {
      $push: { followed:  savedFollowed._id },
    });
    await Book.findByIdAndUpdate(idBook, {
      $push: { follower: savedFollowed._id },
    });
    res.status(200).json({
      success: true,
      message: "your book is followed",
      savedFollowed,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};
/* getSingleUser have polulate followed */
export const getFollower = async (req, res) => {
  const id = req.params.id;
  const page = parseInt(req.query.page) - 1 || 0;
  const limit = parseInt(req.query.limit) || 3;
  try {
    const user = await User.findById(id).populate("followed");
    if (!Array.prototype.skip) {
      Array.prototype.skip = function (n) {
        return this.slice(n);
      };
    }
    if (!Array.prototype.limit) {
      Array.prototype.limit = function (n) {
        return this.slice(0, n);
      };
    }
    const followed = user.followed.skip(page * limit).limit(limit);
    const total = user.followed.length;
    const response = {
      success: true,
      page: page + 1,
      limit,
      total,
      followed,
    };
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};
// alll follow
export const getAllFollow = async (req, res) => {
  try {
    const follows = await Followed.find();
    res
      .status(200)
      .json({ success: true, message: "successful", data: follows });
  } catch (error) {
    res.status(404).json({ success: false, message: "internal server error" });
  }
};
export const deleteFollow = async (req, res) => {
  const id = req.params.id;
  const idUser = req.body.userId;
  const idBook = req.body.bookId;
  try {
    const deleteBook = await Followed.findByIdAndDelete(id);
    await User.findByIdAndUpdate(
      idUser,
      { $pull: { followed: id } },
      { new: true }
    );
    await Book.findByIdAndUpdate(
      idBook,
      { $pull: { follower: id } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Successfully delete",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
