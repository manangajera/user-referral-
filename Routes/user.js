import express from 'express';
import { createUser, getUserReferral, getUsers, userLogin } from '../Controllers/user.js';
import { checkAuth } from '../Middlewares/Auth.js';
const router = express.Router();

router.post('/signup', createUser);
router.post('/login', userLogin);
router.get('/referral/:id',checkAuth,getUserReferral)
router.get('/allUser',checkAuth,getUsers)
export default router;