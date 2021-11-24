import { motion } from 'framer-motion';
import { routeTransitions } from '../pages/_app';
import styled from 'styled-components';
import breakPoints from '../constants/break-points';

const Container = styled(motion.main)`
	flex: 1;
	padding: var(--space-2xl) var(--space-lg);

	@media (min-width: ${breakPoints.sm}px) {
		height: 100vh;
		overflow-y: scroll;
		scrollbar-width: none;

		width: 0;
	}

	@media (min-width: ${breakPoints.md}px) {
		padding: var(--space-2xl);
	}
`;

const TypographyMain: React.FC = ({ children }) => {
	return (
		<Container
			variants={routeTransitions}
			initial="hidden"
			animate="enter"
			exit="exit"
		>
			{children}
		</Container>
	);
};

export default TypographyMain;
