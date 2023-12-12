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

export { User };
