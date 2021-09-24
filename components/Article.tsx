import React, { useState } from 'react';
import Link from '../components/Link';
import Image from 'next/image';
import classes from '../styles/Article.module.scss';
import { ArticleType } from '../types';
import { motion } from 'framer-motion';

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const Article: React.FC<ArticleType> = ({
  id,
  imgSrc,
  title,
  tags,
  description,
  date,
}) => {
  const [mouseIn, setMouseIn] = useState(false);

  return (
    <motion.div
      layout
      className={classes.container}
      onMouseEnter={() => setMouseIn(true)}
      onMouseLeave={() => setMouseIn(false)}
    >
      <motion.div layout>
        <Image
          className={classes.img}
          objectFit="cover"
          src={imgSrc}
          alt={title}
          width={384}
          height={256}
        />
      </motion.div>
      <motion.div layout className={classes.content}>
        {mouseIn && (
          <motion.div
            layout
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className={classes['tags-container']}
          >
            {tags.map(tag => (
              <Link key={tag} href={`/articles?tags=${tag}`}>
                {tag}
              </Link>
            ))}
          </motion.div>
        )}

        <motion.h3 layout>{title}?</motion.h3>

        {mouseIn && (
          <motion.p
            layout
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {description}
          </motion.p>
        )}
      </motion.div>
      <motion.div layout className={classes.footer}>
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
      </motion.div>
    </motion.div>
  );
};

export default Article;
