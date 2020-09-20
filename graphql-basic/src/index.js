import { GraphQLServer } from "graphql-yoga";
import uuid from "uuid/v4";

//Dummy Data
const users = [
  { id: "1", name: "Zubair", email: "zubair@gmail.com", age: 26 },
  { id: "2", name: "Bilal", email: "bilal@gmail.com", age: 26 },
  { id: "3", name: "Ayaan", email: "ayaan@gmail.com", age: 5 },
];

const posts = [
  {
    id: "1",
    title: "GraphQL",
    body: "This post is for graphql",
    published: true,
    author: "1",
  },
  {
    id: "2",
    title: "React.js",
    body: "This post is for reactjs",
    published: false,
    author: "1",
  },
  {
    id: "3",
    title: "Node.js",
    body: "This post is for nodejs",
    published: true,
    author: "2",
  },
];

const comments = [
  {
    id: "1",
    text: "This lecture is so tuff",
    author: "1",
    post: "1",
  },
  {
    id: "2",
    text: "React js is so awesome",
    author: "2",
    post: "3",
  },
  {
    id: "3",
    text: "Node js comment",
    author: "3",
    post: "3",
  },
];

//Type defination (schema)
const typeDefs = `
    type Query {
      greeting(name: String): String!
      add(numbers: [Float!]!): Float!
      users(query :String): [User!]!
      posts(query: String): [Post!]!
      comments: [Comment!]!
    }
    type Mutation {
      createUser(name: String!, email: String!, age: Int): User!
      createPost(title: String!, body: String!, published: Boolean!, author: ID!): Post!
      createComment(text: String!, author: ID!, post: ID!): Comment!
    }
    type User {
      id: ID!
      name: String!
      email: String!
      age: Int
      posts: [Post!]!
      comments: [Comment!]!
    }
    type Post {
      id: ID!
      title: String!
      body: String!
      published: Boolean!
      author: User!
      comments: [Comment!]!
    }
    type Comment {
      id: ID!
      text: String!
      author: User!
      post: Post!
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
    comments(parent, args) {
      return comments;
    },
  },
  Mutation: {
    createUser(parent, { name, email, age }) {
      const emailExist = users.some((user) => user.email === email);
      if (emailExist) throw new Error("Email already registered");
      const user = {
        id: uuid(),
        name,
        email,
        age,
      };
      users.push(user);
      return user;
    },
    createPost(parent, { title, body, published, author }) {
      const userExist = users.some((user) => user.id === author);
      if (!userExist) throw new Error("User doesn't exist");
      const post = {
        id: uuid(),
        title,
        body,
        published,
        author,
      };

      posts.push(post);

      return post;
    },
    createComment(parent, { text, author, post: postId }) {
      const userExist = users.some((user) => user.id === author);
      if (!userExist) throw new Error("User doesn't exist");

      const postExist = posts.some(
        (post) => post.id === postId && post.published
      );

      if (!postExist) throw new Error("Post doesn't exist");

      const comment = {
        id: uuid(),
        text,
        author,
        post: postId,
      };

      comments.push(comment);

      return comment;
    },
  },
  Post: {
    author(parent, args, ctx, info) {
      // console.log(parent);
      return users.find((user) => {
        return user.id === parent.author;
      });
    },
    comments(parent, args) {
      return comments.filter((comment) => {
        return comment.post === parent.id;
      });
    },
  },
  User: {
    posts(parent, args, ctx, info) {
      return posts.filter((post) => {
        return post.author === parent.id;
      });
    },
    comments(parent) {
      return comments.filter((comment) => {
        return comment.author === parent.id;
      });
    },
  },
  Comment: {
    author(parent, args) {
      return users.find((user) => {
        return user.id === parent.author;
      });
    },
    post(parent, args) {
      return posts.find((post) => {
        return post.id === parent.post;
      });
    },
  },
};

const server = new GraphQLServer({ typeDefs, resolvers });
server.start(() => {
  console.log("Server is running");
});
