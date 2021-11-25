import { useEffect, useState, useRef } from 'react';
import { ArticleType } from '../../types';
import { GetStaticProps, NextPage } from 'next';
import ArticlesList from '../../components/ArticlesList';
import Head from 'next/head';
import { useRouter } from 'next/router';
import getAllArticles from '../../utils/get-all-articles';

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
			<Head>
				<title>Articles</title>
			</Head>
		);

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
