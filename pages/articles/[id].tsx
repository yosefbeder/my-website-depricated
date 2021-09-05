import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';
import classes from '../../styles/[id].module.scss';
import React from 'react';
import Markdown from '../../components/Markdown';
import Image from 'next/image';
import Link from '../../components/Link';
import fs from 'fs';
import path from 'path';
import { ArticleType } from '../../types';

interface PageProps extends ArticleType {
  markdown: string;
}

export const getServerSideProps: GetServerSideProps<PageProps> = async ({
  params,
}) => {
  return {
    props: {
      id: 'bad-arguments-notes',
      title: 'My notes on Bag Arguments',
      description:
        'A logical fallacy is an error in reasoning common enough to warrant a fancy name. Knowing how to spot and identify fallacies is a priceless skill. It can save you time, money, and personal dignity.',
      date: '2021-7-1',
      tags: ['books'],
      markdown: fs.readFileSync(
        path.join(process.cwd(), '/data/articles/bad-arguments-notes.md'),
        'utf-8',
      ),
    },
  };
};

const Article = ({
  id,
  title,
  description,
  date,
  tags,
  markdown,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <header className={classes.header}>
        <Image
          src={`/images/${id}.jpg`}
          alt={title}
          width={704}
          height={396}
          objectFit="cover"
          className={classes.img}
        />
        <h1>{title}</h1>
        <div className={classes['tags-container']}>
          {tags.map(tag => (
            <Link key={tag} href="/">
              {tag}
            </Link>
          ))}
        </div>
        <p>{description}</p>
        <small>
          {new Intl.DateTimeFormat('en', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }).format(new Date(date))}
        </small>
      </header>
      <Markdown>{markdown}</Markdown>
    </>
  );
};

export default Article;
