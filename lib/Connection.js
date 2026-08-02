import mongoose from "mongoose";

// In serverless (Vercel), each function invocation may run in a fresh
// container, and multiple invocations can run concurrently. A naive
// `readyState` check races across cold starts and can leave commands
// buffering until they time out. We cache the connection promise on the
// Node global so it is reused across invocations within a warm container.
let cached = global._mongoose;
if (!cached) {
  cached = global._mongoose = { conn: null, promise: null };
}

const Connection = async () => {
  if (cached.conn) return cached.conn;

  if (!process.env.connectionString) {
    throw new Error(
      "Missing `connectionString` environment variable. Set it in the Vercel project settings for the Production/Preview environment."
    );
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(process.env.connectionString, {
        // Fail fast instead of hanging the whole function if the DB is
        // unreachable (e.g. Atlas IP allowlist blocking Vercel).
        serverSelectionTimeoutMS: 10000,
        // Don't buffer commands while (re)connecting in serverless.
        bufferCommands: false,
      })
      .then((m) => m)
      .catch((error) => {
        // Reset so the next invocation can retry a fresh connection.
        cached.promise = null;
        throw error;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

export default Connection;
