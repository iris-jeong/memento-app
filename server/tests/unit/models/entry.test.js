import mongoose from 'mongoose';
import { validateEntry } from '../../../validation/entryValidation.js';

describe('Entry Model Tests', () => {
	// Valid entry
	it('should pass with valid entry data', async () => {
		const entryData = {
			userId: new mongoose.Types.ObjectId().toString(),
			content: 'Lorem ipsum.',
			date: new Date(),
			tags: [{ name: 'Realization', isPredefined: true }],
		};

		const { error } = validateEntry(entryData);
		expect(error).toBeUndefined();
	});

	// Missing userId
	it('should report an error if the userId is missing', () => {
		const entryData = {
			content: 'Lorem ipsum.',
			date: new Date(),
			tags: [{ name: 'Realization', isPredefined: true }],
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
			tags: [{ name: 'Realization', isPredefined: true }],
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
			tags: [{ name: 'Realization', isPredefined: true }],
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
			tags: [{ name: 'Realization', isPredefined: true }],
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
			tags: [{ name: 'Realization', isPredefined: true }],
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
			tags: [{ name: 'Realization', isPredefined: true }],
		};

		const { error } = validateEntry(entryData);
		expect(error).toBeDefined();
		expect(error.details[0].message).toContain('"date" must be a valid date');
	});
});
