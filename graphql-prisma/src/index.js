import { GraphQLServer, PubSub } from "graphql-yoga";
import db from "./db";
import {
  Post,
  User,
  Comment,
  Query,
  Mutation,
  Subscription,
} from "./resolvers";
import prisma from "./prisma";

const pubsub = new PubSub();

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers: {
    Query,
    Mutation,
    Subscription,
    User,
    Post,
    Comment,
  },
  context: {
    users: db.users,
    posts: db.posts,
    comments: db.comments,
    pubsub,
    prisma,
  },
});
server.start(() => {
  console.log("Server is running");
});
