import React, { useEffect, useRef } from 'react';
import classes from '../../styles/articles-page.module.scss';
import { ArticleType } from '../../types';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import ArticlesList from '../../components/ArticlesList';

const articles = [
  {
    id: '1',
    imgSrc: '/images/articles/planning.jpg',
    title: 'Why is planning so important for personal prosperity?',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia consectetur velit voluptatibus delectus esse, dolores veniam perspiciatis animi commodi laboriosam voluptatum est suscipit optio qui provident repellat nemo illum reiciendis.',
    date: '2021-7-1',
    tags: ['productivity'],
  },
  {
    id: '2',
    imgSrc: '/images/articles/react-code.jpg',
    title: 'Why should you learn React now?',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus nam, odit harum ratione error nihil magni voluptates eos inventore accusantium aut at a incidunt esse veritatis. Maxime quam nihil explicabo.',
    date: '2021-7-1',
    tags: ['frontend-development'],
  },
  {
    id: '3',
    imgSrc: '/images/articles/hacker.jpg',
    title: 'A Roadmap for being a hacker in 2021',
    description:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita quam consequatur eveniet officiis, est quia sequi ab reprehenderit cumque quod nostrum, cum laudantium reiciendis explicabo rerum, aliquid voluptates hic blanditiis?',
    date: '2021-7-1',
    tags: ['backend-development'],
  },
  {
    id: '4',
    imgSrc: '/images/articles/terminal.jpg',
    title: 'How to make your backend code secure from hackers and evils',
    description:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita quam consequatur eveniet officiis, est quia sequi ab reprehenderit cumque quod nostrum, cum laudantium reiciendis explicabo rerum, aliquid voluptates hic blanditiis?',
    date: '2021-7-1',
    tags: ['backend-development'],
  },
  {
    id: 'bad-arguments-notes',
    imgSrc: '/images/articles/bad-arguments-notes.jpg',
    title: 'My notes on Bag Arguments',
    description:
      "We face a lot of fallacies daily, that makes someones argument true, but it's not",
    date: '2021-7-1',
    tags: ['books'],
  },
];

interface ArticlesProps {
  articles: ArticleType[];
}

export const getStaticProps: GetStaticProps<ArticlesProps> = () => {
  return {
    props: { articles },
  };
};

const Articles = ({
  articles,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <main className={classes.container}>
      <ArticlesList articles={articles} />
    </main>
  );
};

export default Articles;
