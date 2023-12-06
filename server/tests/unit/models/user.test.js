import { User, validateUser } from '../../../models/user';

describe('User Model Validation Tests', () => {
	// Test for missing first name
	it('should report an error if firstName is missing', () => {
		const user = new User({
			lastName: 'Doe',
			email: 'johndoe@example.com',
			password: 'password123',
		});
		const { error } = validateUser(user);
		expect(error).toBeDefined();
		expect(error.details[0].message).toContain('"firstName" is required');
	});

	// Test for empty first name
	it('should report an error if firstName is missing', async () => {
		const user = new User({
			firstName: '',
			lastName: 'Doe',
			email: 'johndoe@example.com',
			password: 'password123',
		});
		const { error } = validateUser(user);
		expect(error).toBeDefined();
		expect(error.details).toBeDefined();
		expect(error.details[0].message).toContain(
			'"firstName" is not allowed to be empty'
		);
	});

	// Test for missing last name
	it('should report an error if lastName is missing', () => {
		const user = new User({
			firstName: 'John',
			email: 'johndoe@example.com',
			password: 'password123',
		});

		const { error } = validateUser(user);
		expect(error).toBeDefined();
		expect(error.details[0].message).toContain('"lastName" is required');
	});

	// Test for empty last name
	it('should report an error if lastName is missing', () => {
		const userData = {
			firstName: 'John',
			lastName: '',
			email: 'johndoe@example.com',
			password: 'password123',
		};
		const { error } = validateUser(userData);
		expect(error).toBeDefined();
		expect(error.details[0].message).toContain(
			'"lastName" is not allowed to be empty'
		);
	});

	// Test for missing email
	it('should report an error if lastName is missing', () => {
		const user = new User({
			firstName: 'John',
			lastName: 'Doe',
			password: 'password123',
		});

		const { error } = validateUser(user);
		expect(error).toBeDefined();
		expect(error.details[0].message).toContain('"email" is required');
	});

	// Test for empty email
	it('should report an error if lastName is missing', () => {
		const userData = {
			firstName: 'John',
			lastName: 'Doe',
			email: '',
			password: 'password123',
		};
		const { error } = validateUser(userData);
		expect(error).toBeDefined();
		expect(error.details[0].message).toContain(
			'"email" is not allowed to be empty'
		);
	});

	// Test for missing password
	it('should report an error if password is missing', () => {
		const user = new User({
			firstName: 'John',
			lastName: 'Doe',
			email: 'johndoe@example.com',
		});

		const { error } = validateUser(user);
		expect(error).toBeDefined();
		expect(error.details[0].message).toContain('"password" is required');
	});

	// Test for empty password
	it('should report an error if password is missing', () => {
		const userData = {
			firstName: 'John',
			lastName: 'Doe',
			email: 'johndoe@example.com',
			password: '',
		};
		const { error } = validateUser(userData);
		expect(error).toBeDefined();
		expect(error.details[0].message).toContain(
			'"password" is not allowed to be empty'
		);
	});

	//password and hashing
});
