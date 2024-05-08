import jwt from 'jsonwebtoken';
import config from 'config';
import asyncHandler from 'express-async-handler';

const authMiddleware = asyncHandler(async (req, res, next) => {
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		try {
			// Get token from header.
			const token = req.headers.authorization.split(' ')[1];

			// Verify token.
			const decoded = jwt.verify(token, config.get('jwt.secret'));

			// Add user from payload.
			req.user = decoded;
			next();
		} catch (error) {
			if (error.name === 'TokenExpiredError') {
				res.status(401).json({ message: 'Token expired' });
			}
		}
	} else {
		res.status(401).json({ message: 'Not authorized, no token' });
	}
});

export default authMiddleware;
