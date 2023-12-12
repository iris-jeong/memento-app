import { Entry } from '../models/Entry.js';
import { validateEntry } from '../validation/entryValidation.js';
import asyncHandler from 'express-async-handler';

const createEntry = asyncHandler(async (req, res) => {
	const { error } = validateEntry(req.body);
	if (error) {
		return res.status(400).json({ message: error.details[0].message });
	}

	const { userId, content, date, tagIds } = req.body;

	// Create and save new entry
	const entry = new Entry({ userId, content, date, tagIds });
	await entry.save();

	// Add location header and send response
	res.location(`/api/entries/${entry._id}`).status(201).json(entry);
});

// Retrieve all entries of a logged-in user
// Retrieve a single entry by its ID
// Update a specific entry
// Delete a specific entry
// Add tags to an entry
// Retrieve entries by tag
// Remove a tag from an entry

export { createEntry };
