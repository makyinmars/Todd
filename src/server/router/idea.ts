import { createRouter } from "./context";
import { z } from "zod";
import { Prisma } from "@prisma/client";
import { prisma } from "@/server/db/client";
import { TRPCError } from "@trpc/server/dist/declarations/src";

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
  .mutation("addVote", {
    input: z.object({
      id: z.string(),
      votes: z.number(),
    }),
    async resolve({ input }) {
      const ideaUpdated = await prisma.idea.update({
        where: {
          id: input.id,
        },
        data: {
          votes: input.votes,
        },
      });

      return ideaUpdated;
    },
  });
