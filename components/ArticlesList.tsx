import { ArticleType } from '../types';
import Article from './Article';
import classes from '../styles/Article.module.scss';
import { AnimatePresence, AnimateSharedLayout } from 'framer-motion';
import useViewPortWidth from '../hooks/useViewPortWidth';

interface ArticlesListProps {
  articles: ArticleType[];
}

const ArticlesList: React.FC<ArticlesListProps> = ({ articles }) => {
  const viewPortWidth = useViewPortWidth();

  return (
    <AnimateSharedLayout>
      <AnimatePresence>
        {viewPortWidth < 1024 ? (
          <div className={classes.column}>
            {articles.map(article => (
              <Article key={article.id} {...article} />
            ))}
          </div>
        ) : (
          <div className={classes['columns-container']}>
            <div className={classes.column}>
              {articles
                .filter((_, i) => i % 2 === 0)
                .map(article => (
                  <Article key={article.id} {...article} />
                ))}
            </div>
            <div className={classes.column}>
              {articles
                .filter((_, i) => i % 2 !== 0)
                .map(article => (
                  <Article key={article.id} {...article} />
                ))}
            </div>
          </div>
        )}
      </AnimatePresence>
    </AnimateSharedLayout>
  );
};

export default ArticlesList;
