import express from 'express';
import { createUser, referralDetails, getUsers, userLogin, getUser} from '../Controllers/user.js';
import { checkAuth } from '../Middlewares/Auth.js';
const router = express.Router();

router.post('/signup', createUser);
router.post('/login', userLogin);
router.get('/allUser',checkAuth,getUsers)
router.get('/referralDetails/:id',checkAuth,referralDetails)
router.get('/get-info',checkAuth,getUser)
export default router;