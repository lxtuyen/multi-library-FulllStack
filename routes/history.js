import express from 'express'

import { verifyUser,verifyAdmin } from '../untils/VerifyToken.js';
import { createHistory, getHistory, getAllHistory } from '../controllers/historyController.js';

const router = express.Router()

router.post('/', verifyUser, createHistory)
router.get('/:id', getHistory);
router.get('/', verifyAdmin, getAllHistory)


export default router