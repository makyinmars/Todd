import superjson from "superjson";

import { createRouter } from "./context";
import { ideaRouter } from "./idea";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("idea.", ideaRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
