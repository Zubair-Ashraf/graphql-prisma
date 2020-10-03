import { extractFragmentReplacements } from "prisma-binding";
import User from "./User";
import Post from "./Post";
import Comment from "./Comment";
import Query from "./Query";
import Mutation from "./Mutation";
import Subscription from "./Subscription";

const resolvers = {
  Query,
  Mutation,
  Subscription,
  User,
  Post,
  Comment,
};

const fragmentReplacements = extractFragmentReplacements(resolvers);

export { resolvers, fragmentReplacements };
