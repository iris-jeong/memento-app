import Joi from 'joi';
import JoiObjectId from 'joi-objectid';

Joi.objectId = JoiObjectId(Joi);

function validateEntry(entry) {
	const schema = Joi.object({
		userId: Joi.objectId().required(),
		content: Joi.string().min(1).max(300).required(),
		date: Joi.date().required(),
		tagIds: Joi.array().items(Joi.objectId()).max(3).optional(),
	});

	return schema.validate(entry);
}

export { validateEntry };
