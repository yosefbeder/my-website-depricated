import React from 'react';
import { ArticleType } from '../types';
import Article from './Article';
import classes from '../styles/Article.module.scss';
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';
import useViewPortWidth from '../hooks/useViewPortWidth';

interface ArticlesListProps {
  articles: ArticleType[];
}

const ArticlesList: React.FC<ArticlesListProps> = ({ articles }) => {
  const viewPortWidth = useViewPortWidth();

  return (
    <AnimateSharedLayout>
      {viewPortWidth < 1024 ? (
        <div className={classes.column}>
          <AnimatePresence>
            {articles.map(article => (
              <Article key={article.id} {...article} />
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className={classes['columns-container']}>
          <div className={classes.column}>
            <AnimatePresence>
              {articles
                .filter((_, i) => i % 2 === 0)
                .map(article => (
                  <Article key={article.id} {...article} />
                ))}
            </AnimatePresence>
          </div>
          <div className={classes.column}>
            <AnimatePresence>
              {articles
                .filter((_, i) => i % 2 !== 0)
                .map(article => (
                  <Article key={article.id} {...article} />
                ))}
            </AnimatePresence>
          </div>
        </div>
      )}
    </AnimateSharedLayout>
  );
};

export default ArticlesList;
