import { GraphQLServer } from "graphql-yoga";
import uuid from "uuid/v4";
import db from "./db";
import { Post, User, Comment, Query, Mutation } from "./resolvers";

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers: {
    Query,
    Mutation,
    User,
    Post,
    Comment,
  },
  context: {
    users: db.users,
    posts: db.posts,
    comments: db.comments,
  },
});
server.start(() => {
  console.log("Server is running");
});
