import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import classes from '../../styles/article-page.module.scss';
import React from 'react';
import Markdown from '../../components/Markdown';
import Image from 'next/image';
import Link from '../../components/Link';
import { ArticleType } from '../../types';
import { getArticle } from '../api/articles/[id]';
import TypographyMain from '../../components/TypographyMain';

export interface ArticlePageProps extends ArticleType {
  markdown: string;
}

const formatTime = (m: number, s: number) =>
  `${m.toString().padStart(2, '0')}:${s.toString().padEnd(2, '0')}`;

export const getServerSideProps: GetServerSideProps<ArticlePageProps> = async ({
  params,
}) => {
  return {
    props: await getArticle('my-notes-on-bad-arguments'),
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
  const length = markdown.split(' ').length;
  const m = Math.trunc(length / 200);
  const s = Math.round((length % 200) * 100) / 100;

  return (
    <TypographyMain>
      <header className={classes.header}>
        <Image
          src={`/images/articles/${id}.jpg`}
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
        <p>
          <i>{description}</i>
        </p>
        <small>
          {new Intl.DateTimeFormat('en', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }).format(new Date(date))}{' '}
          - {formatTime(m, s)} minutes
        </small>
      </header>
      <Markdown>{markdown}</Markdown>
    </TypographyMain>
  );
};

export default Article;
