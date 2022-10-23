import type { NextPage } from 'next';
import Head from 'next/head';
import { ErrorScreen } from '../components/error/ErrorScreen';

const Custom404Page: NextPage = () => {
  return (
    <>
      <Head>
        <title>404 Page not found | Animelens</title>
      </Head>
      <ErrorScreen status={404} />;
    </>
  );
};

export default Custom404Page;
