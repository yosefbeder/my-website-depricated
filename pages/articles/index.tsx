import { useEffect, useState } from 'react';
import { ArticleType } from '../../types';
import { GetStaticProps, NextPage } from 'next';
import ArticlesList from '../../components/ArticlesList';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { routeTransitions } from '../_app';
import getAllArticles from '../../utils/get-all-articles';
import styled from 'styled-components';
import breakPoints from '../../constants/break-points';

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

const Container = styled(motion.main)`
	@media (min-width: ${breakPoints.sm}px) {
		height: 100vh;
		flex: 1;
		overflow-y: scroll;
		scrollbar-width: none;

		&::-webkit-scrollbar {
			width: 0;
		}
	}
`;

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
			<Container as="main">
				<Head>
					<title>Articles</title>
				</Head>
			</Container>
		);

	return (
		<Container
			variants={routeTransitions}
			initial="hidden"
			animate="enter"
			exit="exit"
		>
			<Head>
				<title>Articles</title>
			</Head>
			<ArticlesList articles={filteredArticles} />
		</Container>
	);
};

export default Articles;
