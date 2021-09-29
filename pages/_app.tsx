import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import React from 'react';
import Head from 'next/head';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import useFlashFix from '../hooks/useFlashFix';
import useViewPortWidth from '../hooks/useViewPortWidth';

export const routeTransitions = {
  hidden: { opacity: 0, y: 60 },
  enter: {
    opacity: 1,
    y: 0,
  },
  exit: { opacity: 0, x: 120, transition: { duration: 0.35, ease: 'easeIn' } },
};

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const url = `${process.env.HOMEPAGE}${router.route}`;
  const viewPortWidth = useViewPortWidth();

  useFlashFix();

  return (
    <Layout userData={pageProps.userData}>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="author" content="Yosef Beder" />
        <meta
          name="description"
          content="I'm Yosef beder and this is my website which contains some information about me, the projects that I made and finally a blog in which I share the stuff that I learn."
        />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <AnimatePresence
        exitBeforeEnter
        initial={false}
        onExitComplete={() => {
          if (viewPortWidth >= 640) {
            document.querySelector('main')!.scrollTop = 0;
          } else {
            document.documentElement.scrollTop = 0;
          }
        }}
      >
        <Component {...pageProps} key={url} />
      </AnimatePresence>
    </Layout>
  );
}
export default MyApp;
