import faker from 'faker';
import Tweet from '../models/Tweet';
import User from '../models/User';

const TWEETS_TOTAL = 3;
const USERS_TOTAL = 3;

export default async () => {
	try {
		// remove all tweets for performance reasons
		await Tweet.remove();
		await User.remove();

		await Array.from({ length: USERS_TOTAL }).forEach(async (_, i) => {
			const user = await User.create({
				userName: faker.internet.userName(),
				firstName: faker.name.firstName(),
				lastName: faker.name.lastName(),
				email: faker.internet.email(),
				avatar: `https://randomuser.me/api/portraits/women/${i}.jpg`,
				password: 'pass123'
			});

			await Array.from({ length: TWEETS_TOTAL }).forEach(
				async () => await Tweet.create({ text: faker.lorem.sentence(), user: user._id })
			);
		});


	} catch (err) {
		throw err;
	}
}