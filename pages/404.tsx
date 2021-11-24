import Head from 'next/head';
import styled from 'styled-components';
import breakPoints from '../constants/break-points';

const Container = styled.main`
	width: 100%;
	text-align: center;
	padding: var(--space-xl) 0;

	@media (max-width: ${breakPoints.sm}px) {
		flex: 1;
	}
`;

const NotFound = () => {
	return (
		<Container>
			<Head>
				<title>Not Found</title>
			</Head>
			<h1>404: Page Not Found!</h1>
		</Container>
	);
};

export default NotFound;
