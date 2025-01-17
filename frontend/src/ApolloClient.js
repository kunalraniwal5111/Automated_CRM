import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

// Wrapping our app with apolloclient
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql', 
  cache: new InMemoryCache(),
});

export { client, ApolloProvider };
