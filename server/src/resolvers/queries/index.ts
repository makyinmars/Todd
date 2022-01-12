import { nonNull, queryField, list, nullable } from "nexus";

import { Idea, Vote } from "..";
import { IdeaWhereUniqueInput, VoteWhereUniqueInput } from "../inputs";

export const ideas = queryField("ideas", {
  type: nullable(list(nonNull(Idea))),
  resolve: async (_root, _args, ctx) => {
    return ctx.prisma.idea.findMany({});
  },
});

export const idea = queryField("idea", {
  type: nullable(Idea),
  args: {
    where: nonNull(IdeaWhereUniqueInput),
  },
  resolve: async (_root, args, ctx) => {
    return ctx.prisma.idea.findUnique({
      where: {
        id: args.where.id,
      },
    });
  },
});

export const votes = queryField("votes", {
  type: nullable(list(nonNull(Vote))),
  resolve: async (_root, _args, ctx) => {
    return ctx.prisma.vote.findMany({});
  },
});

export const vote = queryField("vote", {
  type: nullable(Vote),
  args: {
    where: nonNull(VoteWhereUniqueInput),
  },
  resolve: async (_root, args, ctx) => {
    return ctx.prisma.vote.findUnique({
      where: {
        id: args.where.id,
      },
    });
  },
});
