import React from 'react';
import classes from '../../styles/articles-page.module.scss';
import { ArticleType } from '../../types';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import ArticlesList from '../../components/ArticlesList';
import Head from 'next/head';
import { getArticles } from '../../utils/mongodb';

interface ArticlesProps {
  articles: ArticleType[];
}

export const getServerSideProps: GetServerSideProps<ArticlesProps> =
  async context => {
    if (context.query.tags) {
      const tags = (context.query.tags as string).split(',');

      const articles = await getArticles(tags);

      if (articles.length === 0) return { notFound: true };

      return {
        props: { articles },
      };
    } else {
      return { props: { articles: await getArticles() } };
    }
  };

const Articles = ({
  articles,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <main className={classes.container}>
      <Head>
        <title>Articles</title>
      </Head>
      <ArticlesList articles={articles} />
    </main>
  );
};

export default Articles;
