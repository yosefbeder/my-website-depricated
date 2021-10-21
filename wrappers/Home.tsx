import { useEffect } from 'react';
import TypographyMain from '../components/TypographyMain';
import Head from 'next/head';
import { MDXProvider } from '@mdx-js/react';
import Link from '../components/Link';

const Home: React.FC = ({ children }) => {
  useEffect(() => {
    const days = Math.round(
      new Date().getTime() * 1.15741e-8 -
        new Date('2020-7-19').getTime() * 1.15741e-8,
    );

    const years = Math.trunc(days / 365);
    const months = Math.trunc(days / 30) - years * 12;

    document.getElementById('learning-from')!.innerText = `${years} year${
      years > 1 ? 's' : ''
    } ${months ? `and ${months} month${months > 1 ? 's' : ''}` : ''}`;
  }, []);

  return (
    <TypographyMain>
      <Head>
        <title>Home</title>
      </Head>
      <article>
        <MDXProvider components={{ a: Link }}>{children}</MDXProvider>
      </article>
    </TypographyMain>
  );
};

export default Home;
