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

  async deleteUser(parent, {}, { prisma, request }, info) {
    const userId = getUserId(request);
    const userExist = await prisma.exists.User({ id: userId });
    if (!userExist) throw new Error("User not found");
    return prisma.mutation.deleteUser({ where: { id: userId } }, info);
  },

  async updateUser(
    parent,
    { data: { name, email } },
    { prisma, request },
    info
  ) {
    const userId = getUserId(request);
    const userExist = await prisma.exists.User({ id: userId });
    if (!userExist) throw new Error("User not found");
    return prisma.mutation.updateUser(
      { where: { id: userId }, data: { name, email } },
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
          author: { connect: { id: userId } },
        },
      },
      info
    );
  },

  async deletePost(parent, { id }, { prisma, request }, info) {
    const userId = getUserId(request);
    const postExist = await prisma.exists.Post({ id, author: { id: userId } });
    if (!postExist) throw new Error("Unable to delete post");
    return prisma.mutation.deletePost({ where: { id } }, info);
  },

  async updatePost(
    parent,
    { id, data: { title, body, published } },
    { prisma, request },
    info
  ) {
    const userId = getUserId(request);
    const postExist = await prisma.exists.Post({ id, author: { id: userId } });
    if (!postExist) throw new Error("Post not found");
    return prisma.mutation.updatePost(
      { where: { id }, data: { title, body, published } },
      info
    );
  },

  createComment(
    parent,
    { data: { text, author, post } },
    { prisma, request },
    info
  ) {
    const userId = getUserId(request);
    return prisma.mutation.createComment(
      {
        data: {
          text,
          author: { connect: { id: userId } },
          post: { connect: { id: post } },
        },
      },
      info
    );
  },

  async deleteComment(parent, { id }, { prisma, request }, info) {
    const userId = getUserId(request);
    const commentExist = await prisma.exists.Comment({
      id,
      author: { id: userId },
    });
    if (!commentExist) throw new Error("Unable to delete comment");
    return prisma.mutation.deleteComment({ where: { id } }, info);
  },

  async updateComment(parent, { id, text }, { prisma, request }, info) {
    const userId = getUserId(request);
    const commentExist = await prisma.exists.Comment({
      id,
      author: { id: userId },
    });
    if (!commentExist) throw new Error("Unable to update comment");
    return prisma.mutation.updateComment(
      { where: { id }, data: { text } },
      info
    );
  },
};

export { Mutation as default };
