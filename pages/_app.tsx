import "@yosefbeder/design-system/index.css";
import "../index.css";
import "../material-dark.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import Head from "next/head";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import useFlashFix from "../hooks/useFlashFix";
import { css } from "styled-components";
import "@yosefbeder/design-system/colors/slate.css";
import { breakPoints } from "@yosefbeder/design-system/constants";

export const routeTransitions = {
  hidden: { opacity: 0, y: 60 },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "backOut" },
  },
  exit: {
    opacity: 0,
    x: 60,
    transition: { duration: 0.35, ease: "backIn" },
  },
};

export const mainSharedStyles = css`
  flex: 1;
  padding: var(--space-4);
  overflow-y: scroll;
  height: 100vh;

  @media (max-width: ${breakPoints.sm}px) {
    height: fit-content;
  }
`;

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

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
      <Component {...pageProps} key={router.route} />
    </Layout>
  );
}
export default MyApp;
