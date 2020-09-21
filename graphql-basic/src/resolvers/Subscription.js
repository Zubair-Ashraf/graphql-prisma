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
  comment: {
    subscribe(parent, { postId }, { posts, pubsub }, info) {
      const post = posts.find((post) => post.id === postId && post.published);
      if (!post) throw new Error("Post not found");
      return pubsub.asyncIterator(`comment ${postId}`);
    },
  },
};

export { Subscription as default };
