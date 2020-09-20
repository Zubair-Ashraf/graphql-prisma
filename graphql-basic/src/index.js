import { GraphQLServer } from "graphql-yoga";

//Type defination (schema)
const typeDefs = `
    type Query {
        hello: String!
    }
`;

//Resolvers
const resolvers = {
  Query: {
    hello() {
      return "Hello World";
    },
  },
};

const server = new GraphQLServer({ typeDefs, resolvers });
server.start(() => {
  console.log("Server is running");
});
