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
  export const getContentBook = async(req,res)=>{
    const id  = req.params.id;
    try {
      const books = await Book.findById(id).populate('contents')
      const chapter = books.contents
        res
          .status(200)
          .json({
            success: true,
            message: 'Successful',
            data: chapter,
          });
    } catch (error) {
      res
      .status(404)
      .json({ success: false, message: error.message });
    }
  }
  export const getContent = async(req,res)=>{
    const id  = req.params.id;
    try {
      const contents = await Content.findById(id)
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
  export const updateContent = async(req,res)=>{

    const id = req.params.id;
    try {
      const updateContent = await Content.findByIdAndUpdate(id, {
        $set: req.body,
      }, {new: true});
  
      res
        .status(200)
        .json({
          success: true,
          message: "Successfully updated",
          data: updateContent,
        });
    } catch (error) {
      res
      .status(500)
      .json({ success: false, message: "failed to update" });
    }
  }
  export const deleteContent = async(req,res)=>{
    const id = req.params.id;
    try {
      const deleteContent = await Content.findByIdAndDelete(id);
  
      res
        .status(200)
        .json({
          success: true,
          message: "Successfully delete",
        });
    } catch (error) {
      res
      .status(500)
      .json({ success: false, message: "failed to delete" });
    }
  }