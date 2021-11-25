import { useEffect, useRef, useState } from 'react';
import { ArticleType } from '../types';
import Head from 'next/head';
import NextLink from 'next/link';

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
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { mainSharedStyles, routeTransitions } from '../pages/_app';
import components from '../constants/components';
import useAutoScrolling from '../hooks/useAutoScrolling';
import { H1, P2 } from '@yosefbeder/design-system/typography';
import { Tag, TagsContainer } from '../components/Article';

const ArticleMain = styled(motion.main)`
	${mainSharedStyles}
	padding-top: 0.005px;
`;

const Title = styled(H1)`
	margin-bottom: var(--space-md);
`;

const Article: React.FC<ArticleType> = ({
	id,
	title,
	description,
	date,
	tags,
	children,
}) => {
	const [timeToRead, setTimeToRead] = useState(0);
	const mainRef = useRef<HTMLDivElement>(null);

	useAutoScrolling(mainRef);

	useEffect(() => {
		// highlight code
		hljs.highlightAll();

		// setting reading time
		setTimeToRead(
			Math.round(mainRef.current!.innerText.split(' ').length / 200),
		);
	}, []);

	return (
		<>
			<Head>
				<title>Articles &gt; {title}</title>
				<meta name="description" content={description} />
			</Head>
			<ArticleMain
				ref={mainRef}
				variants={routeTransitions}
				initial="hidden"
				animate="enter"
				exit="exit"
			>
				<Title>{title}</Title>
				<TagsContainer as={motion.div} layout>
					{tags.map(tag => (
						<NextLink
							key={tag}
							href={`/articles?tag=${tag}`}
							scroll={false}
							passHref
						>
							<Tag>{tag}</Tag>
						</NextLink>
					))}
				</TagsContainer>
				<P2>{description}</P2>
				<P2>
					⌚ {timeToRead} minute{timeToRead === 1 ? '' : 's'} - 📅{' '}
					{new Intl.DateTimeFormat('en', {
						month: 'short',
						day: 'numeric',
					}).format(new Date(date))}
				</P2>
				<MDXProvider components={components}>{children}</MDXProvider>
			</ArticleMain>
		</>
	);
};

export default Article;
