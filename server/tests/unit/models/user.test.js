import { User } from '../../../models/user';
import { validateUser } from '../../../validators/userValidators';

describe('User Model Validation Tests', () => {
	// Valid user
	it('should pass with valid user data', () => {
		const userData = {
			firstName: 'John',
			lastName: 'Doe',
			email: 'johndoe@example.com',
			password: 'password123',
		};

		const { error } = validateUser(userData);
		expect(error).toBeUndefined();
	});

	// Test for missing first name
	it('should report an error if first name is missing', () => {
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
	it('should report an error if first name is empty', async () => {
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

	// First name is too short
	it('should report an error if first name is too short', () => {
		const userData = {
			firstName: 'J',
			lastName: 'Doe',
			email: 'johndoe@example.com',
			password: 'password1234',
		};
		const { error } = validateUser(userData);
		expect(error).toBeDefined();
		expect(error.details[0].message).toContain(
			'"firstName" length must be at least 2 characters long'
		);
	});

	// First name is too long
	it('should report an error if first name is too long', () => {
		const userData = {
			firstName: 'John123456789123456789123456789',
			lastName: 'Doe',
			email: 'johndoe@example.com',
			password: 'password1234',
		};
		const { error } = validateUser(userData);
		expect(error).toBeDefined();
		expect(error.details[0].message).toContain(
			'"firstName" length must be less than or equal to 20 characters long'
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
	it('should report an error if lastName is empty', () => {
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

	// Last name is too short
	it('should report an error if last name is too short', () => {
		const userData = {
			firstName: 'John',
			lastName: 'D',
			email: 'johndoe@example.com',
			password: 'password1234',
		};
		const { error } = validateUser(userData);
		expect(error).toBeDefined();
		expect(error.details[0].message).toContain(
			'"lastName" length must be at least 2 characters long'
		);
	});

	// Last name is too long
	it('should report an error if last name is too long', () => {
		const userData = {
			firstName: 'John',
			lastName: 'Doe123456789123456789123456789',
			email: 'johndoe@example.com',
			password: 'password1234',
		};
		const { error } = validateUser(userData);
		expect(error).toBeDefined();
		expect(error.details[0].message).toContain(
			'"lastName" length must be less than or equal to 20 characters long'
		);
	});

	// Test for missing email
	it('should report an error if email is missing', () => {
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
	it('should report an error if email is empty', () => {
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

	// Invalid email
	it('should report an error if email is invalid', () => {
		const userData = {
			firstName: 'John',
			lastName: 'Doe',
			email: 'invalidemail',
			password: 'password123',
		};
		const { error } = validateUser(userData);
		expect(error).toBeDefined();
		expect(error.details[0].message).toContain(
			'"email" must be a valid email'
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
	it('should report an error if password is empty', () => {
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

	// Password is too short
	it('should report an error if password is too short', () => {
		const userData = {
			firstName: 'John',
			lastName: 'Doe',
			email: 'johndoe@example.com',
			password: '1234',
		};
		const { error } = validateUser(userData);
		expect(error).toBeDefined();
		expect(error.details[0].message).toContain(
			'"password" length must be at least 5 characters long'
		);
	});

	// Password is too long
	it('should report an error if password is too long', () => {
		const userData = {
			firstName: 'John',
			lastName: 'Doe',
			email: 'johndoe@example.com',
			password: '123456789123456789123456789',
		};
		const { error } = validateUser(userData);
		expect(error).toBeDefined();
		expect(error.details[0].message).toContain(
			'"password" length must be less than or equal to 20 characters long'
		);
	});
});
