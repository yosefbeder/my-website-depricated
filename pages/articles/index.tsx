import React, { useEffect, useState } from 'react';
import classes from '../../styles/articles-page.module.scss';
import { ArticleType } from '../../types';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import ArticlesList from '../../components/ArticlesList';
import Head from 'next/head';
import { getAllArticles } from '../../utils/mongodb';
import { useRouter } from 'next/router';

interface ArticlesProps {
  articles: ArticleType[];
}

export const getStaticProps: GetStaticProps<ArticlesProps> = async () => {
  return { props: { articles: await getAllArticles() }, revalidate: 60 };
};

const Articles = ({
  articles,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { query, isReady } = useRouter();
  const [filteredArticles, setFilteredArticles] = useState(articles);

  useEffect(() => {
    // filtering
    if (query.tags) {
      const tags = (query.tags as string).split(',');

      let result = articles;

      tags.forEach(tag => {
        result = result.filter(article => article.tags.includes(tag));
      });

      setFilteredArticles(result);
    } else {
      setFilteredArticles(articles);
    }
  }, [query]);

  if (!isReady)
    return (
      <main className={classes.container}>
        <Head>
          <title>Articles</title>
        </Head>
      </main>
    );

  return (
    <main className={classes.container}>
      <Head>
        <title>Articles</title>
      </Head>
      <ArticlesList articles={filteredArticles} />
    </main>
  );
};

export default Articles;
