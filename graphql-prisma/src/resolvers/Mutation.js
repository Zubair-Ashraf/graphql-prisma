import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getUserId from "../utils/getUserId";

const Mutation = {
  async login(parent, { data: { email, password } }, { prisma }, info) {
    let user = await prisma.query.user({ where: { email } });
    if (!user) throw new Error("No user found");
    const passMatched = await bcrypt.compare(password, user.password);
    if (!passMatched) throw new Error("Invalid credentialds");
    return { user, token: jwt.sign({ userId: user.id }, "thisissecret") };
  },

  async createUser(
    parent,
    { data: { name, email, password } },
    { prisma },
    info
  ) {
    if (password.length < 8) throw new Error("Password is to short.");
    password = await bcrypt.hash(password, 10);
    const emailExist = await prisma.exists.User({ email });
    if (emailExist) {
      throw new Error("This email already exists");
    }
    const user = prisma.mutation.createUser({
      data: { email, name, password },
    });

    return {
      user,
      token: jwt.sign({ userId: user.id }, "thisissecret"),
    };
  },

  async deleteUser(parent, { id }, { prisma }, info) {
    const userExist = await prisma.exists.User({ id });
    if (!userExist) throw new Error("User not found");
    return prisma.mutation.deleteUser({ where: { id } }, info);
  },

  async updateUser(parent, { id, data: { name, email } }, { prisma }, info) {
    const userExist = await prisma.exists.User({ id });
    if (!userExist) throw new Error("User not found");
    return prisma.mutation.updateUser(
      { where: { id }, data: { name, email } },
      info
    );
  },

  createPost(
    parent,
    { data: { title, body, published, author } },
    { prisma, request },
    info
  ) {
    const userId = getUserId(request);
    return prisma.mutation.createPost(
      {
        data: {
          title,
          body,
          published,
          author: { connect: { id: author } },
        },
      },
      info
    );
  },

  async deletePost(parent, { id }, { prisma, pubsub }, info) {
    const postExist = await prisma.exists.Post({ id });
    if (!postExist) throw new Error("Post not found");
    return prisma.mutation.deletePost({ where: { id } }, info);
  },

  async updatePost(
    parent,
    { id, data: { title, body, published } },
    { prisma, pubsub },
    info
  ) {
    const postExist = await prisma.exists.Post({ id });
    if (!postExist) throw new Error("Post not found");
    return prisma.mutation.updatePost(
      { where: { id }, data: { title, body, published } },
      info
    );
  },

  createComment(
    parent,
    { data: { text, author, post } },
    { prisma, pubsub },
    info
  ) {
    return prisma.mutation.createComment(
      {
        data: {
          text,
          author: { connect: { id: author } },
          post: { connect: { id: post } },
        },
      },
      info
    );
  },

  async deleteComment(parent, { id }, { prisma, pubsub }, info) {
    const commentExist = await prisma.exists.Comment({ id });
    if (!commentExist) throw new Error("Comment not found");
    return prisma.mutation.deleteComment({ where: { id } }, info);
  },

  async updateComment(parent, { id, text }, { prisma, pubsub }, info) {
    const commentExist = await prisma.exists.Comment({ id });
    if (!commentExist) throw new Error("Comment not found");
    return prisma.mutation.updateComment(
      { where: { id }, data: { text } },
      info
    );
  },
};

export { Mutation as default };
