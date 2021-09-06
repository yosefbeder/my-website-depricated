import React, { useEffect, useRef } from 'react';
import { ArticleType } from '../types';
import Article from './Article';
import classes from '../styles/Article.module.scss';

interface ArticlesListProps {
  articles: ArticleType[];
}

const ArticlesList: React.FC<ArticlesListProps> = ({ articles }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const gridEl = containerRef.current!;

    if (getComputedStyle(gridEl).gridTemplateRows !== 'masonry') {
      let grid = {
        _el: gridEl,
        gap: parseFloat(getComputedStyle(gridEl).gridRowGap),
        items: Array.from(gridEl.childNodes).filter(
          c => c.nodeType === 1,
        ) as HTMLDivElement[],
        ncol: 0,
      };

      const layout = () => {
        const ncol = getComputedStyle(grid._el).gridTemplateColumns.split(
          ' ',
        ).length;

        if (ncol !== grid.ncol) {
          grid.ncol = ncol;

          grid.items.forEach(c => c.style.removeProperty('margin-top'));

          if (grid.ncol > 1) {
            grid.items.slice(ncol).forEach((c, i) => {
              let prev_fin =
                  grid.items[i].getBoundingClientRect()
                    .bottom /* bottom edge of item above */,
                curr_ini =
                  c.getBoundingClientRect().top; /* top edge of current item */

              c.style.marginTop = `${prev_fin + grid.gap - curr_ini}px`;
            });
          }
        }
      };

      layout();

      window.addEventListener('resize', () => {
        layout();
      });
    } else {
      console.log("You're browser does support it!");
    }
  }, []);
  return (
    <div className={classes.list} ref={containerRef}>
      {articles.map(article => (
        <Article key={article.id} {...article} />
      ))}
    </div>
  );
};

export default ArticlesList;
