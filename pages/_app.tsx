import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';

export const routeTransitions = {
  hidden: { opacity: 0, y: 60 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, x: 60, transition: { duration: 0.25 } },
};

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const url = `${process.env.HOMEPAGE}${router.route}`;
  const [viewPortWidth, setViewPortWidth] = useState(0);

  // css modules bug work-around

  useEffect(() => {
    Array.from(
      document.querySelectorAll('head > link[rel="stylesheet"][data-n-p]'),
    ).forEach(node => {
      node.removeAttribute('data-n-p');
    });
    const mutationHandler = (mutations: any) => {
      mutations.forEach(({ target }: { target: any }) => {
        if (target.nodeName === 'STYLE') {
          if (target.getAttribute('media') === 'x') {
            target.removeAttribute('media');
          }
        }
      });
    };
    const observer = new MutationObserver(mutationHandler);
    observer.observe(document.head, {
      subtree: true,
      attributeFilter: ['media'],
    });
    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    // Scroll whenever the page is changed
    setViewPortWidth(window.innerWidth);
    document.addEventListener('resize', () => {
      setViewPortWidth(window.innerWidth);
    });
  }, []);
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
