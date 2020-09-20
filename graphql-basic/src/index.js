import { GraphQLServer } from "graphql-yoga";
import uuid from "uuid/v4";

//Dummy Data
let users = [
  { id: "1", name: "Zubair", email: "zubair@gmail.com", age: 26 },
  { id: "2", name: "Bilal", email: "bilal@gmail.com", age: 26 },
  { id: "3", name: "Ayaan", email: "ayaan@gmail.com", age: 5 },
];

let posts = [
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

let comments = [
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
      createUser(data: createUserInput): User!
      deleteUser(id: ID!): User!
      createPost(data: createPostnput): Post!
      deletePost(id: ID!): Post!
      createComment(data: createCommentInput): Comment!
      deleteComment(id: ID!): Comment!
    }

    input createUserInput {
      name: String! 
      email: String!
      age: Int
    }

    input createPostnput {
      title: String! 
      body: String! 
      published: Boolean!
      author: ID!
    }

    input createCommentInput {
      text: String!
      author: ID!
      post: ID!
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
    createUser(parent, { data: { name, email, age } }) {
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

    deleteUser(parent, { id }) {
      const userIndex = users.findIndex((user) => user.id === id);
      if (userIndex === -1) {
        throw new Error("User not found");
      }

      const deletedUser = users.splice(userIndex, 1);

      posts = posts.filter((post) => {
        const match = post.author === id;
        if (match) {
          comments = comments.filter((comment) => comment.post !== post.id);
        }
        return !match;
      });
      comments = comments.filter((comment) => comment.author !== id);

      return deletedUser[0];
    },

    createPost(parent, args) {
      const userExist = users.some((user) => user.id === args.data.author);
      if (!userExist) throw new Error("User doesn't exist");
      const post = {
        id: uuid(),
        ...args.data,
      };

      posts.push(post);

      return post;
    },

    deletePost(parent, { id }) {
      const postIndex = posts.findIndex((post) => post.id === id);
      if (postIndex === -1) throw new Error("Post doesn't exist");
      const deletedPost = posts.slice(postIndex, 1);
      comments = comments.filter((comment) => comment.post !== id);
      return deletedPost[0];
    },

    createComment(parent, args) {
      const userExist = users.some((user) => user.id === args.data.author);
      if (!userExist) throw new Error("User doesn't exist");

      const postExist = posts.some(
        (post) => post.id === args.data.post && post.published
      );

      if (!postExist) throw new Error("Post doesn't exist");

      const comment = {
        id: uuid(),
        ...args.data,
      };

      comments.push(comment);

      return comment;
    },

    deleteComment(parent, { id }) {
      const commentIndex = comments.findIndex((comment) => comment.id === id);
      if (commentIndex === -1) throw new Error("Comment doesn't exist");
      const deletedComment = comments.splice(commentIndex, 1);
      return deletedComment[0];
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
