import { jest } from '@jest/globals';
import { register } from '../../../controllers/authController.js';
import bcrypt from 'bcrypt';

describe('Auth Controller Tests', () => {
	// Registering with empty request
	it('should return 400 if the request body is empty', async () => {
		const req = {
			body: {
				firstName: '',
				lastName: '',
				email: '',
				password: '',
			},
		};
		const res = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
		};

		await register(req, res);

		expect(res.status).toHaveBeenCalledWith(400);
	});

	// Registering with missing request
	it('should return 400 if the request body is missing', async () => {
		const req = {
			body: {},
		};
		const res = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
		};

		bcrypt.hash = jest.fn().mockResolvedValue('hashedPassword');

		await register(req, res);

		expect(res.status).toHaveBeenCalledWith(400);
	});
});
