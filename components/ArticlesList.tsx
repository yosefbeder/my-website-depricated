import { useRef } from 'react';
import styled from 'styled-components';
import breakPoints from '../constants/break-points';
import { ArticleType } from '../types';
import Article from './Article';
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';
import useViewPortWidth from '../hooks/useViewPortWidth';

import { mainSharedStyles, routeTransitions } from '../pages/_app';
import useAutoScrolling from '../hooks/useAutoScrolling';

const Container = styled(motion.main)`
	--gap: var(--space-lg);

	display: flex;
	flex-direction: column;

	${mainSharedStyles}

	@media (min-width: ${breakPoints.lg}px) {
		flex-direction: row;
		justify-content: space-between;
	}
`;

const Column = styled.div`
	flex: 1;

	display: flex;
	flex-direction: column;

	&:not(:last-child) {
		margin-right: var(--gap);
	}

	& > *:not(last-child) {
		margin-bottom: var(--gap);
	}

	@media (min-width: ${breakPoints.lg}px) {
		flex: 0.5;
	}
`;

interface ArticlesListProps {
	articles: ArticleType[];
}

const ArticlesList: React.FC<ArticlesListProps> = ({ articles }) => {
	const viewPortWidth = useViewPortWidth();
	const mainRef = useRef<HTMLDivElement>(null);

	useAutoScrolling(mainRef);

	return (
		<Container
			variants={routeTransitions}
			initial="hidden"
			animate="enter"
			exit="exit"
			ref={mainRef}
		>
			{viewPortWidth < 1024 ? (
				<Column>
					{articles.map(article => (
						<Article isDescriptionShown={true} key={article.id} {...article} />
					))}
				</Column>
			) : (
				<>
					<AnimateSharedLayout>
						<Column>
							{articles
								.filter((_, i) => i % 2 === 0)
								.map(article => (
									<Article key={article.id} {...article} />
								))}
						</Column>
						<Column>
							{articles
								.filter((_, i) => i % 2 !== 0)
								.map(article => (
									<Article key={article.id} {...article} />
								))}
						</Column>
					</AnimateSharedLayout>
				</>
			)}
		</Container>
	);
};

export default ArticlesList;
