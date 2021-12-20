import Head from 'next/head';
import styled from 'styled-components';
import { mainSharedStyles } from './_app';

const Container = styled.main`
	${mainSharedStyles}
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
