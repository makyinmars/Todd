import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: `https://todd-server.herokuapp.com/api`,
  cache: new InMemoryCache(),
});
