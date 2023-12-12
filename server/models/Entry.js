import mongoose from 'mongoose';

const entrySchema = {
	userId: { type: mongoose.Schema.Types.ObjectId, required: true },
	content: { type: String, required: true },
	date: { type: Date, required: true },
	tagIds: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }] },
};

const Entry = mongoose.model('Entry', entrySchema);

export { Entry };
