import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import express from "express";
import http from "http";

import { schema } from "./schema";
import { createContext } from "./context";

async function startApolloServer() {
  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    schema,
    context: createContext,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  server.applyMiddleware({ app, path: "/api" });

  const PORT = process.env.PORT || 4000;

  await new Promise<void>((resolve) => {
    httpServer.listen({ port: PORT });
    resolve();
  });

  console.log(`Server is running ${PORT}${server.graphqlPath}`);
}

startApolloServer();
