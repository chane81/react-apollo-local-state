import { withClientState } from 'apollo-link-state';
import { ApolloClient, ApolloLink, InMemoryCache } from 'apollo-boost'
//import { HttpLink } from 'apollo-boost'
import { defaults, resolvers } from './resolvers'

const cache = new InMemoryCache();

// const httpLink = new HttpLink({
//  uri: 'http://127.0.0.1:4000/graphql'
// });

const stateLink = withClientState({
  cache,
  defaults,
  resolvers
});

/** httpLink 도 같이 쓴다면 아래 link: ~ 부분에 [stateLink, httpLink] 로 추가할 것 */
const client = new ApolloClient({
  link: ApolloLink.from([stateLink]),
  cache,
  resolvers
});

export default client;
