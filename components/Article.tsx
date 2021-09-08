import React from 'react';
import Link from '../components/Link';
import Image from 'next/image';
import classes from '../styles/Article.module.scss';
import { ArticleType } from '../types';

const Article: React.FC<ArticleType> = ({
  id,
  imgSrc,
  title,
  tags,
  description,
  date,
}) => {
  return (
    <div className={classes.container}>
      <Image
        className={classes.img}
        objectFit="cover"
        src={imgSrc}
        alt={title}
        width={384}
        height={256}
      />
      <div className={classes.content}>
        <div className={classes['tags-container']}>
          {tags.map(tag => (
            <Link key={tag} href={`/articles?tags=${tag}`}>
              {tag}
            </Link>
          ))}
        </div>
        <h3>{title}</h3>
        <p>{description}</p>
        <div className={classes.footer}>
          <Link variant="btn" href={`/articles/${id}`}>
            Continue Reading
          </Link>
          <small>
            {new Intl.DateTimeFormat('en', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            }).format(new Date(date))}
          </small>
        </div>
      </div>
    </div>
  );
};

export default Article;
