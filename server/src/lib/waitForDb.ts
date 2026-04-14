import { Pool } from "pg";

export const waitForDb = async (pool: Pool) => {
  let connected = false;

  while (!connected) {
    try {
      await pool.query("SELECT 1");
      connected = true;
      console.log("✅ DB is ready");
    } catch {
      console.log("⏳ Waiting for DB...");
      await new Promise((res) => setTimeout(res, 2000));
    }
  }
};
