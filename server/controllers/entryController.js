import { Entry } from '../models/Entry.js';
import { validateEntry } from '../validation/entryValidation.js';
import { validateDate } from '../validation/dateValidation.js';
import { validateTagIds } from '../validation/tagValidation.js';
import asyncHandler from 'express-async-handler';

const createEntry = asyncHandler(async (req, res) => {
	console.log(req.body);
	const { error } = validateEntry(req.body);
	if (error) {
		return res.status(400).json({
			error: 'Invalid entry data',
			message: error.details[0].message,
		});
	}

	const { content, date, tagIds, userId } = req.body;

	// Validate the tag IDs
	const validation = await validateTagIds(tagIds);
	if (!validation.isValid) {
		return res
			.status(400)
			.json({ error: 'Invalid tag IDs', message: validation.message });
	}

	// Create and save new entry
	const entry = new Entry({ userId, content, date, tagIds });
	await entry.save();

	// Add location header and send response
	const location = `/api/entries/${entry._id}`;
	res.location(location).status(201).json({ success: true, location, entry });
});

// Retrieve all entries of a logged-in user
const getAllEntries = asyncHandler(async (req, res) => {
	const entries = await Entry.find({ userId: req.user._id }).sort({
		date: -1,
	});

	res.status(200).json(entries);
});

// Retrieve a single entry by its ID
const getEntryById = asyncHandler(async (req, res) => {
	const entry = await Entry.findOne({
		_id: req.params.id,
		userId: req.user._id,
	});

	if (!entry) {
		return res.status(404).json({ message: 'Entry not found' });
	}
	res.status(200).json(entry);
});

// Update a specific entry
const updateEntry = asyncHandler(async (req, res) => {
	const entry = await Entry.findOneAndUpdate(
		{ _id: req.params.id, userId: req.user._id },
		req.body,
		{ new: true }
	);

	if (!entry) {
		return res.status(404).json({ message: 'Entry not found' });
	}
	res.status(200).json(entry);
});

// Delete a specific entry
const deleteEntry = asyncHandler(async (req, res) => {
	const entry = await Entry.findOneAndDelete({
		_id: req.params.id,
		userId: req.user._id,
	});

	if (!entry) {
		return res.status(404).json({ message: 'Entry not found' });
	}
	res.status(204).send();
});

// Add tags to an entry
const addTagsToEntry = asyncHandler(async (req, res) => {
	const { tagIds } = req.body;

	const validation = await validateTagIds(tagIds);
	if (!validation.isValid) {
		return res.status(400).json({ message: validation.message });
	}

	const entry = await Entry.findByIdAndUpdate(
		req.params.id,
		{ $addToSet: { tagIds: { $each: tagIds } } },
		{ new: true }
	);

	if (!entry) {
		return res.status(404).json({ message: 'Entry not found' });
	}
	res.json(entry);
});

// Remove a tag from an entry
const removeTagFromEntry = asyncHandler(async (req, res) => {
	const { tagIds } = req.body;

	const validation = await validateTagIds(tagIds);
	if (!validation.isValid) {
		return res
			.status(400)
			.json({ error: 'Invalid tags', message: validation.message });
	}

	const entry = await Entry.findByIdAndUpdate(
		req.params.id,
		{ $pull: { tagIds: { $in: tagIds } } },
		{ new: true }
	);

	if (!entry) {
		return res.status(404).json({ message: 'Entry not found' });
	}
	res.json(entry);
});

// Retrieve entries by date and/or tags
const searchEntries = asyncHandler(async (req, res) => {
	const { year, month, day, tags } = req.query;

	// Year, month, day validation
	if (!year) {
		return res.status(400).json({ message: 'Year is required' });
	}
	const dateError = validateDate(year, month, day);
	if (dateError) {
		return res.status(400).json({ message: dateError });
	}

	let query = { user: req.userId };

	// Construct a date query if any date components are provided
	if (year || month || day) {
		let startDate = new Date(year, month ? month - 1 : 0, day || 1);
		let endDate = new Date(year, month ? month : 12, day ? day : 31);

		query.date = {
			$gte: startDate,
			$lte: endDate,
		};
	}

	// Validate and add tags to query if provided
	if (tags) {
		const validation = await validateTagIds(tags);
		if (!validation.isValid) {
			return res
				.status(400)
				.json({ error: 'Invalid tags', message: validation.message });
		}
		query.tagIds = { $all: validation.tagIds };
	}

	// Execute query
	const entries = await Entry.find(query);
	res.status(200).json(entries);
});

export {
	createEntry,
	getAllEntries,
	getEntryById,
	updateEntry,
	deleteEntry,
	addTagsToEntry,
	removeTagFromEntry,
	searchEntries,
};
