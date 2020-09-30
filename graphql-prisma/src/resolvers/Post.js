const Post = {
  author(parent, args, { users }, info) {
    // console.log(parent);
    return users.find((user) => {
      return user.id === parent.author;
    });
  },
  comments(parent, args, { comments }) {
    return comments.filter((comment) => {
      return comment.post === parent.id;
    });
  },
};

export { Post as default };
