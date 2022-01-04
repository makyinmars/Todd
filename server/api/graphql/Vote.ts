import {
  extendType,
  objectType,
  nonNull,
  stringArg,
  inputObjectType,
} from "nexus";

export const Vote = objectType({
  name: "Vote",
  definition(t) {
    t.nonNull.id("id");
    t.field("idea", {
      type: "Idea",
    });
    t.nonNull.id("ideaId");
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

// export const VoteInputType = inputObjectType({
//   name: "VoteInputType",
//   definition(t) {
//     t.nonNull.id("id");
//   },
// });

// export const CreateIdeaInput = inputObjectType({
//   name: "CreateIdeaInput",
//   definition(t) {
//     t.nonNull.id("id");
//     t.nonNull.string("idea");
//     t.nonNull.string("imageUrl");
//   },
// });

// export const VoteMutation = extendType({
//   type: "Mutation",
//   definition(t) {
//     t.nonNull.field("createVote", {
//       type: "Vote",
//       args: {
//         input: nonNull(CreateIdeaInput),

//         where: nonNull(VoteInputType),
//       },
//       resolve(root, args, ctx) {
//         return ctx.db.vote.create({
//           data: {
//             ...args.input,
//             ideaId: args.where.id,
//           },
//         });
//       },
//     });
//   },
// });
