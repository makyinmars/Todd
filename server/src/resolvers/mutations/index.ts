import { mutationField, nullable } from "nexus";
import { Idea } from "../models";

export const voteIdea = mutationField("voteIdea", {
  type: nullable(Idea),
  resolve: async (_root, _args, _ctx) => {
    return null;
  },
});
