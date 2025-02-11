import express from 'express';
import { createUser, getUserReferral, getUsers, referralByandTo, userLogin } from '../Controllers/user.js';
import { checkAuth } from '../Middlewares/Auth.js';
const router = express.Router();

router.post('/signup', createUser);
router.post('/login', userLogin);
router.get('/referral/:id',checkAuth,getUserReferral)
router.get('/allUser',checkAuth,getUsers)
router.get('/referrerBy/:id',checkAuth,referralByandTo)
export default router;