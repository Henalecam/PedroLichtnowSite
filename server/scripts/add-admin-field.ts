import { sql } from "drizzle-orm";
import { db } from "../db";

async function addAdminField() {
  console.log("Adding isAdmin field to users table...");

  try {
    // Adicionar campo isAdmin se não existir
    await db.execute(sql`
      ALTER TABLE users 
      ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT false NOT NULL;
    `);

    console.log("isAdmin field added successfully!");
  } catch (error) {
    console.error("Error adding isAdmin field:", error);
    process.exit(1);
  }
}

// Execute migration
addAdminField().catch(console.error);