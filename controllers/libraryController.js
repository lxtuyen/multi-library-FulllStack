import Book from "../models/Books.js";

export const createrBook = async(req, res) => {

  const newBook = new Book(req.body);

  try {
    const savedBook = await newBook.save();

    res
      .status(200)
      .json({
        success: true,
        message: "Successfully created",
        data: savedBook,
      });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "failed to created try again" });
  }
};
/* updateBook */
export const updateBook = async(req,res)=>{

  const id = req.params.id;
  try {
    const updateBook = await Book.findByIdAndUpdate(id, {
      $set: req.body,
    }, {new: true});

    res
      .status(200)
      .json({
        success: true,
        message: "Successfully updated",
        data: updateBook,
      });
  } catch (error) {
    res
    .status(500)
    .json({ success: false, message: "failed to update" });
  }
}
/*deleteBook */
export const deleteBook = async(req,res)=>{
  const id = req.params.id;
  try {
    const deleteBook = await Book.findByIdAndDelete(id);

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
/* getSingleBook */
export const getSingleBook = async(req,res)=>{
  const id = req.params.id;
  try {
    const book = await Book.findById(id).populate('reviews')

    res
      .status(200)
      .json({
        success: true,
        message: "Successful",
        data: book,
      });
  } catch (error) {
    res
    .status(404)
    .json({ success: false, message: "not found" });
  }
}
/* get All Book 
export const getAllBook = async(req,res)=>{
  const page = parseInt(req.query.page);

  try {
    const books = await Book.findById({}).populate('reviews').skip(page * 8).limit(8)  
    res
      .status(200)
      .json({
        success: true,
        count: books.length,
        message: "Successful",
        data: books,
      });  
  } catch (error) {
    res
    .status(404)
    .json({ success: false, message: "not found" });
  }
}
*/
export const getBookBySearch = async(req, res)=>{
  const title = new RegExp(req.query.title, "i");
  const author = new RegExp(req.query.genre, "i")

  try {
    const books = await Book.find(title).populate('reviews');
    res
      .status(200)
      .json({
        success: true,
        message: "Successful",
        data: books,
      });  
  } catch (error) {
    res
    .status(404)
    .json({ success: false, message: "not found" });
  }
}
/* get featured Book */
export const getFeaturedBook = async(req,res)=>{

  try {
    const books = await Book.find({featured: true}).populate('reviews').limit(8)  
    res
      .status(200)
      .json({
        success: true,
        count: books.length,
        message: "Successful",
        data: books,
      });  
  } catch (error) {
    res
    .status(404)
    .json({ success: false, message: "not found" });
  }
}
export const getBookCount = async(req, res)=>{
  try {
    const bookCount = await Book.estimatedDocumentCount();
    res.status(200).json({ success: true, data: bookCount});
  } catch (error) {
    res.status(500).json({ success: false, message: "failed to fetch"});
  }
}
/* get all book 2*/
export const getAllBook = async (req, res) =>{
    try {
    const page = parseInt(req.query.page) - 1 || 0;
		const limit = parseInt(req.query.limit) || 6;
		const search = req.query.search || "";
		let genre = req.query.genre ||"All";

    const genreOptions = [
			"Action",
			"Romance",
			"Fantasy",
			"Drama",
			"Crime",
      "Rock",
      "Pop",
			"Adventure",
			"Thriller",
			"Sci-fi",
			"Music",
			"Family",
		];

      genre === "All"?(genre= [...genreOptions]):(genre = req.query.genre.split(","));

      const books = await Book.find({title: {$regex:search,$options:"i"}}).populate('reviews')
      .where("genre")
			.in([...genre])
			.skip(page * limit)
			.limit(limit);

        const total = await Book.countDocuments({
          genre: {$in: [...genre]},
          title: {$regex:search, $options:"i"}
        })
        const response = {
          error: false,
          total,
          page: page + 1,
          limit,
          genres: genreOptions,
          books
        }
    res.status(200).json(response);
    } catch (error) {
      res.status(500).json({success: false, message:error.message})
    }
}
