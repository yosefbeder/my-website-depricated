import styled from 'styled-components';
import breakPoints from '../constants/break-points';
import Sidebar from './Sidebar';
import { Provider } from 'react-redux';
import store from '../store';

const Container = styled.div`
	max-width: ${breakPoints.lg}px;
	margin: 0 auto;

	@media (min-width: ${breakPoints.sm}px) {
		display: flex;
	}
`;

const Layout: React.FC = ({ children }) => {
	return (
		<Provider store={store}>
			<Container>
				<Sidebar />
				{children}
			</Container>
		</Provider>
	);
};

export default Layout;
