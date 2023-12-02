import express from 'express'

import { createContent, getContentBook } from '../controllers/ContentController.js';

const router = express.Router()

router.post('/:id', createContent)
router.get('/:id', getContentBook);



export default router