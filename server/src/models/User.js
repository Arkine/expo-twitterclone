import mongoose, { Schema } from 'mongoose';
import jwt from 'jsonwebtoken'
import { hashSync, compareSync } from 'bcrypt-nodejs';

import constants from '../config/constants';

const UserSchema = new Schema({
	userName: {
		type: String,
		unique: true
	},
	firstName: String,
	lastName: String,
	avatart: String,
	password: String,
	email: String
}, {
	timestamps: true
});

UserSchema.pre('save', function(next) {
	if (this.isModified('password')) {
		this.password = this._hashPassword(this.password);
		return next();
	}

	return next();
});

UserSchema.methods = {
	_hashPassword(password) {
		return hashSync(password);
	},
	authenticateUser(password) {
		return compareSync(password, this.password)
	},
	createToken() {
		return jwt.sign(
			{
				_id: this._id,
			},
			constants.JWT_SECRET
		)
	}
}

export default mongoose.model('User', UserSchema);