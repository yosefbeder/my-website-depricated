import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import classes from '../../styles/article-page.module.scss';
import React, { useEffect } from 'react';
import Markdown from '../../components/Markdown';
import Image from 'next/image';
import Link from '../../components/Link';
import { FullArticleType, PageProps } from '../../types';
import TypographyMain from '../../components/TypographyMain';
import Head from 'next/head';
import { getArticle, getAllArticles } from '../../utils/mongodb';

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: (await getAllArticles()).map(({ id }) => ({ params: { id } })),
    fallback: 'blocking',
  };
};

import hljs from 'highlight.js/lib/core';
import ts from 'highlight.js/lib/languages/typescript';
import js from 'highlight.js/lib/languages/javascript';
import xml from 'highlight.js/lib/languages/xml';

hljs.registerLanguage('javascript', js);
hljs.registerLanguage('typescript', ts);
hljs.registerLanguage('xml', xml);

import 'highlight.js/styles/atom-one-dark.css';
import getUserData from '../../utils/get-user-data';

export const getStaticProps: GetStaticProps<FullArticleType & PageProps> =
  async ({ params }) => {
    try {
      const article = await getArticle(params!.id as string);

      return {
        props: { ...article, userData: await getUserData() },
        revalidate: 60,
      };
    } catch (_) {
      return {
        notFound: true,
      };
    }
  };

const Article: NextPage<FullArticleType> = ({
  imgSrc,
  title,
  description,
  date,
  tags,
  markdown,
}) => {
  const timeToRead = Math.round(markdown.split(' ').length / 200);

  useEffect(() => {
    document
      .querySelector<HTMLDivElement>('article')!
      .querySelectorAll<HTMLDivElement>('pre > code')
      .forEach(code => {
        hljs.highlightBlock(code);
      });
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
      <Markdown>{markdown}</Markdown>
    </TypographyMain>
  );
};

export default Article;
