import { createRouter } from "./context";
import { z } from "zod";
import { Prisma } from "@prisma/client";
import { prisma } from "@/server/db/client";
import { TRPCError } from "@trpc/server";

const defaultIdeaSelect = Prisma.validator<Prisma.IdeaSelect>()({
  id: true,
  title: true,
  content: true,
  imageUrl: true,
  votes: true,
  createdAt: true,
  updatedAt: true,
});

export const ideaRouter = createRouter()
  .query("getIdeas", {
    async resolve() {
      const ideas = await prisma.idea.findMany({
        select: defaultIdeaSelect,
      });
      if (ideas) {
        return ideas;
      } else {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `Could not get trips`,
        });
      }
    },
  })
  .query("getIdeasByVotes", {
    async resolve() {
      // Get ideas sorted by votes
      const ideas = await prisma.idea.findMany({
        select: defaultIdeaSelect,
        orderBy: {
          votes: "desc",
        },
      });

      if (ideas) {
        return ideas;
      }
    },
  })
  .mutation("createIdea", {
    input: z.object({
      title: z.string(),
      content: z.string(),
      imageUrl: z.string(),
      votes: z.number(),
    }),
    async resolve({ input }) {
      const idea = await prisma.idea.create({
        data: input,
        select: defaultIdeaSelect,
      });

      return idea;
    },
  })
  .mutation("updateVote", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input }) {
      const idea = await prisma.idea.findFirstOrThrow({
        where: { id: input.id },
      });

      if (idea) {
        const updatedIdea = await prisma.idea.update({
          where: { id: input.id },
          data: {
            votes: idea.votes + 1,
          },
        });

        return updatedIdea;
      }
    },
  });
