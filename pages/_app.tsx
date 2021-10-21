import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
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
    transition: { duration: 0.35, ease: 'backOut' },
  },
  exit: {
    opacity: 0,
    x: 60,
    transition: { duration: 0.35, ease: 'backIn' },
  },
};

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const viewPortWidth = useViewPortWidth();

  useFlashFix();

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
      </Head>
      <AnimatePresence
        exitBeforeEnter
        onExitComplete={() => {
          if (viewPortWidth >= 640) {
            document.querySelector('main')!.scrollTop = 0;
          } else {
            document.documentElement.scrollTop = 0;
          }
        }}
      >
        <Component {...pageProps} key={router.route} />
      </AnimatePresence>
    </Layout>
  );
}
export default MyApp;
