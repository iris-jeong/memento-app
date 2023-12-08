import { User } from '../models/user.js';
import asyncHandler from 'express-async-handler';

// Register User
const register = asyncHandler(async (req, res) => {
	const { firstName, lastName, email, password } = req.body;

	// Validate data
	if (!firstName || !lastName || !email || !password) {
		return res.status(400).json({ message: 'All fields are required' });
	}

	// Check for duplicate
	const duplicate = await User.findOne({ email }).lean().exec();
	if (duplicate) return res.status(409).json({ message: 'Duplicate email' });

	// Create and store new user
	const userObject = { firstName, lastName, email, password };
	const user = await new User(userObject).save();

	if (user) {
		res.status(201).json({ message: `New user for ${email} created` });
	} else {
		res.status(400).json({ message: 'Invalid user data received' });
	}
});

// Log In User
const login = asyncHandler(async (req, res) => {
	res.send('logged in user');
});

// Retrieve User By ID
const getUser = asyncHandler(async (req, res) => {
	res.send('retrieved user by id');
});

export { register, login, getUser };
