import mongoose, { Schema } from 'mongoose';

const TweetSchema = new Schema({
	text: {
		type: String,
		minlength: [5, 'Text needs to be a minimum of 5 characters.'],
		maxlength: [144, 'Max characters of 144 allowed.']
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	favoriteCount: {
		type: Number,
		default: 0
	}
}, {
	timestamps: true
});

export default mongoose.model('Tweet', TweetSchema);