import styled from 'styled-components';
import { NavLink } from '@yosefbeder/design-system/components';
import { HeaderType } from '../types';

const Header = styled(NavLink)<{ depth: number }>`
	display: block;
	margin-left: calc(${props => props.depth - 2} * var(--space-4));
	font-size: var(--font-sm);
`;

const Container = styled.div`
	border: 1px solid var(--color-gray-200);
	padding: var(--space-1);
	border-radius: var(--rounded);
	margin: var(--gap) 0;
`;

interface TableOfContentProps {
	headers: HeaderType[];
	activeHeader?: string;
}

const TableOfContent: React.FC<TableOfContentProps> = ({
	headers,
	activeHeader,
}) => {
	return (
		<Container>
			{headers.map(({ id, depth, content }) => (
				<Header
					key={content}
					depth={depth}
					href={`#${id}`}
					navigatedTo={id === activeHeader}
				>
					{content}
				</Header>
			))}
		</Container>
	);
};

export default TableOfContent;
