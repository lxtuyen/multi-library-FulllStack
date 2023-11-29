import express from 'express'

import { verifyUser,verifyAdmin } from '../untils/VerifyToken.js';
import { createFollow, getFollower, deleteFollow, getAllFollow } from '../controllers/followedController.js';

const router = express.Router()

router.post('/', verifyUser, createFollow)
router.get('/:id', getFollower);
router.delete('/:id', verifyUser, deleteFollow);
router.get('/', verifyAdmin, getAllFollow)


export default router