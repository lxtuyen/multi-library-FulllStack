import express from 'express'

import { createContent, getContent, updateContent, deleteContent, getContentBook } from '../controllers/ContentController.js';

const router = express.Router()

router.post('/:id', createContent);
router.get('/:id', getContentBook);
router.get('/getContent/:id', getContent);
router.put('/updateContent/:id', updateContent);
router.delete('/:id' , deleteContent);

export default router