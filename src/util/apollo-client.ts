import { ApolloClient, InMemoryCache } from '@apollo/client';

const ANIME_API_URL = 'https://graphql.anilist.co/';
export const apolloClient = new ApolloClient({
  uri: ANIME_API_URL,
  cache: new InMemoryCache(),
});
