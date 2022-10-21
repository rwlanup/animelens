import type { NextPage } from 'next';
import { ErrorScreen } from '../components/error/ErrorScreen';

const Custom500Page: NextPage = () => {
  return <ErrorScreen status={500} />;
};

export default Custom500Page;
