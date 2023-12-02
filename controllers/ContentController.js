import Content from "../models/Content.js";
import Book from '../models/Books.js';

export const createContent = async (req, res) => {

    const id  = req.params.id;
    const newContent = new Content({ ...req.body});
    try {
        const savedContent = await newContent.save();
        // after creating a new review now update th reviews array of the book
        await Book.findByIdAndUpdate(id, {
            $push: {contents: savedContent._id}
        })
        res.status(200).json({success: true , message: "Message submitted", data:savedContent})
    } catch (error) {
        res.status(500).json({success: false , message: error.message})
    }
}
export const getContent = async (req, res) => {
    const chapter = parseInt(req.query.chapter);
    try {
      const messages = await Content.find({chapter: chapter});
      const response = {
        error: false,
        messages,
      };
      res.status(200).json(response);
    } catch (error) {
      res.status(404).json({ success: false, message: "not found" });
    }
  };
  export const getContentBook = async(req,res)=>{
    const id  = req.params.id;
    const chapter = req.query.chapter || 1;
    try {
      const books = await Book.findById(id).populate('contents')
      const contents = books.contents
        res
          .status(200)
          .json({
            success: true,
            message: 'Successful',
            data: contents,
          });
    } catch (error) {
      res
      .status(404)
      .json({ success: false, message: error.message });
    }
  }