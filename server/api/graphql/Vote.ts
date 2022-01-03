import {
  extendType,
  objectType,
  nonNull,
  stringArg,
  list,
  extendInputType,
} from "nexus";

export const Vote = objectType({
  name: "Vote",
  definition(t) {
    t.nonNull.string("id");
    t.field("idea", {
      type: "Idea",
    });
    t.nonNull.int("ideaId");
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

export const VoteMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createVote", {
      type: "Vote",
      args: {
        ideaId: (),
      },
      resolve(_root, args, ctx) {
        return ctx.db.vote.create({
          data: args.idea,
        });
      },
    });
  },
});
