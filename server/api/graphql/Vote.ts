import { extendType, objectType, nonNull, stringArg, intArg } from "nexus";

export const Vote = objectType({
  name: "Vote",
  definition(t) {
    t.nonNull.string("id");
    t.field("votedFor", {
      type: "Idea",
    });
    t.field("votedAgainst", {
      type: "Idea",
    });
    t.nonNull.int("votedForId");
    t.nonNull.int("votedAgainstId");
  },
});

export const VoteQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.field("votes", {
      type: nonNull("Vote"),
      resolve(_root, _args, ctx) {
        return ctx.db.vote.findMany({});
      },
    });

    t.field("vote", {
      type: "Vote",
      args: {
        id: nonNull(stringArg()),
      },
      resolve(_root, args, ctx) {
        return ctx.db.vote.findUnique({
          where: {
            id: args.id,
          },
        });
      },
    });
  },
});
