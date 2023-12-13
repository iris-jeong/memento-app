import express from 'express';
import {
	addTagsToEntry,
	createEntry,
	deleteEntry,
	getAllEntries,
	getEntryById,
	removeTagFromEntry,
	updateEntry,
} from '../controllers/EntryController.js';

const router = express.Router();

router.get('/', getAllEntries); // Retrieve all entries of a logged-in user
router.post('/', createEntry); // Create a new entry
router.get('/:id', getEntryById); // Retrieve a single entry by its ID
router.put('/:id', updateEntry); // Update a specific entry
router.delete('/:id', deleteEntry); // Delete a specific entry
router.patch('/:id/tags', addTagsToEntry); // Add tags to an entry
router.patch('/:id/tags/:tagId', removeTagFromEntry); // Remove a tag from an entry
router.get('/tag/:tagId'); // Retrieve entries by tag

export default router;
