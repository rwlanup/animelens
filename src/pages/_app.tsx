import '../styles/globals.css';
import '@fontsource/jost/400.css';
import '@fontsource/jost/600.css';
import CssBaseline from '@mui/material/CssBaseline';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../theme';
import { RootLayout } from '../layouts/RootLayout';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '../util/apollo-client';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ApolloProvider client={apolloClient}>
        <RootLayout>
          <Component {...pageProps} />
        </RootLayout>
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default MyApp;
