import express from 'express';
import {
	createTag,
	deleteTag,
	getAllTags,
	updateTag,
} from '../controllers/tagController.js';

const router = express.Router();

router.get('/', getAllTags); // Retrieve all tags
router.post('/', createTag); // Create a new tag
router.put('/:id', updateTag); // Update a specific tag
router.delete('/:id', deleteTag); // Delete a specific entry

export default router;
