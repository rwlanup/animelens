import { ApolloClient, InMemoryCache } from '@apollo/client';

const ANIME_API_URL = 'https://anilist.co/graphiql/';
export const client = new ApolloClient({
  uri: ANIME_API_URL,
  cache: new InMemoryCache(),
});
