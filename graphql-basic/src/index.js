import { GraphQLServer } from "graphql-yoga";

//Type defination (schema)
const typeDefs = `
    type Query {
        greeting(name: String): String!
    }
`;

//Resolvers
const resolvers = {
  Query: {
    greeting(parent, args, ctx, info) {
      const { name } = args;
      return `Hello ${name}`;
    },
  },
};

const server = new GraphQLServer({ typeDefs, resolvers });
server.start(() => {
  console.log("Server is running");
});
