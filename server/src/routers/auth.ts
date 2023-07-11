import express from 'express';
import { register, login, verifyToken } from '../controllers/auth';
import authorize from '../middleware/authorize';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/verify', authorize, verifyToken);

export default router;