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
  },
});
server.start(() => {
  console.log("Server is running");
});
