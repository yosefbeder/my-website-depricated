import classes from '../styles/Sidebar.module.scss';
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

const routes = [
	{ href: '/', name: 'Home' },
	{ href: '/articles', name: 'Articles' },
];

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
		<aside className={classes.container}>
			<section className={classes['personal-info']}>
				<Image
					className={classes.avatar}
					src={avatarUrl}
					alt="My Personal Image"
					width={100}
					height={100}
				/>
				<h3 className={classes.name}>{name}</h3>
				<p>{bio}</p>
			</section>
			<nav className={classes.nav}>
				{routes.map(({ href, name }, index) => (
					<Link key={index} href={href} scroll={false}>
						<a
							className={`${classes['nav-link']} ${
								href.length === 1
									? route === href && classes['nav-link--selected']
									: route.startsWith(href) && classes['nav-link--selected']
							}`}
						>
							{name}
						</a>
					</Link>
				))}
			</nav>
			<section className={classes['contact-info']}>
				<Link href={githubUrl}>
					<a
						target="_blank"
						className={`${classes['icon-link']} ${classes['icon-link--github']}`}
					>
						<GithubIcon />
					</a>
				</Link>
				<Link href={linkedInUrl}>
					<a
						target="_blank"
						className={`${classes['icon-link']} ${classes['icon-link--linkedIn']}`}
					>
						<LinkedIn />
					</a>
				</Link>
				<Link href={codeSandboxUrl}>
					<a
						target="_blank"
						className={`${classes['icon-link']} ${classes['icon-link--codeSandbox']}`}
					>
						<CodeSandbox />
					</a>
				</Link>
				<Link href={`mailto:${email}`}>
					<a
						className={`${classes['icon-link']} ${classes['icon-link--mail']}`}
					>
						<MailIcon />
					</a>
				</Link>
			</section>
			<small className={classes.copyright}>© Yosef Beder 2021</small>
		</aside>
	);
};

export default Sidebar;
