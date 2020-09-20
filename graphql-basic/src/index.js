import { GraphQLServer } from "graphql-yoga";

//Type defination (schema)
const typeDefs = `
    type Query {
        hello: String!
        name: String!
        bio: String!
        city: String!
    }
`;

//Resolvers
const resolvers = {
  Query: {
    hello() {
      return "Hello World";
    },
    name() {
      return "Zubair Ashraf";
    },
    bio() {
      return "Full Stack Web Developer";
    },
    city() {
      return "Wah cantt, Pakistan";
    },
  },
};

const server = new GraphQLServer({ typeDefs, resolvers });
server.start(() => {
  console.log("Server is running");
});
