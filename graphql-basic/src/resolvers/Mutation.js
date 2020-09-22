import uuid from "uuid/v4";

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

  updateUser(parent, { id, data: { name, email, age } }, { users }) {
    const user = users.find((user) => user.id === id);
    if (!user) throw new Error("User doesnot exist");
    const emailAlreadyExist = users.some((user) => user.email === email);
    if (emailAlreadyExist) throw new Error("Email already exist");
    if (typeof email === "string") user.email = email;
    if (typeof name === "string") user.name = name;
    if (typeof age !== "undefined") user.age = age;
    return user;
  },

  createPost(parent, args, { posts, users, pubsub }) {
    const userExist = users.some((user) => user.id === args.data.author);
    if (!userExist) throw new Error("User doesn't exist");
    const post = {
      id: uuid(),
      ...args.data,
    };

    posts.push(post);

    if (args.data.published)
      pubsub.publish("post", {
        post: {
          data: post,
          mutation: "CREATED",
        },
      });

    return post;
  },

  deletePost(parent, { id }, { posts, comments, pubsub }) {
    const postIndex = posts.findIndex((post) => post.id === id);
    if (postIndex === -1) throw new Error("Post doesn't exist");
    const [post] = posts.slice(postIndex, 1);
    comments = comments.filter((comment) => comment.post !== id);

    pubsub.publish("post", {
      post: {
        mutation: "DELETED",
        data: post,
      },
    });

    return post;
  },

  updatePost(
    parent,
    { id, data: { title, body, published } },
    { posts, pubsub }
  ) {
    const post = posts.find((post) => post.id === id);
    const originalPost = { ...post };
    if (!post) throw new Error("Post doesn't exist");
    if (typeof title === "string") post.title = title;
    if (typeof body === "string") post.body = body;
    if (typeof published === "boolean") {
      post.published = published;
      if (originalPost.published && !post.published) {
        //Deleted
        pubsub.publish("post", {
          post: {
            data: originalPost,
            mutation: "DELETED",
          },
        });
      } else if (!originalPost.published && post.published) {
        //Craeted
        pubsub.publish("post", {
          post: {
            data: post,
            mutation: "CREATED",
          },
        });
      }
    } else {
      //Updated
      pubsub.publish("post", {
        post: {
          data: post,
          mutation: "UPDATED",
        },
      });
    }
    return post;
  },

  createComment(parent, args, { users, posts, comments, pubsub }) {
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

    pubsub.publish(`comment ${args.data.post}`, { comment });

    comments.push(comment);

    return comment;
  },

  deleteComment(parent, { id }, { comments }) {
    const commentIndex = comments.findIndex((comment) => comment.id === id);
    if (commentIndex === -1) throw new Error("Comment doesn't exist");
    const deletedComment = comments.splice(commentIndex, 1);
    return deletedComment[0];
  },

  updateComment(parent, { id, text }, { comments }) {
    const comment = comments.find((comment) => comment.id === id);
    if (!comment) throw new Error("Comment doesn't exist");
    if (typeof text === "string") comment.text = text;
    return comment;
  },
};

export { Mutation as default };
