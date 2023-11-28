import express from 'express';
import { register, login, adminRegister, googleLogin } from '../controllers/authController.js';
import { verifyAdmin } from '../untils/VerifyToken.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/admin/register', verifyAdmin, adminRegister);
router.post('/googleLogin', googleLogin);
export default router