import { objectType, extendType, stringArg, intArg, nonNull } from "nexus";

export const Idea = objectType({
  name: "Idea",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("idea");
    t.nonNull.string("imageUrl");
  },
});

export const IdeaQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.field("ideas", {
      type: nonNull("Idea"),
      resolve(_root, _args, ctx) {
        return ctx.db.idea.findMany({});
      },
    });

    t.field("idea", {
      type: "Idea",
      args: {
        id: nonNull(intArg()),
      },
      resolve(_root, args, ctx) {
        return ctx.db.idea.findUnique({
          where: {
            id: args.id,
          },
        });
      },
    });
  },
});

export const IdeaMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createIdea", {
      type: "Idea",
      args: {
        idea: nonNull(stringArg()),
        imageUrl: nonNull(stringArg()),
      },
      resolve(_root, args, ctx) {
        const idea = {
          idea: args.idea,
          imageUrl: args.imageUrl,
        };

        return ctx.db.idea.create({ data: idea });
      },
    });
  },
});
