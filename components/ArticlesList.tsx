import { ArticleType } from '../types';
import Article from './Article';
import { AnimatePresence, AnimateSharedLayout } from 'framer-motion';
import useViewPortWidth from '../hooks/useViewPortWidth';
import styled from 'styled-components';
import breakPoints from '../constants/break-points';

const ColumnContainer = styled.div`
	display: flex;
	width: max-content;
	margin: 0 auto;

	& > *:not(:last-child) {
		margin-right: var(--space-xl);
	}
`;

const Column = styled.div`
	--sm: 20rem;
	--md: 22rem;
	--lg: 24rem;

	display: flex;
	flex-direction: column;
	width: var(--md);
	padding: var(--space-xl) 0;
	margin: 0 auto;

	& > *:not(:last-child) {
		margin-bottom: var(--space-xl);
	}

	@media (min-width: ${breakPoints.md}px) {
		width: var(--lg);
	}

	@media (min-width: ${breakPoints.lg}px) {
		margin: 0;
		width: var(--sm);
	}
`;

interface ArticlesListProps {
	articles: ArticleType[];
}

const ArticlesList: React.FC<ArticlesListProps> = ({ articles }) => {
	const viewPortWidth = useViewPortWidth();

	return (
		<AnimateSharedLayout>
			<AnimatePresence>
				{viewPortWidth < 1024 ? (
					<Column>
						{articles.map(article => (
							<Article key={article.id} {...article} />
						))}
					</Column>
				) : (
					<ColumnContainer>
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
					</ColumnContainer>
				)}
			</AnimatePresence>
		</AnimateSharedLayout>
	);
};

export default ArticlesList;
