import Joi from 'joi';
import mongoose from 'mongoose';
import { Tag } from '../models/Tag.js';

function validateTag(tag) {
	const schema = Joi.object({
		name: Joi.string().min(1).max(20).required(),
		isPredefined: Joi.boolean().required(),
	}).strict();

	return schema.validate(tag);
}

async function validateTagIds(tagIds) {
	// If no tagIds, return as valid since tags are optional
	if (!tagIds) {
		return { isValid: true, tagIds: [] };
	}

	// Ensure tagIds is an array
	let tagIdsArray = Array.isArray(tagIds) ? tagIds : tagIds.split(',');

	// Validate format of each tag ID
	const validTagIds = tagIdsArray.filter((tagId) =>
		mongoose.Types.ObjectId.isValid(tagId)
	);

	/// Check if tags exist in the database
	const existingTagsCount = await Tag.countDocuments({
		_id: { $in: validTagIds },
	});
	if (existingTagsCount !== validTagIds.length) {
		return { isValid: false, message: 'One or more tags not found' };
	}

	return { isValid: true, tagIds: validTagIds };
}

export { validateTag, validateTagIds };
