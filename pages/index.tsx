import React from 'react';
import fs from 'fs/promises';
import path from 'path';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Markdown from '../components/Markdown';
import TypographyMain from '../components/TypographyMain';

interface HomeProps {
  markdown: string;
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const markdown = await fs.readFile(
    path.join(process.cwd(), '/data/home.md'),
    'utf-8',
  );

  return {
    props: {
      markdown,
    },
  };
};

const Home = ({ markdown }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <TypographyMain>
      <Markdown>{markdown}</Markdown>
    </TypographyMain>
  );
};

export default Home;
