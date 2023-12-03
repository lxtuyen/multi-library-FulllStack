import History from "../models/history.js";
import User from "../models/User.js";

export const createHistory = async (req, res) => {
  const userId = req.body.userId;
  const bookId = req.body.bookId;
  try {
    const check = await History.findOne({bookId: bookId, userId: userId})
    if(check){
      return res
        .status(200)
        .json({ success: true, message: "Đã đọc" });
  }else {
    // Tạo mới một History object
    const newHistory = new History({ ...req.body });
    // Lưu History
    const savedHistory = await newHistory.save();

    // Cập nhật readingHistory của User
    await User.findByIdAndUpdate(userId, {
      $push: { readingHistory: savedHistory._id },
    });

    // Trả về thành công, kèm theo dữ liệu và thông báo
    return res.status(200).json({
      success: true,
      message: "your book is followed",
      data: savedHistory,
    });
  }
   
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};
/* getSingleUser have polulate followed */
export const getHistory = async(req,res)=>{
  const id = req.params.id;
  const page = parseInt(req.query.page) - 1 || 0;
  const limit = parseInt(req.query.limit) || 6;
  try {
    const user = await User.findById(id).populate('readingHistory');
    if (!Array.prototype.skip) {
      Array.prototype.skip = function(n) {
        return this.slice(n);
      };
    }
    if (!Array.prototype.limit) {
      Array.prototype.limit = function(n) {
        return this.slice(0, n);
      };
    }
    const readingHistory = user.readingHistory.skip(page * limit).limit(limit);
    const response = {
        error: false,
        page: page + 1,
        limit,
        readingHistory,
      }
  res.status(200).json(response);
  } catch (error) {
    res
    .status(404)
    .json({ success: false, message: error.message });
  }
}
export const getHistoryBook = async(req,res)=>{
  const id = req.params.id;
  try {
    const HistoryBook = await History.find({ bookId: id })
    res
      .status(200)
      .json({
        success: true,
        message: "Successful",
        data: HistoryBook,
      });
  } catch (error) {
    res
    .status(404)
    .json({ success: false, message: "not found" });
  }
}
// alll follow
export const getAllHistory = async (req, res) => {
  try {
    const historys = await History.find();
    res
      .status(200)
      .json({ success: true, message: "successful", data: historys });
  } catch (error) {
    res.status(404).json({ success: false, message: "internal server error" });
  }
};

export const deleteHistory = async (req, res) => {
  const id = req.params.id;
  const idUser = req.body.userId;
  try {
    const deleteBook = await History.findByIdAndDelete(id);
    await User.findByIdAndUpdate(
      idUser,
      { $pull: { readingHistory: id } },
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