import Head from 'next/head';
import '../styles/index.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0" />
        <title>React Podcasts</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
