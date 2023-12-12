import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Entry } from '../../../models/Entry';
import { Tag } from '../../../models/Tag';

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

describe('Entry Model Tests', () => {
	// Create and save a new entry successfully
	it('should create and save a new entry successfully', async () => {
		const entryData = {
			userId: new mongoose.Types.ObjectId().toString(),
			content: 'Lorem ipsum',
			date: new Date(),
			tagIds: [new mongoose.Types.ObjectId().toString()],
		};

		const validEntry = await new Entry(entryData);
		const savedEntry = await validEntry.save();

		expect(savedEntry._id).toBeDefined();
		expect(savedEntry.userId.toString()).toBe(entryData.userId);
		expect(savedEntry.content).toBe(entryData.content);
		expect(savedEntry.date.getTime()).toBe(entryData.date.getTime());
		expect(savedEntry.tagIds.map((id) => id.toString())).toEqual(
			entryData.tagIds
		);
	});

	// Update entry successfully
	it('should update the entry and have the changes reflected in the database', async () => {
		const entry = await new Entry({
			userId: new mongoose.Types.ObjectId().toString(),
			content: 'Lorem ipsum',
			date: new Date(),
			tagIds: [new mongoose.Types.ObjectId().toString()],
		}).save();

		// Store the original content before updating
		const originalContent = entry.content;
		entry.content = 'Updated content';

		// Save the updated entry and retrieve it to confirm
		const savedEntry = await entry.save();
		const updatedEntry = await Entry.findById(savedEntry._id);

		expect(updatedEntry.content).toBe('Updated content');
		expect(updatedEntry.content).not.toBe(originalContent);
	});

	// Delete entry successfully
	it('should remove an entry from the database', async () => {
		const entry = await new Entry({
			userId: new mongoose.Types.ObjectId().toString(),
			content: 'Lorem ipsum',
			date: new Date(),
			tagIds: [new mongoose.Types.ObjectId().toString()],
		}).save();

		const entryId = entry._id;
		await Entry.findByIdAndDelete(entryId);

		const deletedTag = await Tag.findById(entryId);
		expect(deletedTag).toBeNull();
	});
});
