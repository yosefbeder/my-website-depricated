import styled from 'styled-components';
import breakPoints from '../constants/break-points';
import Sidebar from './Sidebar';

const Container = styled.div`
	max-width: ${breakPoints.lg}px;
	margin: 0 auto;

	@media (min-width: ${breakPoints.sm}px) {
		display: flex;
	}
`;

const Layout: React.FC = ({ children }) => {
	return (
		<Container>
			<Sidebar />
			{children}
		</Container>
	);
};

export default Layout;
