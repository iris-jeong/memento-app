import mongoose from 'mongoose';
import { validateEntry } from '../../../validation/entryValidation.js';

describe('Entry Model Tests', () => {
	// Valid entry
	it('should pass with valid entry data', async () => {
		const entryData = {
			userId: new mongoose.Types.ObjectId().toString(),
			content: 'Lorem ipsum.',
			date: new Date(),
			tagIds: [new mongoose.Types.ObjectId().toString()],
		};

		const { error } = validateEntry(entryData);
		expect(error).toBeUndefined();
	});

	// Missing userId
	it('should report an error if the userId is missing', () => {
		const entryData = {
			content: 'Lorem ipsum.',
			date: new Date(),
			tagIds: [new mongoose.Types.ObjectId().toString()],
		};

		const { error } = validateEntry(entryData);
		expect(error).toBeDefined();
		expect(error.details[0].message).toContain('"userId" is required');
	});

	// Empty userId
	it('should report an error if the userId is missing', () => {
		const entryData = {
			userId: '',
			content: 'Lorem ipsum.',
			date: new Date(),
			tagIds: [new mongoose.Types.ObjectId().toString()],
		};

		const { error } = validateEntry(entryData);
		expect(error).toBeDefined();
		expect(error.details[0].message).toContain(
			'"userId" is not allowed to be empty'
		);
	});

	// Missing content
	it('should report an error if the content is missing', () => {
		const entryData = {
			userId: new mongoose.Types.ObjectId().toString(),
			date: new Date(),
			tagIds: [new mongoose.Types.ObjectId().toString()],
		};

		const { error } = validateEntry(entryData);
		expect(error).toBeDefined();
		expect(error.details[0].message).toContain('"content" is required');
	});

	// Empty content
	it('should report an error if the content is empty', () => {
		const entryData = {
			userId: new mongoose.Types.ObjectId().toString(),
			content: '',
			date: new Date(),
			tagIds: [new mongoose.Types.ObjectId().toString()],
		};

		const { error } = validateEntry(entryData);
		expect(error).toBeDefined();
		expect(error.details[0].message).toContain(
			'"content" is not allowed to be empty'
		);
	});

	// Missing date
	it('should report an error if the date is missing', () => {
		const entryData = {
			userId: new mongoose.Types.ObjectId().toString(),
			content: 'Lorem ipsum',
			tagIds: [new mongoose.Types.ObjectId().toString()],
		};

		const { error } = validateEntry(entryData);
		expect(error).toBeDefined();
		expect(error.details[0].message).toContain('"date" is required');
	});

	// Invalid date
	it('should report an error if the date is invalid', () => {
		const entryData = {
			userId: new mongoose.Types.ObjectId().toString(),
			date: 'invalid date',
			content: 'Lorem ipsum',
			tagIds: [new mongoose.Types.ObjectId().toString()],
		};

		const { error } = validateEntry(entryData);
		expect(error).toBeDefined();
		expect(error.details[0].message).toContain(
			'"date" must be a valid date'
		);
	});

	// Invalid tagIds
	it('should report an error if the tagId is invalid', () => {
		const entryData = {
			userId: new mongoose.Types.ObjectId().toString(),
			date: new Date(),
			content: 'Lorem ipsum',
			tagIds: ['invalid tagId'],
		};

		const { error } = validateEntry(entryData);
		expect(error).toBeDefined();
		expect(error.details[0].message).toContain(
			'"tagIds[0]" with value "invalid tagId" fails to match the valid mongo id pattern'
		);
	});

	// Too many tagIds
	it('should report an error if there are more than 3 tagIds', () => {
		const tag1 = new mongoose.Types.ObjectId().toString();
		const tag2 = new mongoose.Types.ObjectId().toString();
		const tag3 = new mongoose.Types.ObjectId().toString();
		const tag4 = new mongoose.Types.ObjectId().toString();

		const entryData = {
			userId: new mongoose.Types.ObjectId().toString(),
			date: new Date(),
			content: 'Lorem ipsum',
			tagIds: [tag1, tag2, tag3, tag4],
		};

		const { error } = validateEntry(entryData);
		expect(error).toBeDefined();
		expect(error.details[0].message).toContain(
			'"tagIds" must contain less than or equal to 3 items'
		);
	});
});
