import express from 'express';
import { register, login, getUser } from '../controllers/UserController.js';

const router = express.Router();

// New user registration
router.post('/register', register);

// User login
router.post('/login', login);

// Retrieve user by ID
router.get('/:id', getUser);

export default router;
