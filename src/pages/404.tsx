import type { NextPage } from 'next';
import { ErrorScreen } from '../components/error/ErrorScreen';

const Custom404Page: NextPage = () => {
  return <ErrorScreen status={500} />;
};

export default Custom404Page;
