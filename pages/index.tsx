import React from 'react';
import fs from 'fs/promises';
import path from 'path';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Markdown from '../components/Markdown';

interface AboutProps {
  markdown: string;
}

export const getStaticProps: GetStaticProps<AboutProps> = async () => {
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
  return <Markdown>{markdown}</Markdown>;
};

export default Home;
