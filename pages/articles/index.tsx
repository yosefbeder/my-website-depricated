import React from 'react';
import classes from '../../styles/articles-page.module.scss';
import { ArticleType } from '../../types';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import ArticlesList from '../../components/ArticlesList';
import { getArticles } from '../api/articles';
import Head from 'next/head';

interface ArticlesProps {
  articles: ArticleType[];
}

export const getServerSideProps: GetServerSideProps<ArticlesProps> =
  async context => {
    if (context.query.tags) {
      const tags = (context.query.tags as string).split(',');

      const articles = getArticles(tags);

      if (articles.length === 0) return { notFound: true };

      return {
        props: { articles },
      };
    } else {
      return { props: { articles: getArticles() } };
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
