import mongoose from 'mongoose';
import Joi from 'joi';

const tagSchema = mongoose.Schema({
	name: { type: String, required: true },
	isPredefined: { type: Boolean, required: true },
});

const Tag = mongoose.model('Tag', tagSchema);

function validateTag(tag) {
	const schema = Joi.object({
		name: Joi.string().min(1).max(20).required(),
		isPredefined: Joi.boolean().required(),
	}).strict();

	return schema.validate(tag);
}

export { Tag, validateTag };
