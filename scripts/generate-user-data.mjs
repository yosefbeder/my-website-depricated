import fs from 'fs/promises';
import path from 'path';
import fetch from 'node-fetch';

const getUserData = async () => {
	const {
		name,
		html_url: githubUrl,
		avatar_url: avatarUrl,
		bio,
		twitter_username: twitterUsername,
	} = await fetch('https://api.github.com/users/yosefbeder').then(req =>
		req.json(),
	);

	return {
		name,
		githubUrl,
		avatarUrl,
		bio,
		twitterUsername,
		email: 'dryosefbeder@gmail.com',
	};
};

(async () => {
	try {
		// 1.
		const data = await getUserData();

		// 2.
		await fs.writeFile(
			path.join(process.cwd(), './public/user-data.json'),
			JSON.stringify(data),
		);
	} catch (_) {
		throw 'Something went wrong';
	}
})();
