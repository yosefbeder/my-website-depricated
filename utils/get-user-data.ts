import { UserDataType } from '../types';

const getUserData = async (): Promise<UserDataType> => {
  const {
    name,
    html_url: githubUrl,
    avatar_url: avatarUrl,
    bio,
    twitter_username: twitterUsername,
  } = await fetch('https://api.github.com/users/yosefbeder', {
    headers: {
      Authorization: process.env.GITHUB_PERSONAL_ACCESS_TOKEN as string,
    },
  }).then(req => req.json());

  return {
    name,
    githubUrl,
    avatarUrl,
    bio,
    twitterUsername,
    email: 'dryosefbeder@gmail.com',
  };
};

export default getUserData;
