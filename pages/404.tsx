import classes from '../styles/404-page.module.scss';
import Head from 'next/head';

const NotFound = () => {
  return (
    <main className={classes.container}>
      <Head>
        <title>Not Found</title>
      </Head>
      <h1>404: Page Not Found!</h1>
    </main>
  );
};

export default NotFound;
