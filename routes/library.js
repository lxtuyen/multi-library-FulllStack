import express from 'express';
import { createrBook, deleteBook, getAllBook, getBookBySearch, getSingleBook, updateBook, getFeaturedBook, getBookCount } from '../controllers/libraryController.js';

const router = express.Router();
import { verifyAdmin } from "../untils/VerifyToken.js"
// create New book
router.post('/', verifyAdmin,createrBook);
// update New book
router.put('/:id',verifyAdmin,updateBook);
// delete book
router.delete('/:id',verifyAdmin, deleteBook);
// get Single book
router.get('/:id',getSingleBook);
// get All book
router.get('/',getAllBook);
// get book By Search 
router.get('/search/getBookBySearch',getBookBySearch);
router.get('/search/getFeaturedBook',getFeaturedBook);
router.get('/search/getBookCount',getBookCount);

export default router