import { inputObjectType } from "nexus";

export const IdeaWhereUniqueInput = inputObjectType({
  name: "IdeaWhereUniqueInput",
  definition(t) {
    t.nonNull.id("id");
  },
});

export const VoteWhereUniqueInput = inputObjectType({
  name: "VoteWhereUniqueInput",
  definition(t) {
    t.nonNull.id("id");
  },
});

export const VoteIdeaWhereUniqueInput = inputObjectType({
  name: "VoteIdeaWhereUniqueInput",
  definition(t) {
    t.nonNull.string("ideaId");
  },
});

// export const CreateIdeaInput = inputObjectType({
//   name: "CreateIdeaInput",
//   definition(t) {
//     t.nonNull.string("title");
//     t.nonNull.string("content");
//     t.nonNull.string("imageUrl");
//   },
// });
