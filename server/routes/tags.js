import express from 'express';
import { createTag, getAllTags } from '../controllers/tagController.js';

const router = express.Router();

router.get('/', getAllTags); // Retrieve all tags
router.post('/', createTag); // Create a new tag
router.put('/:id'); // Update a specific tag
router.delete('/:id'); // Delete a specific entry

export default router;
