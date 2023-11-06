import express from 'express'

import { createReview } from '../controllers/reviewController.js';
import { verifyUser } from '../untils/VerifyToken.js';

const router = express.Router()

router.post('/:bookId', verifyUser, createReview)

export default router