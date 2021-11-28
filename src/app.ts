// eslint-disable-next-line node/no-extraneous-import
import "reflect-metadata";

import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import session, { Cookie } from "express-session";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

import { makeCXNtoDB } from "./config";
import { HelloResolver } from "./resolvers/hello";
import { UserResolver } from "./resolvers/user";
import { COOKIE_NAME, mongoSecret, session_db_pass, session_db_username, __prod__ } from "./utils/constants";
import { TContext } from "./types/context";

// --- Config + Initiate server ---
dotenv.config();
const port = process.env.PORT_NUMBER_HERE || 4000;

const app = express();

// --- Top Lv Middlewares ---
app.use(express.json());
app.use(morgan(":method :url :status :res[content-length] - :response-time ms"));
app.use(cors());

const startBackend = async (): Promise<void> => {
  // --- Sessions/Cookies ---
  const mongoCXNURL = `mongodb+srv://${session_db_username}:${session_db_pass}@learningcluster0.c6v16.mongodb.net/posty?retryWrites=true&w=majority`;
  await mongoose.connect(mongoCXNURL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });
  console.log("MongoDB connected.");

  app.use(
    session({
      name: COOKIE_NAME,
      store: MongoStore.create({ mongoUrl: mongoCXNURL }),
      cookie: {
        maxAge: 1000 * 60 * 60, // 1h
        httpOnly: true, // FE can't access the cookie ???
        secure: __prod__, // cookie only works in https
        sameSite: "lax" // protection against CSRF
      },
      secret: mongoSecret,
      saveUninitialized: false, // don't save empty session right from start
      resave: false
    })
  );

  // --- GraphQL Server ---
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, UserResolver],
      validate: false
    }),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    context: ({ req, res }: TContext): TContext => ({ req, res })
  });

  await apolloServer.start();

  // ? let apolloServer consume express server ?
  apolloServer.applyMiddleware({ app, cors: false });
};

// --- Sessions/Cookies ---
const startMongoDB = async (): Promise<void> => {
  const mongoCXNURL = `mongodb+srv://${session_db_username}:${session_db_pass}@learningcluster0.c6v16.mongodb.net/posty?retryWrites=true&w=majority`;
  await mongoose.connect(mongoCXNURL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });
  console.log("MongoDB connected.");

  app.use(
    session({
      name: COOKIE_NAME,
      store: MongoStore.create({ mongoUrl: mongoCXNURL }),
      cookie: {
        maxAge: 1000 * 60 * 60, // 1h
        httpOnly: true, // FE can't access the cookie ???
        secure: __prod__, // cookie only works in https
        sameSite: "lax" // protection against CSRF
      },
      secret: mongoSecret,
      saveUninitialized: false, // don't save empty session right from start
      resave: false
    })
  );
  console.log("express-session server chay truoc");
};

// --- GraphQL Server ---
const startGraphQLServer = async (): Promise<void> => {
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, UserResolver],
      validate: false
    }),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    context: ({ req, res }: TContext): TContext => ({ req, res })
  });

  await apolloServer.start();

  // ? let apolloServer consume express server ?
  apolloServer.applyMiddleware({ app, cors: false });
  console.log("graphql server chay truoc");
};

// startMongoDB();
// startGraphQLServer();
// makeCXNtoDB();

startBackend();
makeCXNtoDB();

// --- Run server ---
app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
