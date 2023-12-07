import mongoose from 'mongoose';
import Joi from 'joi';
import JoiObjectId from 'joi-objectid';

Joi.objectId = JoiObjectId(Joi);

const entrySchema = {
	userId: { type: mongoose.Schema.Types.ObjectId, required: true },
	content: { type: String, required: true },
	date: { type: Date, required: true },
	tagIds: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }] },
};

const Entry = mongoose.model('Entry', entrySchema);

function validateEntry(entry) {
	const schema = Joi.object({
		userId: Joi.objectId().required(),
		content: Joi.string().min(1).max(300).required(),
		date: Joi.date().required(),
		tagIds: Joi.array().items(Joi.objectId()).max(3).optional(),
	});

	return schema.validate(entry);
}

export { Entry, validateEntry };
