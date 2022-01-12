import { objectType } from "nexus";

// Idea
export const Idea = objectType({
  name: "Idea",
  definition(t) {
    t.id("id");
    t.string("title");
    t.string("content");
    t.string("imageUrl");
    t.nonNull.list.nonNull.field("votes", {
      type: Vote,
      resolve: async (root, _args, ctx) => {
        return ctx.prisma.idea
          .findUnique({
            where: {
              id: root.id,
            },
            rejectOnNotFound: true,
          })
          .votes();
      },
    });
  },
});

// Vote
export const Vote = objectType({
  name: "Vote",
  definition(t) {
    t.id("id");
    t.string("ideaId");
    t.nonNull.field("idea", {
      type: Idea,
      resolve: async (root, _args, ctx) => {
        return ctx.prisma.idea.findUnique({
          where: {
            id: root.ideaId,
          },
          rejectOnNotFound: true,
        });
      },
    });
  },
});
