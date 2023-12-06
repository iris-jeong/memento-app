import Joi from 'joi';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = mongoose.Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
});

// Hash the password before saving it
userSchema.pre('save', async function (next) {
	if (this.isModified('password') || this.isNew) {
		const hash = await bcrypt.hash(this.password, 10);
		this.password = hash;
	}
	next();
});

const User = mongoose.model('User', userSchema);

function validateUser(user) {
	const schema = Joi.object({
		firstName: Joi.string().min(2).max(20).required(),
		lastName: Joi.string().min(2).max(20).required(),
		email: Joi.string().email().required(),
		password: Joi.string().min(5).max(20).required(),
	});

	return schema.validate(user);
}

export { User, validateUser };
