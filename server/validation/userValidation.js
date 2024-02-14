import Joi from 'joi';

function validateUser(user) {
	const schema = Joi.object({
		firstName: Joi.string().min(2).max(20).required(),
		lastName: Joi.string().min(2).max(20).required(),
		email: Joi.string().email().required(),
		password: Joi.string().min(6).required(),
	});

	return schema.validate(user);
}

function validateLogin(userData) {
	const schema = Joi.object({
		email: Joi.string().email().required(),
		password: Joi.string().required(),
	});

	return schema.validate(userData);
}

export { validateUser, validateLogin };
