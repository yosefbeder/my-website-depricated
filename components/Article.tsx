import { useEffect, useState } from 'react';
import Link from '../components/Link';
import NextImage from 'next/image';
import { ArticleType } from '../types';
import { motion } from 'framer-motion';
import imagesBase64 from '../public/images-base64.json';
import styled from 'styled-components';

const variants = {
	hidden: { opacity: 0 },
	visible: { opacity: 1 },
};

const Container = styled(motion.div)`
	height: max-content;
	border-radius: var(--rounded-md);
	box-shadow: var(--shadow-lg) var(--color-gray-200);
	background-color: var(--color-white);

	overflow: hidden;
`;

const Image = styled(NextImage)<{ isLoaded?: boolean }>`
	filter: blur(${props => (props.isLoaded ? '0' : '1.5rem')});

	transition: filter 250ms;
`;

const Content = styled(motion.div)`
	padding: var(--space-lg);

	& > * {
		margin: 0;
	}

	& > h3 {
		margin-bottom: var(--space-md);
	}

	& > p {
		color: var(--color-gray-600);

		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
`;

const TagsContainer = styled(motion.div)`
	display: flex;
	margin-bottom: var(--space-lg);

	& > *:not(:last-child) {
		margin-right: var(--space-md);
	}
`;

const Footer = styled(motion.div)`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: var(--space-lg);
	background-color: var(--color-gray-50);
`;

const Article: React.FC<ArticleType> = ({
	id,
	title,
	tags,
	description,
	date,
}) => {
	const [mouseIn, setMouseIn] = useState(false);
	const [isLoaded, setIsLoaded] = useState(false);
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		if (
			/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
				navigator.userAgent,
			)
		) {
			setIsMobile(true);
		}
	}, []);

	return (
		<Container
			layout
			onMouseEnter={() => setMouseIn(true)}
			onMouseLeave={() => setMouseIn(false)}
		>
			<motion.div layout>
				<Image
					isLoaded={isLoaded}
					src={`/images/${id}.png`}
					placeholder="blur"
					blurDataURL={imagesBase64[id as keyof typeof imagesBase64]}
					onLoadingComplete={() => setIsLoaded(true)}
					objectFit="cover"
					alt={title}
					width={384}
					height={256}
				/>
			</motion.div>
			<Content layout>
				{(mouseIn || isMobile) && (
					<TagsContainer
						layout
						variants={variants}
						initial="hidden"
						animate="visible"
						exit="hidden"
					>
						{tags.map(tag => (
							<Link key={tag} href={`/articles?tags=${tag}`} target="_self">
								{tag}
							</Link>
						))}
					</TagsContainer>
				)}

				<motion.h3 layout>{title}</motion.h3>

				{(mouseIn || isMobile) && (
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
			</Content>
			<Footer layout>
				<Link variant="btn" href={`/articles/${id}`} target="_self">
					Continue Reading
				</Link>
				<small>
					{new Intl.DateTimeFormat('en', {
						year: 'numeric',
						month: 'short',
						day: 'numeric',
					}).format(new Date(date))}
				</small>
			</Footer>
		</Container>
	);
};

export default Article;
