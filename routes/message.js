import express from 'express';
import { createMessage, getMessage } from '../controllers/messageController.js';

const router = new express.Router();

import { verifyUser } from "../untils/VerifyToken.js"

router.post('/:id', verifyUser ,createMessage);
router.get('/:id', verifyUser ,getMessage);


export default router