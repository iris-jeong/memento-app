import express from 'express';

const router = express.Router();

router.post('/'); // Create a new entry
router.get('/'); // Retrieve all entries of a logged-in user
router.get('/:id'); // Retrieve a single entry by its ID
router.put('/:id'); // Update a specific entry
router.delete('/:id'); // Delete a specific entry
router.post('/:id/tags'); // Add tags to an entry
router.get('/tag/:tagId'); // Retrieve entries by tag
router.delete('/:id/tags/:tagId'); // Remove a tag from an entry

export default router;
