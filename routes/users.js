import express from 'express';
import { deleteUser, getAllUser, getSingleUser, updateUser } from '../controllers/usersController.js';

const router = new express.Router();

import { verifyUser,verifyAdmin } from "../untils/VerifyToken.js"

// update New UsercreaterUser
router.put('/:id', verifyUser,updateUser);
// delete User
router.delete('/:id' , verifyUser,deleteUser);
// getSingleUser
router.get('/:id' ,getSingleUser);
// get All User
router.get('/', verifyAdmin,getAllUser);

export default router