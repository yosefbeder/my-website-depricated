import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import classes from '../../styles/article-page.module.scss';
import React from 'react';
import Markdown from '../../components/Markdown';
import Image from 'next/image';
import Link from '../../components/Link';
import { ArticleType, FullArticleType } from '../../types';
import TypographyMain from '../../components/TypographyMain';
import Head from 'next/head';
import { getArticle, getArticles } from '../../utils/mongodb';

const formatTime = (m: number, s: number) =>
  `${m.toString().padStart(2, '0')}:${s.toString().padEnd(2, '0')}`;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: (await getArticles()).map(({ id }) => ({ params: { id } })),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<FullArticleType> = async ({
  params,
}) => {
  try {
    const article = await getArticle(params!.id as string);

    return {
      props: article,
      revalidate: 60,
    };
  } catch (_) {
    return {
      notFound: true,
    };
  }
};

const Article = ({
  id,
  imgSrc,
  title,
  description,
  date,
  tags,
  markdown,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const length = markdown.split(' ').length;
  const m = Math.trunc(length / 200);
  const s = Math.round((length % 200) * 100) / 100;

  return (
    <TypographyMain>
      <Head>
        <title>Articles &gt; {title}</title>
      </Head>
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
            <Link key={tag} href={`/articles?tags=${tag}`}>
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
