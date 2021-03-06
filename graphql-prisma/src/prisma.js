import { Prisma } from "prisma-binding";
import { fragmentReplacements } from "./resolvers";

const prisma = new Prisma({
  typeDefs: "src/generated/prisma.graphql",
  endpoint: process.env.PRISMA_ENDPOINT,
  secret: "thisissecretkey",
  fragmentReplacements,
});

export { prisma as default };

// prisma.query.users(null, "{ id name email }").then((data) => {
//   console.log(data);
// });

// const createPostForUser = async (authorId, data) => {
//   const post = await prisma.mutation.createPost(
//     {
//       data: {
//         ...data,
//         author: {
//           connect: {
//             id: authorId,
//           },
//         },
//       },
//     },
//     "{id}"
//   );
//   const user = await prisma.query.user(
//     {
//       where: {
//         id: authorId,
//       },
//     },
//     "{id name email posts {id title published}}"
//   );
//   return user;
// };

// createPostForUser("ckfp1txy6002z0723iv44g0zk", {
//   title: "Graete books to read",
//   body: "The war of Art",
//   published: true,
// }).then((user) => {
//   console.log(JSON.stringify(user, undefined, 2));
// });
