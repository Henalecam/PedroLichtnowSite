import { sql } from "drizzle-orm";
import { db } from "../db";

async function migrateCampaigns() {
  console.log("Starting campaign tables migration...");

  try {
    // Criar tabela de campanhas
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS campaigns (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL,
        description TEXT,
        start_date TIMESTAMP NOT NULL,
        end_date TIMESTAMP NOT NULL,
        is_active BOOLEAN DEFAULT true NOT NULL,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW() NOT NULL
      );
    `);

    // Criar tabela de minigames
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS minigames (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
        name TEXT NOT NULL,
        description TEXT,
        type TEXT NOT NULL,
        config TEXT NOT NULL,
        is_active BOOLEAN DEFAULT true NOT NULL,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW() NOT NULL
      );
    `);

    // Criar tabela de compras de usuários
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS user_purchases (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
        amount TEXT NOT NULL,
        purchase_date TIMESTAMP DEFAULT NOW() NOT NULL,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL
      );
    `);

    // Criar tabela de pontuações de minigames
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS minigame_scores (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        minigame_id UUID NOT NULL REFERENCES minigames(id) ON DELETE CASCADE,
        score TEXT NOT NULL,
        played_at TIMESTAMP DEFAULT NOW() NOT NULL
      );
    `);

    // Criar índices para melhor performance
    await db.execute(sql`
      CREATE INDEX IF NOT EXISTS idx_minigames_campaign_id ON minigames(campaign_id);
      CREATE INDEX IF NOT EXISTS idx_user_purchases_user_id ON user_purchases(user_id);
      CREATE INDEX IF NOT EXISTS idx_user_purchases_campaign_id ON user_purchases(campaign_id);
      CREATE INDEX IF NOT EXISTS idx_minigame_scores_user_id ON minigame_scores(user_id);
      CREATE INDEX IF NOT EXISTS idx_minigame_scores_minigame_id ON minigame_scores(minigame_id);
    `);

    console.log("Campaign tables migration completed successfully!");
  } catch (error) {
    console.error("Error during migration:", error);
    process.exit(1);
  }
}

// Execute migration
migrateCampaigns().catch(console.error);