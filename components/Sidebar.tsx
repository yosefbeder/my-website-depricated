import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';
import {
	FaGithub as GithubIcon,
	FaLinkedin as LinkedIn,
	FaEnvelope as MailIcon,
} from 'react-icons/fa';
import { FiCodesandbox as CodeSandbox } from 'react-icons/fi';
import userData from '../public/user-data.json';
import styled, { css } from 'styled-components';
import breakPoints from '../constants/break-points';

const routes = [
	{ href: '/', name: 'Home' },
	{ href: '/articles', name: 'Articles' },
];

const Container = styled.aside`
	display: flex;
	flex-direction: column;
	align-items: flex-start;

	padding: var(--space-lg);
	border-bottom: 1px solid var(--color-gray-200);

	& > *:not(:last-child) {
		margin-bottom: var(--space-2xl);
	}

	@media (min-width: ${breakPoints.sm}px) {
		flex: 0 0 16.5rem;
		border-bottom: 0;
		border-right: 1px solid var(--color-gray-200);
		align-self: flex-start;
	}

	@media (min-width: ${breakPoints.md}px) {
		flex: 0 0 20rem;
	}
`;

const PersonalInfo = styled.section`
	display: flex;
	flex-direction: column;
	align-items: flex-start;

	& > * {
		margin: 0;
	}

	& > *:not(:last-child) {
		margin-bottom: var(--space-lg);
	}
`;

const Avatar = styled(Image)`
	border-radius: var(--rounded-full);
`;

const Name = styled.h3`
	margin-top: var(--space-lg);
`;

const Nav = styled.nav`
	display: flex;

	& > *:not(:last-child) {
		margin-right: var(--space-lg);
	}

	@media (min-width: ${breakPoints.sm}px) {
		flex-direction: column;

		& > *:not(:last-child) {
			margin: 0;
			margin-bottom: var(--space-lg);
		}
	}
`;

const ContactInfo = styled.div`
	display: flex;

	& > *:not(:last-child) {
		margin-right: var(--space-lg);
	}
`;

const NavLink = styled.a<{ isSelected?: boolean }>`
	font-size: var(--text-md);
	color: var(--color-gray-500);
	transition: color 100ms;

	&:hover {
		color: var(--color-gray-700);
	}

	&:active {
		color: var(--color-blue-600);
	}

	${props =>
		props.isSelected
			? css`
					&,
					&:hover {
						color: var(--color-blue-600);
					}
			  `
			: ''}
`;

const Copyright = styled.small`
	align-self: center;
`;

const ContactCard = styled.a<{
	theme: 'github' | 'linkedIn' | 'codeSandbox' | 'mail';
}>`
	& > svg {
		color: var(--color-gray-500);
		width: 2.2rem;
		height: 2.2rem;

		transition: color 100ms;
	}

	&:hover > svg {
		color: var(--color-${props => props.theme});
	}
`;

const Sidebar = () => {
	const { route } = useRouter();

	const {
		name,
		bio,
		avatarUrl,
		githubUrl,
		linkedInUrl,
		codeSandboxUrl,
		email,
	} = userData;

	return (
		<Container>
			<PersonalInfo>
				<Avatar
					src={avatarUrl}
					alt="My Personal Image"
					width={100}
					height={100}
				/>
				<Name>{name}</Name>
				<p>{bio}</p>
			</PersonalInfo>
			<Nav>
				{routes.map(({ href, name }, index) => (
					<Link key={index} href={href} scroll={false} passHref>
						<NavLink
							isSelected={
								href.length === 1 ? route === href : route.startsWith(href)
							}
						>
							{name}
						</NavLink>
					</Link>
				))}
			</Nav>
			<ContactInfo>
				<Link href={githubUrl} passHref>
					<ContactCard target="_blank" theme="github">
						<GithubIcon />
					</ContactCard>
				</Link>
				<Link href={linkedInUrl} passHref>
					<ContactCard target="_blank" theme="linkedIn">
						<LinkedIn />
					</ContactCard>
				</Link>
				<Link href={codeSandboxUrl} passHref>
					<ContactCard target="_blank" theme="codeSandbox">
						<CodeSandbox />
					</ContactCard>
				</Link>
				<Link href={`mailto:${email}`} passHref>
					<ContactCard theme="mail">
						<MailIcon />
					</ContactCard>
				</Link>
			</ContactInfo>
			<Copyright>© Yosef Beder 2021</Copyright>
		</Container>
	);
};

export default Sidebar;
