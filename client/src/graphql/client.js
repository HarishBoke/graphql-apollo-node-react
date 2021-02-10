import { ApolloClient } from '@apollo/client';
import { getMainDefinition } from 'apollo-utilities';
import { ApolloLink, split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { InMemoryCache } from 'apollo-cache-inmemory';
import config from './../config';


console.log('baseURL', config)
console.log('port', process.env.BASE_URL)
const httpLink = new HttpLink({
  // uri: `http://${baseURL}:${port}/graphql`,
  uri: `https://affectionate-bartik-a46c9e.netlify.app/graphql`,
});

const wsLink = new WebSocketLink({
  uri: `ws://affectionate-bartik-a46c9e.netlify.app/graphql`,
  options: {
    reconnect: true,
  },
});

const terminatingLink = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return (
      kind === 'OperationDefinition' && operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const link = ApolloLink.from([terminatingLink]);

const cache = new InMemoryCache();

const client = new ApolloClient({
  link,
  cache,
});

export default client;