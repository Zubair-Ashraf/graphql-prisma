"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var users = [{ id: "1", name: "Zubair", email: "zubair@gmail.com", age: 26 }, { id: "2", name: "Bilal", email: "bilal@gmail.com", age: 26 }, { id: "3", name: "Ayaan", email: "ayaan@gmail.com", age: 5 }];

var posts = [{
  id: "1",
  title: "GraphQL",
  body: "This post is for graphql",
  published: true,
  author: "1"
}, {
  id: "2",
  title: "React.js",
  body: "This post is for reactjs",
  published: false,
  author: "1"
}, {
  id: "3",
  title: "Node.js",
  body: "This post is for nodejs",
  published: true,
  author: "2"
}];

var comments = [{
  id: "1",
  text: "This lecture is so tuff",
  author: "1",
  post: "1"
}, {
  id: "2",
  text: "React js is so awesome",
  author: "2",
  post: "3"
}, {
  id: "3",
  text: "Node js comment",
  author: "3",
  post: "3"
}];

var db = { users: users, posts: posts, comments: comments };
exports.default = db;