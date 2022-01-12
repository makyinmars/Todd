import { mutationField, nonNull, nullable } from "nexus";
import { VoteIdeaWhereUniqueInput } from "../inputs";
import { Vote } from "../models";

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
