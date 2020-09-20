import { GraphQLServer } from "graphql-yoga";

//Dummy Data
const users = [
  { id: 1, name: "Zubair", email: "zubair@gmail.com", age: 26 },
  { id: 2, name: "Bilal", email: "bilal@gmail.com", age: 26 },
  { id: 3, name: "Ayaan", email: "ayaan@gmail.com", age: 5 },
];

//Type defination (schema)
const typeDefs = `
    type Query {
      greeting(name: String): String!
      add(numbers: [Float!]!): Float!
      users(query :String): [User!]!
    }
    type User {
      id: ID!
      name: String!
      email: String!
      age: Int
    }
`;

//Resolvers
const resolvers = {
  Query: {
    greeting(parent, args, ctx, info) {
      const { name } = args;
      return `Hello ${name}`;
    },
    add(parent, { numbers }, ctx, info) {
      return numbers.reduce((a, c) => {
        return a + c;
      });
    },
    users(parent, { query }) {
      if (!query) return users;
      else {
        return users.filter((user) =>
          user.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
        );
      }
    },
  },
};

const server = new GraphQLServer({ typeDefs, resolvers });
server.start(() => {
  console.log("Server is running");
});
