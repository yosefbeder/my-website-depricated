import React from 'react';
import classes from '../styles/Sidebar.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';
import {
  FaGithub as GithubIcon,
  FaTwitter as TwitterIcon,
  FaEnvelope as MailIcon,
} from 'react-icons/fa';
import useSWR from 'swr/immutable';

const routes = [
  { href: '/', name: 'Home' },
  { href: '/articles', name: 'Articles' },
];

interface UserDataType {
  avatarUrl: string;
  name: string;
  bio: string;
  email: string;
  githubUrl: string;
  twitterUsername: string;
}

const fetcher = async (url: string) => {
  const {
    name,
    html_url: githubUrl,
    avatar_url: avatarUrl,
    bio,
    twitter_username: twitterUsername,
  } = await fetch(url).then(req => req.json());

  return {
    name,
    githubUrl,
    avatarUrl,
    bio,
    twitterUsername,
    email: 'dryosefbeder@gmail.com',
  } as UserDataType;
};

const Sidebar = () => {
  const { route } = useRouter();

  const { data } = useSWR<UserDataType>(
    'https://api.github.com/users/yosefbeder',
    fetcher,
  );

  if (!data) return <div></div>;

  const { name, bio, avatarUrl, twitterUsername, email, githubUrl } = data;

  return (
    <aside className={classes.container}>
      <section className={classes['personal-info']}>
        <Image
          className={classes.avatar}
          src={avatarUrl}
          alt="My Personal Image"
          width={100}
          height={100}
        />
        <h3 className={classes.name}>{name}</h3>
        <p>{bio}</p>
      </section>
      <nav className={classes.nav}>
        {routes.map(({ href, name }, index) => (
          <Link key={index} href={href}>
            <a
              className={`${classes['nav-link']} ${
                href.length === 1
                  ? route === href && classes['nav-link--selected']
                  : route.startsWith(href) && classes['nav-link--selected']
              }`}
            >
              {name}
            </a>
          </Link>
        ))}
      </nav>
      <section className={classes['contact-info']}>
        <Link href={githubUrl}>
          <a
            target="_blank"
            className={`${classes['icon-link']} ${classes['icon-link--github']}`}
          >
            <GithubIcon />
          </a>
        </Link>
        <Link href={`https://twitter.com/${twitterUsername}`}>
          <a
            target="_blank"
            className={`${classes['icon-link']} ${classes['icon-link--twitter']}`}
          >
            <TwitterIcon />
          </a>
        </Link>
        <Link href={`mailto:${email}`}>
          <a
            className={`${classes['icon-link']} ${classes['icon-link--mail']}`}
          >
            <MailIcon />
          </a>
        </Link>
      </section>
      <small className={classes.copyright}>© Yosef Beder 2021</small>
    </aside>
  );
};

export default Sidebar;
