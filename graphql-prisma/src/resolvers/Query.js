import getUserId from "../utils/getUserId";

const Query = {
  users(parent, { query }, { prisma }, info) {
    let optArgs = {};
    if (query) {
      optArgs.where = {
        name_contains: query,
      };
    }
    return prisma.query.users(optArgs, info);
  },

  async post(parent, { id }, { prisma, request }, info) {
    const userId = getUserId(request, false);
    const posts = await prisma.query.posts(
      {
        where: {
          id,
          OR: [
            {
              published: true,
            },
            {
              author: {
                id: userId,
              },
            },
          ],
        },
      },
      info
    );
    if (posts.length === 0) throw new Error("Post not found");
    return posts[0];
  },

  posts(parent, { query }, { prisma }, info) {
    let optArgs = {
      where: { published: true },
    };

    if (query) {
      optArgs.where.OR = [
        {
          title_contains: query,
        },
        {
          body_contains: query,
        },
      ];
    }

    return prisma.query.posts(optArgs, info);
  },

  myPosts(parent, { query }, { prisma, request }, info) {
    const userId = getUserId(request);
    let optArgs = {
      where: { author: { id: userId } },
    };

    if (query) {
      optArgs.where.OR = [
        {
          title_contains: query,
        },
        {
          body_contains: query,
        },
      ];
    }

    return prisma.query.posts(optArgs, info);
  },

  comments(parent, args, { prisma }, info) {
    return prisma.query.comments(null, info);
  },
};

export { Query as default };
