import { UserDataType } from '../types';

const getUserData = async (): Promise<UserDataType> => {
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

export default getUserData;
