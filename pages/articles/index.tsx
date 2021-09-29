import React, { useEffect, useState } from 'react';
import classes from '../../styles/articles-page.module.scss';
import { ArticleType, PageProps } from '../../types';
import { GetStaticProps, NextPage } from 'next';
import ArticlesList from '../../components/ArticlesList';
import Head from 'next/head';
import { getAllArticles } from '../../utils/mongodb';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { routeTransitions } from '../_app';
import getUserData from '../../utils/get-user-data';

interface ArticlesProps {
  articles: ArticleType[];
}

export const getStaticProps: GetStaticProps<ArticlesProps & PageProps> =
  async () => {
    return {
      props: {
        articles: await getAllArticles(),
        userData: await getUserData(),
      },
      revalidate: 60,
    };
  };

const Articles: NextPage<ArticlesProps> = ({ articles }) => {
  const { query, isReady } = useRouter();
  const [filteredArticles, setFilteredArticles] = useState<ArticleType[]>();

  useEffect(() => {
    // filtering
    const tags = query.tags;

    let result = articles;

    if (tags) {
      const tagsArr = (tags as string).split(',');

      tagsArr.forEach(tag => {
        result = result.filter(article => article.tags.includes(tag));
      });
    }

    setFilteredArticles(result);
  }, [query]);

  if (!isReady || !filteredArticles)
    return (
      <main className={classes.container}>
        <Head>
          <title>Articles</title>
        </Head>
      </main>
    );

  return (
    <motion.main
      variants={routeTransitions}
      initial="hidden"
      animate="enter"
      exit="exit"
      className={classes.container}
    >
      <Head>
        <title>Articles</title>
      </Head>
      <ArticlesList articles={filteredArticles} />
    </motion.main>
  );
};

export default Articles;
