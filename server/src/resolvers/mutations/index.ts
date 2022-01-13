import { mutationField, nonNull, nullable } from "nexus";
import { CreateIdeaInput, VoteIdeaWhereUniqueInput } from "../inputs";
import { Idea, Vote } from "../models";

export const voteIdea = mutationField("voteIdea", {
  type: nullable(Vote),
  args: {
    where: nonNull(VoteIdeaWhereUniqueInput),
  },
  resolve: async (_root, args, ctx) => {
    return ctx.prisma.vote.create({
      data: {
        ideaId: args.where.ideaId,
      },
    });
  },
});

export const createIdea = mutationField("createIdea", {
  type: nullable(Idea),
  args: {
    input: nonNull(CreateIdeaInput),
  },
  resolve: async (_root, args, ctx) => {
    return ctx.prisma.idea.create({
      data: {
        ...args.input,
      },
    });
  },
});
