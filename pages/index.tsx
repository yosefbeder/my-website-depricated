import React from 'react';
import fs from 'fs/promises';
import path from 'path';
import { GetStaticProps, NextPage } from 'next';
import Markdown from '../components/Markdown';
import TypographyMain from '../components/TypographyMain';
import Head from 'next/head';
import { PageProps } from '../types';
import getUserData from '../utils/get-user-data';

interface HomeProps {
  markdown: string;
}

export const getStaticProps: GetStaticProps<HomeProps & PageProps> =
  async () => {
    const markdown = await fs.readFile(
      path.join(process.cwd(), 'README.md'),
      'utf-8',
    );

    const userData = await getUserData();

    return {
      props: {
        markdown,
        userData,
      },
      revalidate: 60,
    };
  };

const Home: NextPage<HomeProps> = ({ markdown }) => {
  return (
    <TypographyMain>
      <Head>
        <title>Home</title>
      </Head>
      <Markdown>{markdown}</Markdown>
    </TypographyMain>
  );
};

export default Home;
