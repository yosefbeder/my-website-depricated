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

const routes = [
  { href: '/', name: 'Home' },
  { href: '/articles', name: 'Articles' },
];

const Sidebar = () => {
  const { route } = useRouter();

  return (
    <aside className={classes.container}>
      <section className={classes['personal-info']}>
        <Image
          className={classes.avatar}
          src="/images/personal-image.jpg"
          alt="My Personal Image"
          width={100}
          height={100}
        />
        <h3>Yosef Beder</h3>
        <p>
          I&apos;m a beginner front-end developer. I&apos;ve been learning
          front-end for 1 year. I could use React, Redux, and Typescript at the
          time of writing this bio 😉.
        </p>
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
        <Link href="https://github.com/yosefbeder" passHref>
          <a
            target="_blank"
            className={`${classes['icon-link']} ${classes['icon-link--github']}`}
          >
            <GithubIcon />
          </a>
        </Link>
        <Link href="https://twitter.com/BederYosef" passHref>
          <a
            target="_blank"
            className={`${classes['icon-link']} ${classes['icon-link--twitter']}`}
          >
            <TwitterIcon />
          </a>
        </Link>
        <Link href="mailto:dryosefbeder@gmail.com" passHref>
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
