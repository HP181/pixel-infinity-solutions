import { createSchema, createYoga } from "graphql-yoga";
import { typeDefs } from "@/lib/graphql/typeDefs";
import { resolvers } from "@/lib/graphql/resolvers";

// Mongoose needs the Node.js runtime (it can't run on Edge),
// and the endpoint must never be statically optimized.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const schema = createSchema({ typeDefs, resolvers });

const { handleRequest } = createYoga({
  schema,
  graphqlEndpoint: "/api/graphql",
  // Use the platform's native Fetch API objects. Without passing Response
  // explicitly, Yoga's response handling can fail on Vercel serverless
  // (404 / empty body) even though it works in local dev.
  fetchAPI: { Response },
});

export {
  handleRequest as GET,
  handleRequest as POST,
  handleRequest as OPTIONS,
};
