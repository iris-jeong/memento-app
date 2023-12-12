import { validateTag } from '../../../validation/tagValidation.js';

describe('Tag Model Validation Tests', () => {
	// Valid tag
	it('should pass with valid tag data', () => {
		const tagData = {
			name: 'Test Tag',
			isPredefined: false,
		};
		const { error } = validateTag(tagData);

		expect(error).toBeUndefined();
	});

	// Missing name field
	it('should report an error if name is missing', () => {
		const tagData = {
			isPredefined: false,
		};
		const { error } = validateTag(tagData);

		expect(error).toBeDefined();
		expect(error.details[0].message).toContain('"name" is required');
	});

	// Empty name field
	it('should report an error if the name is empty', () => {
		const tagData = {
			name: '',
			isPredefined: false,
		};
		const { error } = validateTag(tagData);

		expect(error).toBeDefined();
		expect(error.details[0].message).toContain(
			'"name" is not allowed to be empty'
		);
	});

	// Name is too long
	it('should report an error if the name is too long', () => {
		const tagData = {
			name: '12345678912345678912345',
			isPredefined: false,
		};
		const { error } = validateTag(tagData);

		expect(error).toBeDefined();
		expect(error.details[0].message).toContain(
			'"name" length must be less than or equal to 20 characters long'
		);
	});

	// Missing isPredefined field
	it('should report an error if the isPredefined field is missing', () => {
		const tagData = {
			name: 'Test Tag',
		};
		const { error } = validateTag(tagData);

		expect(error).toBeDefined();
		expect(error.details[0].message).toContain(
			'"isPredefined" is required'
		);
	});

	// Wrong type in isPredefined field
	it('should report an error if the isPredefined field is empty', () => {
		const tagData = {
			name: 'Test Tag',
			isPredefined: 'false',
		};
		const { error } = validateTag(tagData);

		expect(error).toBeDefined();
		expect(error.details[0].message).toContain(
			'"isPredefined" must be a boolean'
		);
	});
});
