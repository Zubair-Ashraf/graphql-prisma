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
  posts(parent, { query }, { prisma }, info) {
    let optArgs = {};
    if (query) {
      optArgs.where = {
        OR: [
          {
            title_contains: query,
          },
          {
            body_contains: query,
          },
        ],
      };
    }
    return prisma.query.posts(optArgs, info);
  },
  comments(parent, args, { prisma }, info) {
    return prisma.query.comments(null, info);
  },
};

export { Query as default };
