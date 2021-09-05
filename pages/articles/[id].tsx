import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';
import classes from '../../styles/[id].module.scss';
import React from 'react';
import Markdown from '../../components/Markdown';
import { ArticleProps } from '../../components/Article';
import Image from 'next/image';
import Link from '../../components/Link';
import fs from 'fs';
import path from 'path';

interface PageProps extends ArticleProps {
  markdown: string;
}

export const getServerSideProps: GetServerSideProps<PageProps> = async ({
  params,
}) => {
  return {
    props: {
      id: 'bad-arguments-notes',
      imgSrc: '/images/articles/bad-arguments-notes.jpg',
      title: 'My notes on Bag Arguments',
      description:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita quam consequatur eveniet officiis, est quia sequi ab reprehenderit cumque quod nostrum, cum laudantium reiciendis explicabo rerum, aliquid voluptates hic blanditiis?',
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
  imgSrc,
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
          src={imgSrc}
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
