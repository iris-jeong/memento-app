import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Tag } from '../../../models/Tag.js';

let mongoServer;

// Set up
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

describe('Tag Model Tests', () => {
	// Create and save a new tag successfully
	it('should create and save a new tag successfully', async () => {
		const tagData = {
			name: 'Test Tag',
			isPredefined: false,
		};

		const validTag = new Tag(tagData);
		const savedTag = await validTag.save();

		expect(savedTag._id).toBeDefined();
		expect(savedTag.name).toBe(tagData.name);
		expect(savedTag.isPredefined).toBe(tagData.isPredefined);
	});

	// Update tag
	it('should update a tag and have the changes reflected in the database', async () => {
		const tag = await new Tag({
			name: 'Test Tag',
			isPredefined: false,
		}).save();

		// Store the original name before updating
		const originalName = tag.name;
		tag.name = 'Updated Name';

		// Save the updated tag and retrieve it to confirm update
		const savedTag = await tag.save();
		const updatedTag = await Tag.findById(savedTag._id);

		expect(updatedTag.name).toBe('Updated Name');
		expect(updatedTag.name).not.toBe(originalName);
	});

	// Delete tag
	it('should remove a tag from the database', async () => {
		const tag = await new Tag({
			name: 'Test Tag',
			isPredefined: false,
		}).save();

		const tagId = tag._id;
		await Tag.findByIdAndDelete(tagId);

		const deletedTag = await Tag.findById(tagId);
		expect(deletedTag).toBeNull();
	});
});
