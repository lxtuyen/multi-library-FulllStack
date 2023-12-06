import express from 'express';
import { createrCarousel, getAllCarousel, createrGenre, deleteGenre , getAllGenre, createrSlider, getAllSlider } from '../controllers/adminController.js';

const router = new express.Router();

import { verifyUser,verifyAdmin } from "../untils/VerifyToken.js"

// update New UsercreaterUser
router.post('/carousel' ,createrCarousel);
// get All User
router.get('/carousel' ,getAllCarousel);
// creater genre
router.post('/genre' ,createrGenre);
// get All genre
router.get('/genre' ,getAllGenre);
// deleteGenre
router.delete('/genre/:id' ,deleteGenre);
// creater Slider
router.post('/Slider' ,createrSlider);
// get All Slider
router.get('/Slider' ,getAllSlider);

export default router