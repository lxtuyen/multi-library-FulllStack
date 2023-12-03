import express from 'express'

import { verifyAdmin, verifyUser } from '../untils/VerifyToken.js';
import { createHistory, getHistory, getAllHistory, deleteHistory, getHistoryBook } from '../controllers/historyController.js';

const router = express.Router()

router.post('/', createHistory)
router.get('/:id', getHistory);
router.get('book/:id', getHistoryBook);
router.get('/', verifyAdmin, getAllHistory)
router.delete('/:id', deleteHistory);


export default router