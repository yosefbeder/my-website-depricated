import React from 'react';
import classes from '../styles/404-page.module.scss';
import Head from 'next/head';
import { PageProps } from '../types';
import getUserData from '../utils/get-user-data';
import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  return {
    props: {
      userData: await getUserData(),
    },
    revalidate: 60,
  };
};

const NotFound = () => {
  return (
    <main className={classes.container}>
      <Head>
        <title>Not Found</title>
      </Head>
      <h1>404: Page Not Found!</h1>
    </main>
  );
};

export default NotFound;
