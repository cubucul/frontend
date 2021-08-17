import Head from 'next/head';
import { Provider } from 'react-redux';
import { useStore } from '../store';
import Layout from '../components/common/layout';
import '../styles/index.css';

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0" />
        <title>React Podcasts</title>
      </Head>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </>
  );
}

export default MyApp;
