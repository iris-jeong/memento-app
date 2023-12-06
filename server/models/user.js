import Joi from 'joi';
import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	firstName: String,
	lastName: String,
	email: String,
	password: String,
});

const User = mongoose.model('User', userSchema);

function validateUser(user) {
	const schema = Joi.object({
		firstName: Joi.string().min(2).max(50).required(),
		lastName: Joi.string().min(2).max(50).required(),
		email: Joi.string().email().required(),
		password: Joi.string().min(5).max(20).required(),
	});

	return schema.validate(user);
}

export { User, validateUser };
