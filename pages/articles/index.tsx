import { useEffect, useState } from "react";
import { ArticleType } from "../../types";
import { GetStaticProps, NextPage } from "next";
import ArticlesList from "../../components/ArticlesList";
import Head from "next/head";
import { useRouter } from "next/router";
import getAllArticles from "../../utils/get-all-articles";

interface ArticlesProps {
  articles: ArticleType[];
}

export const getStaticProps: GetStaticProps<ArticlesProps> = async () => {
  return {
    props: {
      articles: await getAllArticles(),
    },
  };
};

const Articles: NextPage<ArticlesProps> = ({ articles }) => {
  const { query } = useRouter();
  const [filteredArticles, setFilteredArticles] = useState<ArticleType[]>([]);

  useEffect(() => {
    let result = articles;

    if (query.tag) {
      const tag = (query.tag as string).split(",")[0];

      result = result.filter((article) => article.tags.includes(tag));
    }

    setFilteredArticles(result);
  }, [query, articles]);

  return (
    <>
      <Head>
        <title>Articles</title>
      </Head>
      <ArticlesList articles={filteredArticles} />
    </>
  );
};

export default Articles;
