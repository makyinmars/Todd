import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: `https://todd-server.herokuapp.com/api`,
  // uri: "http://localhost:4000/api",
  cache: new InMemoryCache(),
});
