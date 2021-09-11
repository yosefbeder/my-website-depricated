import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import { useEffect } from 'react';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Scroll whenever the page is changed
    const viewPortWidth = window.innerWidth;

    const element = document.querySelector<HTMLDivElement>('main')!;

    if (viewPortWidth >= 640) {
      element.scrollTop = 0;
    }
  }, [Component]);

  return (
    <Layout>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="author" content="Yosef Beder" />
        <meta
          name="description"
          content="I'm Yosef beder and this is my website which contains some information about me, the projects that I made and finally a blog in which I share the stuff that I learn."
        />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link
          rel="preload"
          href="https://api.github.com/users/yosefbeder"
          as="fetch"
          crossOrigin="anonymous"
        ></link>
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}
export default MyApp;
