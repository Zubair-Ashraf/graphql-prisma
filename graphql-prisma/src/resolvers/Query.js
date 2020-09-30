const Query = {
  greeting(parent, args, ctx, info) {
    const { name } = args;
    return `Hello ${name}`;
  },
  add(parent, { numbers }, ctx, info) {
    return numbers.reduce((a, c) => {
      return a + c;
    });
  },
  users(parent, { query }, { users }) {
    if (!query) return users;
    else {
      return users.filter((user) =>
        user.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
      );
    }
  },
  posts(parent, { query }, { posts }) {
    if (!query) return posts;
    else {
      return posts.filter(
        (post) =>
          post.title.toLocaleLowerCase().includes(query.toLocaleLowerCase()) ||
          post.body.toLocaleLowerCase().includes(query.toLocaleLowerCase())
      );
    }
  },
  comments(parent, args, { comments }) {
    return comments;
  },
};

export { Query as default };
