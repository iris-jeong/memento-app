import { User } from '../models/user.js';
import { validateLogin, validateUser } from '../validators/userValidators.js';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';

// Register User
const register = asyncHandler(async (req, res) => {
	const { error } = validateUser(req.body);
	if (error)
		return res.status(400).json({ message: error.details[0].message });

	const { firstName, lastName, email, password } = req.body;

	// Check for duplicate
	const duplicate = await User.findOne({ email });
	if (duplicate) return res.status(409).json({ message: 'Duplicate email' });

	// Create and store new user
	const userObject = {
		firstName,
		lastName,
		email,
		password: await bcrypt.hash(password, 10),
	};
	await new User(userObject).save();

	res.status(201).json({ message: `New user ${email} created` });
});

// Log in user
const login = asyncHandler(async (req, res) => {
	const { error } = validateLogin(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const { email, password } = req.body;

	let user = await User.findOne({ email });
	if (!user) return res.status(400).send('Invalid email or password');

	const validPassword = await bcrypt.compare(password, user.password);
	if (!validPassword)
		return res.status(400).json({ message: 'Invalid password or email' });

	// Generate a token and send it back
	res.json({ message: 'Logged in successfully' });
});

// Log out user
const logout = asyncHandler(async (req, res) => {
	res.send('logged in user');
});

export { register, login, logout };