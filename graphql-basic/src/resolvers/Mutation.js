const Mutation = {
  createUser(parent, { data: { name, email, age } }, { users }) {
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

  deleteUser(parent, { id }, { users }) {
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

  createPost(parent, args, { posts, users }) {
    const userExist = users.some((user) => user.id === args.data.author);
    if (!userExist) throw new Error("User doesn't exist");
    const post = {
      id: uuid(),
      ...args.data,
    };

    posts.push(post);

    return post;
  },

  deletePost(parent, { id }, { posts, comments }) {
    const postIndex = posts.findIndex((post) => post.id === id);
    if (postIndex === -1) throw new Error("Post doesn't exist");
    const deletedPost = posts.slice(postIndex, 1);
    comments = comments.filter((comment) => comment.post !== id);
    return deletedPost[0];
  },

  createComment(parent, args, { users, posts, comments }) {
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

  deleteComment(parent, { id }, { comments }) {
    const commentIndex = comments.findIndex((comment) => comment.id === id);
    if (commentIndex === -1) throw new Error("Comment doesn't exist");
    const deletedComment = comments.splice(commentIndex, 1);
    return deletedComment[0];
  },
};

export { Mutation as default };
