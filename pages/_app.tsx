import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import { useEffect } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Scroll whenever the page is changed
    const viewPortWidth = window.innerWidth;

    const element = document.querySelector<HTMLDivElement>('main')!;

    if (viewPortWidth >= 640) {
      element.scrollTop = 0;
    }

    // Highlight code blocks
    element.querySelectorAll<HTMLDivElement>('pre > code').forEach(code => {
      hljs.highlightBlock(code);
    });
  }, [Component]);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
export default MyApp;
