import express from 'express';
import { createUser, getUserReferral, getUsers, userLogin } from '../Controllers/user.js';
const router = express.Router();

router.post('/signup', createUser);
router.post('/login', userLogin);
router.get('/referral/:id',getUserReferral)
router.get('/allUser',getUsers)
export default router;