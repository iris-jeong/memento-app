import mongoose from 'mongoose';

const entrySchema = {
	userId: { type: mongoose.Schema.Types.ObjectId, required: true },
	content: { type: String, required: true },
	date: { type: Date, required: true },
	tags: [{ type: mongoose.Schema.Types.Mixed }],
	// tags: { type: [tagSchema], default: [] },
};

const Entry = mongoose.model('Entry', entrySchema);

export { Entry };
