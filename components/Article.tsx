import React from 'react';
import Link from '../components/Link';
import Image from 'next/image';
import classes from '../styles/Article.module.scss';

export interface ArticleProps {
  id: string;
  title: string;
  imgSrc: string;
  tags: string[];
  description: string;
  date: string;
}

const Article: React.FC<ArticleProps> = ({
  id,
  title,
  imgSrc,
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
            <Link key={tag} href="/">
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
              month: 'long',
              day: 'numeric',
            }).format(new Date(date))}
          </small>
        </div>
      </div>
    </div>
  );
};

export default Article;
