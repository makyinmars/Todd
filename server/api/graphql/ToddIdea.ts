import { objectType, nonNull } from "nexus";

export const ToddIdea = objectType({
  name: "ToddIdea",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("idea");
    t.nonNull.string("imageUrl");
  },
});
