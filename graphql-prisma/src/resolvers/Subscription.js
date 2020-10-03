import getUserId from "../utils/getUserId";

const Subscription = {
  count: {
    subscribe(parent, args, { pubsub }, info) {
      let count = 0;

      setInterval(() => {
        count++;
        pubsub.publish("count", { count });
      }, 2000);

      return pubsub.asyncIterator("count");
    },
  },

  myPost: {
    subscribe(parent, { postId }, { prisma, request }, info) {
      const userId = getUserId(request);
      return prisma.subscription.post(
        {
          where: {
            node: {
              author: {
                id: userId,
              },
            },
          },
        },
        info
      );
    },
  },

  comment: {
    subscribe(parent, { postId }, { prisma, pubsub }, info) {
      return prisma.subscription.comment(
        {
          where: {
            node: {
              post: {
                id: postId,
              },
            },
          },
        },
        info
      );
    },
  },
  post: {
    subscribe(parent, args, { prisma, pubsub }, info) {
      return prisma.subscription.post(
        {
          where: {
            node: {
              published: true,
            },
          },
        },
        info
      );
    },
  },
};

export { Subscription as default };
