import type { NextPage } from 'next';
import Head from 'next/head';
import { ErrorScreen } from '../components/error/ErrorScreen';

const Custom500Page: NextPage = () => {
  return (
    <>
      <Head>
        <title>500 Internal server error | Animelens</title>
      </Head>
      <ErrorScreen status={500} />;
    </>
  );
};

export default Custom500Page;
