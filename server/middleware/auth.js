import jwt from 'jsonwebtoken';
import config from 'config';
import asyncHandler from 'express-async-handler';

const authMiddleware = asyncHandler(async (req, res, next) => {
	let token;

	if (!token) res.status(401).json({ message: 'Not authorized, no token' });

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		// Get token from header
		token = req.headers.authorization.split(' ')[1];

		// Verify token
		const decoded = jwt.verify(token, config.get('jwt.secret'));

		// Add user from payload
		req.user = decoded;

		next();
	}
});

export default authMiddleware;
