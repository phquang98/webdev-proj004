// eslint-disable-next-line node/no-extraneous-import
import "reflect-metadata";

import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

import { makeCXNtoDB } from "./config";
import { HelloResolver } from "./resolvers/hello";
import { UserResolver } from "./resolvers/user";

// --- Config + Initiate server ---
dotenv.config();
const port = process.env.PORT_NUMBER_HERE || 4000;
const app = express();

// --- Top Lv Middlewares ---
app.use(express.json());
app.use(morgan(":method :url :status :res[content-length] - :response-time ms"));
app.use(cors());

// --- GraphQL Server ---
const startGraphQLServer = async () => {
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, UserResolver],
      validate: false
    }),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()]
  });

  await apolloServer.start();

  // ? let apolloServer consume express server ?
  apolloServer.applyMiddleware({ app, cors: false });
};

startGraphQLServer();

// --- Run server ---
app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});

makeCXNtoDB();
