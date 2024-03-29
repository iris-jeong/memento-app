import express from 'express';
import {
	addTagsToEntry,
	createEntry,
	deleteEntry,
	getAllEntries,
	getEntryById,
	removeTagFromEntry,
	searchEntries,
	updateEntry,
} from '../controllers/entryController.js';

const router = express.Router();

router.get('/search', searchEntries); // Retrieve entries by date and/or tags
router.get('/', getAllEntries); // Retrieve all entries of a logged-in user
router.post('/new', createEntry); // Create a new entry
router.get('/:id', getEntryById); // Retrieve a single entry by its ID
router.put('/:id', updateEntry); // Update a specific entry
router.delete('/:id', deleteEntry); // Delete a specific entry
router.patch('/:id/tags/:tagId', removeTagFromEntry); // Remove a tag from an entry
router.patch('/:id/tags', addTagsToEntry); // Add tags to an entry

export default router;
