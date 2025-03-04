import db from "./index";
import { sql } from "drizzle-orm";

const clearDatabase = async () => {
  try {
    console.log("Clearing database...");
    await db.execute(sql`DROP SCHEMA IF EXISTS auth CASCADE;`);
    await db.execute(sql`DROP SCHEMA IF EXISTS public CASCADE;`);
    await db.execute(sql`CREATE SCHEMA auth;`);
    await db.execute(sql`CREATE SCHEMA public;`);
    console.log("Database cleared and schemas recreated successfully.");
  } catch (error) {
    console.error("Error clearing database:", error);
  } finally {
    process.exit();
  }
};

clearDatabase();
