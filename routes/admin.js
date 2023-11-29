import express from 'express';
import { createrCarousel, getAllCarousel, createrGenre , getAllGenre, createrSlider, getAllSlider } from '../controllers/adminController.js';

const router = new express.Router();

import { verifyUser,verifyAdmin } from "../untils/VerifyToken.js"

// update New UsercreaterUser
router.post('/carousel', verifyAdmin ,createrCarousel);
// get All User
router.get('/carousel' ,getAllCarousel);
// creater Type
router.post('/genre', verifyAdmin ,createrGenre);
// get All Type
router.get('/genre' ,getAllGenre);
// creater Slider
router.post('/Slider', verifyAdmin ,createrSlider);
// get All Slider
router.get('/Slider' ,getAllSlider);

export default router