import { app } from "./app.js";
import { pool } from "./db/pool.js";
import { env } from "./config/env.js";
import { waitForDb } from "./lib/waitForDb.js";

const start = async () => {
  try {
    await waitForDb(pool);

    const server = app.listen(env.PORT, () => {
      console.log(`🚀 Server running on port ${env.PORT}`);
    });

    const shutdown = async () => {
      console.log("🛑 Shutting down server...");

      server.close(async () => {
        await pool.end();
        console.log("✅ Server & DB closed");
        process.exit(0);
      });
    };

    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
};

start();
