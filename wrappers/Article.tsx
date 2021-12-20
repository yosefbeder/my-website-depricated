import { useEffect, useRef } from 'react';
import { ArticleType, HeaderType } from '../types';
import Head from 'next/head';
import NextLink from 'next/link';
import { H1, P2 } from '@yosefbeder/design-system/typography';
import { breakPoints } from '@yosefbeder/design-system/constants';
import { MDXProvider } from '@mdx-js/react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { mainSharedStyles, routeTransitions } from '../pages/_app';
import components from '../constants/components';
import useAutoScrolling from '../hooks/useAutoScrolling';
import { Tag, TagsContainer } from '../components/Article';
import { useAppDispatch, useAppSelector } from '../hooks/react-redux';
import { Action } from '../store/toc';
import { convertToSlug } from '@yosefbeder/design-system/utils/with-id';
import useScrollTop from '../hooks/useScrollTop';
import useViewPortWidth from '../hooks/useViewPortWidth';
import TableOfContent from '../components/TableOfContent';

const ArticleMain = styled(motion.main)`
	${mainSharedStyles}
	padding-top: 0.005px;
`;

const Header = styled.header`
	& > * {
		margin: var(--space-2) 0;
	}
`;

const Article: React.FC<ArticleType & { children: any[] }> = ({
	title,
	description,
	date,
	tags,
	children,
	timeToRead,
}) => {
	const mainRef = useRef<HTMLDivElement>(null);

	useAutoScrolling(mainRef);

	// Handling table of content

	const dispatch = useAppDispatch();
	const toc = useAppSelector(props => props.toc);
	const _headers = useRef<{ id: string; scrollTop: number }[]>([]);
	const _activeHeader = useRef('');
	const scrollTop = useScrollTop(mainRef);
	const viewPortWidth = useViewPortWidth();

	useEffect(() => {
		const headers = children
			.filter(child => child.props.mdxType.startsWith('h'))
			.map(
				child =>
					({
						depth: +child.props.mdxType[1],
						content: child.props.children,
						id: convertToSlug(child.props.children),
					} as HeaderType),
			)
			.filter(child => child.depth <= 4);

		_headers.current = headers.map(({ id }) => ({
			id,
			scrollTop: Math.round(
				document.getElementById(id)!.getBoundingClientRect().top,
			),
		}));

		_activeHeader.current = '';

		dispatch({
			type: Action.MOUNT,
			payload: { headers, activeHeader: '' },
		});

		return () => {
			dispatch({ type: Action.UNMOUNT });
		};
	}, [dispatch, children]);

	useEffect(() => {
		// the element that's smaller than or equal to the current scrollTop
		// when it's the first element check if it's bigger or not

		for (let i = _headers.current.length - 1; i >= 0; i--) {
			const _header = _headers.current[i];

			if (i === 0 && _header.scrollTop > scrollTop) {
				dispatch({ type: Action.SCROLL, payload: '' });
				_activeHeader.current = '';
			}

			if (_header.scrollTop <= scrollTop) {
				if (_activeHeader.current !== _header.id) {
					dispatch({ type: Action.SCROLL, payload: _header.id });
					_activeHeader.current = _header.id;
				}
				break;
			}
		}
	}, [scrollTop, dispatch]);

	useEffect(() => {
		_headers.current = _headers.current.map(({ id }) => ({
			id,
			scrollTop: Math.trunc(
				document.getElementById(id)!.getBoundingClientRect().top +
					mainRef.current!.scrollTop,
			),
		}));
	}, [viewPortWidth]);

	return (
		<>
			<Head>
				<title>Articles &gt; {title}</title>
				<meta name="description" content={description} />
			</Head>
			<ArticleMain
				ref={mainRef}
				variants={routeTransitions}
				onAnimationComplete={() => {
					_headers.current = _headers.current.map(({ id }) => ({
						id,
						scrollTop: Math.trunc(
							document.getElementById(id)!.getBoundingClientRect().top +
								mainRef.current!.scrollTop,
						),
					}));
				}}
				initial="hidden"
				animate="enter"
				exit="exit"
			>
				<Header>
					<H1>{title}</H1>
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
					{viewPortWidth < breakPoints.sm && toc && (
						<TableOfContent headers={toc.headers} activeHeader="" />
					)}
				</Header>
				<MDXProvider components={components}>{children}</MDXProvider>
			</ArticleMain>
		</>
	);
};

export default Article;
