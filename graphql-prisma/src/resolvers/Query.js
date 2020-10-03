import getUserId from "../utils/getUserId";

const Query = {
  users(parent, { query, first, skip, orderBy }, { prisma }, info) {
    let optArgs = { first, skip, orderBy };
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

  posts(parent, { query, first, skip, orderBy }, { prisma }, info) {
    let optArgs = {
      first,
      skip,
      orderBy,
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

  myPosts(parent, { query, first, skip, orderBy }, { prisma, request }, info) {
    const userId = getUserId(request);
    let optArgs = {
      first,
      skip,
      orderBy,
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

  comments(parent, { first, skip, orderBy }, { prisma }, info) {
    let optArgs = {
      first,
      skip,
      orderBy,
    };
    return prisma.query.comments(optArgs, info);
  },
};

export { Query as default };
