import mongoose from 'mongoose';

const tagSchema = mongoose.Schema({
	name: { type: String, required: true },
	isPredefined: { type: Boolean, required: true },
});

const Tag = mongoose.model('Tag', tagSchema);

export { Tag };
