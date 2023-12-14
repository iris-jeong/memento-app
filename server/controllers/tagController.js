import asyncHandler from 'express-async-handler';
import { Tag } from '../models/Tag.js';
import { validateTag } from '../validation/tagValidation.js';

const createTag = asyncHandler(async (req, res) => {
	const { error } = validateTag(req.body);
	if (error) {
		return res.status(400).json({
			error: 'Invalid tag data',
			message: error.details[0].message,
		});
	}

	const { name, isPredefined } = req.body;

	const tag = new Tag({ name, isPredefined });
	await tag.save();

	res.status(201).json({ success: true, tag });
});

const getAllTags = asyncHandler(async (req, res) => {
	const tags = await Tag.find();
	res.status(200).json(tags);
});

export { createTag, getAllTags };
