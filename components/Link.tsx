import NextLink from 'next/link';
import { Button, Link as A } from '.';

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
	variant?: 'inline' | 'btn';
	href: string;
}

const Link: React.FC<LinkProps> = ({
	href,
	variant = 'inline',
	children,
	target = '_blank',
	...elProps
}) => {
	return (
		<NextLink href={href} scroll={false} passHref>
			{variant === 'btn' ? (
				<Button as="a" target={target} {...elProps}>
					{children}
				</Button>
			) : (
				<A target={target} {...elProps}>
					{children}
				</A>
			)}
		</NextLink>
	);
};

export default Link;
