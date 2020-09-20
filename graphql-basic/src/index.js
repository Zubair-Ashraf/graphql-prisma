import { GraphQLServer } from "graphql-yoga";

//Dummy Data
const users = [
  { id: 1, name: "Zubair", email: "zubair@gmail.com", age: 26 },
  { id: 2, name: "Bilal", email: "bilal@gmail.com", age: 26 },
  { id: 3, name: "Ayaan", email: "ayaan@gmail.com", age: 5 },
];

const posts = [
  {
    id: 1,
    title: "GraphQL",
    body: "This post is for graphql",
    published: true,
    author: 1,
  },
  {
    id: 2,
    title: "React.js",
    body: "This post is for reactjs",
    published: false,
    author: 1,
  },
  {
    id: 3,
    title: "Node.js",
    body: "This post is for nodejs",
    published: true,
    author: 2,
  },
];

//Type defination (schema)
const typeDefs = `
    type Query {
      greeting(name: String): String!
      add(numbers: [Float!]!): Float!
      users(query :String): [User!]!
      posts(query: String): [Post!]!
    }
    type User {
      id: ID!
      name: String!
      email: String!
      age: Int
      posts: [Post!]!
    }
    type Post {
      id: ID!
      title: String!
      body: String!
      published: Boolean!
      author: User!
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
    posts(parent, { query }) {
      if (!query) return posts;
      else {
        return posts.filter(
          (post) =>
            post.title
              .toLocaleLowerCase()
              .includes(query.toLocaleLowerCase()) ||
            post.body.toLocaleLowerCase().includes(query.toLocaleLowerCase())
        );
      }
    },
  },
  Post: {
    author(parent, args, ctx, info) {
      return users.find((user) => {
        return user.id === parent.author;
      });
    },
  },
  User: {
    posts(parent, args, ctx, info) {
      return posts.filter((post) => {
        return post.author === parent.id;
      });
    },
  },
};

const server = new GraphQLServer({ typeDefs, resolvers });
server.start(() => {
  console.log("Server is running");
});
