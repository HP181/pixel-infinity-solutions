import { createSchema } from "graphql-yoga";
import { graphql } from "graphql";
import { typeDefs } from "@/lib/graphql/typeDefs";
import { resolvers } from "@/lib/graphql/resolvers";

// Mongoose needs the Node.js runtime (it can't run on Edge),
// and the endpoint must never be statically optimized.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Build a standard GraphQLSchema once per lambda (reused across warm invocations).
const schema = createSchema({ typeDefs, resolvers });

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

/**
 * Execute a GraphQL operation and return a plain JSON Response.
 *
 * We intentionally execute with the `graphql` package directly instead of
 * exporting graphql-yoga's `handleRequest`. Yoga returns a streaming
 * (ReadableStream) response body which works under `next start` locally but
 * crashes with an empty 500 on Vercel's serverless runtime. Returning a fully
 * buffered JSON Response avoids that adapter entirely.
 */
async function execute({ query, variables, operationName }) {
  if (!query) {
    return Response.json(
      { errors: [{ message: "Missing GraphQL query." }] },
      { status: 400, headers: CORS_HEADERS }
    );
  }

  const result = await graphql({
    schema,
    source: query,
    variableValues: variables,
    operationName,
  });

  return Response.json(result, { status: 200, headers: CORS_HEADERS });
}

export async function POST(request) {
  try {
    const body = await request.json();
    return await execute(body);
  } catch (error) {
    return Response.json(
      { errors: [{ message: error?.message || "Internal Server Error" }] },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query");
    if (!query) {
      // Simple health response for GET without a query.
      return Response.json({ status: "ok" }, { status: 200, headers: CORS_HEADERS });
    }
    const variablesParam = searchParams.get("variables");
    return await execute({
      query,
      variables: variablesParam ? JSON.parse(variablesParam) : undefined,
      operationName: searchParams.get("operationName") || undefined,
    });
  } catch (error) {
    return Response.json(
      { errors: [{ message: error?.message || "Internal Server Error" }] },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}
