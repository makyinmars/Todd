import { objectType } from "nexus";

// Idea
export const Idea = objectType({
  name: "Idea",
  definition(t) {
    t.id("id");
    t.string("content");
    t.string("imageUrl");
  },
});

// Vote
export const Vote = objectType({
  name: "Vote",
  definition(t) {
    t.id("id");
    t.string("ideaId");
  },
});
