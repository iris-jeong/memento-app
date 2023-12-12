import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { User } from '../../../models/User.js';
import bcrypt from 'bcrypt';

let mongoServer;

// Setup
beforeAll(async () => {
	mongoServer = await MongoMemoryServer.create();
	const uri = mongoServer.getUri();
	await mongoose.connect(uri);
});

// Clear the collection after each test
afterEach(async () => {
	await mongoose.connection.dropDatabase();
});

// Teardown
afterAll(async () => {
	await mongoose.disconnect();
	await mongoServer.stop();
});

describe('User Model Test', () => {
	// Create and save a new user successfully
	test('should create and save a new user successfully', async () => {
		const userData = {
			firstName: 'testFirstName',
			lastName: 'testLastName',
			email: 'testEmail',
			password: 'testPassword',
		};

		const validUser = new User(userData);
		const savedUser = await validUser.save();

		expect(savedUser._id).toBeDefined();
		expect(validUser.firstName).toBe(userData.firstName);
		expect(validUser.lastName).toBe(userData.lastName);
		expect(validUser.email).toBe(userData.email);

		const isPasswordMatch = await bcrypt.compare(
			userData.password,
			savedUser.password
		);
		expect(isPasswordMatch).toBeTruthy();
	});
});
