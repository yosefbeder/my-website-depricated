import { useEffect, useRef, useState } from 'react';
import classes from '../styles/article-page.module.scss';
import Image from 'next/image';
import Link from '../components/Link';
import { ArticleType } from '../types';
import TypographyMain from '../components/TypographyMain';
import Head from 'next/head';

import hljs from 'highlight.js/lib/core';
import ts from 'highlight.js/lib/languages/typescript';
import js from 'highlight.js/lib/languages/javascript';
import xml from 'highlight.js/lib/languages/xml';
import json from 'highlight.js/lib/languages/json';

hljs.registerLanguage('javascript', js);
hljs.registerLanguage('typescript', ts);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('json', json);

import 'highlight.js/styles/atom-one-dark.css';
import { MDXProvider } from '@mdx-js/react';

const Article: React.FC<ArticleType> = ({
  imgSrc,
  title,
  description,
  date,
  tags,
  children,
}) => {
  const [timeToRead, setTimeToRead] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // highlight code
    wrapperRef
      .current!.querySelectorAll<HTMLDivElement>('pre > code')
      .forEach(code => {
        hljs.highlightBlock(code);
      });

    // setting reading time
    setTimeToRead(
      Math.round(wrapperRef.current!.innerText.split(' ').length / 200),
    );
  }, []);

  return (
    <TypographyMain>
      <Head>
        <title>Articles &gt; {title}</title>
        <meta name="description" content={description} />
      </Head>
      <header className={classes.header}>
        <Image
          src={imgSrc}
          alt={title}
          width={704}
          height={396}
          objectFit="cover"
          className={classes.img}
        />
        <h1>{title}</h1>
        <div className={classes['tags-container']}>
          {tags.map(tag => (
            <Link key={tag} href={`/articles?tags=${tag}`}>
              {tag}
            </Link>
          ))}
        </div>
        <p>
          <i>{description}</i>
        </p>
        <small>
          {new Intl.DateTimeFormat('en', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }).format(new Date(date))}{' '}
          - {timeToRead} minute{timeToRead !== 1 && 's'}
        </small>
      </header>
      <article ref={wrapperRef}>
        <MDXProvider components={{ a: Link }}>{children}</MDXProvider>
      </article>
    </TypographyMain>
  );
};

export default Article;