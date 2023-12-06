import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { User } from '../../../models/user';

describe('User Model Test', () => {
	let mongoServer;

	beforeAll(async () => {
		mongoServer = await MongoMemoryServer.create();
		const uri = mongoServer.getUri();
		await mongoose.connect(uri);
	});

	afterAll(async () => {
		await mongoose.disconnect();
		await mongoServer.stop();
	});

	// Create and save a new user
	test('should create and save a new user', async () => {
		const userData = {
			_id: new mongoose.Types.ObjectId(),
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
		expect(validUser.password).toBe(userData.password);
	});
});
