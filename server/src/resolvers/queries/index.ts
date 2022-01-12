import { nonNull, queryField, list, nullable } from "nexus";
import { Idea, Vote } from "..";

export const ideas = queryField("ideas", {
  type: nullable(list(nonNull(Idea))),
  resolve: async (_root, _args, _ctx) => {
    return [];
  },
});

export const idea = queryField("idea", {
  type: nullable(Idea),
  resolve: async (_root, _args, _ctx) => {
    return null;
  },
});

export const votes = queryField("votes", {
  type: nullable(list(nonNull(Vote))),
  resolve: async (_root, _args, _ctx) => {
    return [];
  },
});

export const vote = queryField("vote", {
  type: nullable(Vote),
  resolve: async (_root, _args, _ctx) => {
    return null;
  },
});
