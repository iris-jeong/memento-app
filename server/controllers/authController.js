import { User } from '../models/User.js';
import { validateLogin, validateUser } from '../validation/userValidation.js';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from 'config';

// Register user
const register = asyncHandler(async (req, res) => {
	const { error } = validateUser(req.body);
	if (error) {
		return res.status(400).json({ message: error.details[0].message });
	}

	const { firstName, lastName, email, password } = req.body;

	// Check for duplicate
	const duplicate = await User.findOne({ email });
	if (duplicate) return res.status(409).json({ message: 'Duplicate email' });

	// Create and store new user
	const userObject = {
		firstName: firstName.trim(),
		lastName: lastName.trim(),
		email: email.trim().toLowerCase(),
		password: await bcrypt.hash(password, 10),
	};
	const savedUser = await new User(userObject).save();

	// Generate token
	const token = jwt.sign(
		{ userId: savedUser._id, email: savedUser.email },
		config.get('jwt.secret'),
		{ expiresIn: '1h' }
	);

	res
		.status(201)
		.json({
			message: `New user ${email} created`,
			token,
			user: {
				id: savedUser._id,
				firstName: savedUser.firstName,
				lastName: savedUser.lastName,
				email: savedUser.email,
			},
		});
});

// Log in user
const login = asyncHandler(async (req, res) => {
	const { error } = validateLogin(req.body);
	if (error) return res.status(400).json({ message: error.details[0].message });

	let { email, password } = req.body;
	email = email.trim().toLowerCase();

	const user = await User.findOne({ email });
	if (!user)
		return res.status(400).json({ message: 'Invalid email or password' });

	const validPassword = await bcrypt.compare(password, user.password);
	if (!validPassword) {
		return res.status(400).json({ message: 'Invalid password or email' });
	}

	// Generate JSON web token
	const token = jwt.sign(
		{ _id: user._id, email: user.email },
		config.get('jwt.secret'),
		{ expiresIn: '12h' }
	);

	res.json({
		message: 'Login successful',
		token,
	});
});

export { register, login };
