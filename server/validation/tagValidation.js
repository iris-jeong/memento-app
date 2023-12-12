import Joi from 'joi';

function validateTag(tag) {
	const schema = Joi.object({
		name: Joi.string().min(1).max(20).required(),
		isPredefined: Joi.boolean().required(),
	}).strict();

	return schema.validate(tag);
}

export { validateTag };
