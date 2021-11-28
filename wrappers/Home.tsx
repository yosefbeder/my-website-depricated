import { useEffect, useRef } from 'react';
import Head from 'next/head';
import { MDXProvider } from '@mdx-js/react';
import components from '../constants/components';
import styled from 'styled-components';
import useAutoScrolling from '../hooks/useAutoScrolling';
import { mainSharedStyles, routeTransitions } from '../pages/_app';
import { motion } from 'framer-motion';

const HomeMain = styled(motion.main)`
	${mainSharedStyles}
	padding-top: 0.005px;
`;

const Home: React.FC = ({ children }) => {
	const mainRef = useRef<HTMLDivElement>(null);
	useAutoScrolling(mainRef);

	useEffect(() => {
		const days = Math.round(
			new Date().getTime() * 1.15741e-8 -
				new Date('2020-7-19').getTime() * 1.15741e-8,
		);

		const years = Math.trunc(days / 365);
		const months = Math.trunc(days / 30) - years * 12;

		document.getElementById('learning-from')!.innerText = `${years} year${
			years > 1 ? 's' : ''
		} ${months ? `and ${months} month${months > 1 ? 's' : ''}` : ''}`;
	}, []);

	return (
		<>
			<Head>
				<title>Home</title>
			</Head>
			<HomeMain
				ref={mainRef}
				variants={routeTransitions}
				initial="hidden"
				animate="enter"
				exit="exit"
			>
				<MDXProvider components={components}>{children}</MDXProvider>
			</HomeMain>
		</>
	);
};

export default Home;
