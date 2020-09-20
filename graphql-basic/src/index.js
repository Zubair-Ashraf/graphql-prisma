import { GraphQLServer } from "graphql-yoga";

//Type defination (schema)
const typeDefs = `
    type Query {
        me: User!
        post: Post!
    }
    type User {
      id: ID!
      name: String!
      email: String!
      age: Int
    }
    type Post {
      id: ID!
      title: String!
      body: String!
      published: Boolean!
    }
`;

//Resolvers
const resolvers = {
  Query: {
    me() {
      return {
        id: "111",
        name: "zubair",
        email: "zubair8767844@gmail.com",
      };
    },
    post() {
      return {
        id: "1",
        title: "GraphQL",
        body: "This post is related to graphql",
        published: true,
      };
    },
  },
};

const server = new GraphQLServer({ typeDefs, resolvers });
server.start(() => {
  console.log("Server is running");
});
