import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from '../components/Link';
import { ArticleType } from '../types';
import TypographyMain from '../components/TypographyMain';
import Head from 'next/head';
import imagesBase64 from '../public/images-base64.json';

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

const Header = styled.header`
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
	margin-bottom: var(--space-2xl);

	& > h1 {
		// to remove the default tag style & add some spacing to the image
		margin: 0;
		margin-top: var(--space-lg);
	}

	& > *:not(:last-child) {
		margin-bottom: var(--space-lg);
	}
`;

const TagsContainer = styled.div`
	display: flex;

	& > *:not(:last-child) {
		margin-right: var(--space-lg);
	}
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
	const wrapperRef = useRef<HTMLDivElement>(null);
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		// highlight code
		hljs.highlightAll();

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
			<Header>
				<Image
					src={`/images/${id}.png`}
					placeholder="blur"
					blurDataURL={imagesBase64[id as keyof typeof imagesBase64]}
					alt={title}
					width={704}
					height={396}
					objectFit="cover"
					className={`img ${isLoaded ? 'img--loaded' : ''}`}
					onLoadingComplete={() => setIsLoaded(true)}
				/>

				<h1>{title}</h1>
				<TagsContainer>
					{tags.map(tag => (
						<Link key={tag} href={`/articles?tags=${tag}`} target="_self">
							{tag}
						</Link>
					))}
				</TagsContainer>
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
			</Header>
			<article ref={wrapperRef}>
				<MDXProvider components={{ a: Link }}>{children}</MDXProvider>
			</article>
		</TypographyMain>
	);
};

export default Article;
