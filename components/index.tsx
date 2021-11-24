import styled from 'styled-components';

export const Button = styled.button`
	display: block;
	padding: var(--space-md) var(--space-lg);
	text-transform: capitalize;
	border-radius: var(--rounded-lg);
	width: max-content;

	color: var(--color-blue-50);
	background-color: var(--color-blue-400);
	box-shadow: var(--shadow-sm) var(--color-blue-100);
	transition: background-color 300ms, box-shadow 300ms;

	&:hover {
		background-color: var(--color-blue-500);
		box-shadow: var(--shadow-md) var(--color-blue-100);
	}
`;

export const Link = styled.a`
	color: var(--color-blue-400);
	transition: color 100ms;

	&:hover {
		color: var(--color-blue-500);
	}

	&:active {
		color: var(--color-blue-600);
	}
`;
