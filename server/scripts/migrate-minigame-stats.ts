import { db } from "../db";
import { sql } from "drizzle-orm";

async function migrateMinigameStats() {
  console.log("🚀 Starting minigame statistics migration...");

  try {
    // 1. Update the participation_status_enum if it exists to remove 'completed'
    console.log("📝 Updating participation status enum...");
    await db.execute(sql`
      -- First, update any 'completed' values to 'inactive'
      UPDATE participations 
      SET status = 'inactive' 
      WHERE status = 'completed';
    `).catch(() => {
      console.log("⚠️  No participations table found or no 'completed' status to update");
    });

    // 2. Create or recreate the enum with correct values
    await db.execute(sql`
      -- Drop the old enum if it exists
      DROP TYPE IF EXISTS participation_status_enum CASCADE;
      
      -- Create the new enum
      CREATE TYPE participation_status_enum AS ENUM ('active', 'inactive', 'pending');
    `);

    // 3. Create participations table if it doesn't exist
    console.log("📝 Creating participations table...");
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS participations (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        user_id UUID NOT NULL REFERENCES users(id),
        campaign_id UUID NOT NULL REFERENCES campaigns(id),
        quantity INTEGER NOT NULL DEFAULT 0,
        status participation_status_enum NOT NULL DEFAULT 'active',
        created_at TIMESTAMP DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW() NOT NULL
      );
    `);

    // 4. Create minigame_participations table
    console.log("📝 Creating minigame_participations table...");
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS minigame_participations (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        user_id UUID NOT NULL REFERENCES users(id),
        minigame_id UUID NOT NULL REFERENCES minigames(id),
        campaign_id UUID NOT NULL REFERENCES campaigns(id),
        score INTEGER NOT NULL DEFAULT 0,
        numbers JSONB NOT NULL DEFAULT '[]'::jsonb,
        play_duration INTEGER,
        metadata JSONB DEFAULT '{}'::jsonb,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL
      );
    `);

    // 5. Create minigame_statistics table
    console.log("📝 Creating minigame_statistics table...");
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS minigame_statistics (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        user_id UUID NOT NULL REFERENCES users(id),
        minigame_id UUID NOT NULL REFERENCES minigames(id),
        campaign_id UUID NOT NULL REFERENCES campaigns(id),
        
        -- General statistics
        total_plays INTEGER NOT NULL DEFAULT 0,
        total_score INTEGER NOT NULL DEFAULT 0,
        average_score DECIMAL(10, 2) NOT NULL DEFAULT 0,
        
        -- Number statistics
        highest_number INTEGER,
        lowest_number INTEGER,
        most_frequent_number INTEGER,
        lucky_numbers JSONB DEFAULT '[]'::jsonb,
        all_numbers_played JSONB DEFAULT '{}'::jsonb,
        
        -- Performance statistics
        best_score INTEGER NOT NULL DEFAULT 0,
        worst_score INTEGER,
        current_streak INTEGER NOT NULL DEFAULT 0,
        best_streak INTEGER NOT NULL DEFAULT 0,
        last_played_at TIMESTAMP,
        
        -- Time statistics
        total_play_time INTEGER NOT NULL DEFAULT 0,
        average_play_time DECIMAL(10, 2) NOT NULL DEFAULT 0,
        
        created_at TIMESTAMP DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW() NOT NULL,
        
        -- Unique constraint to ensure one record per user per minigame
        UNIQUE(user_id, minigame_id)
      );
    `);

    // 6. Create campaign_statistics table
    console.log("📝 Creating campaign_statistics table...");
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS campaign_statistics (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        campaign_id UUID NOT NULL REFERENCES campaigns(id),
        minigame_id UUID REFERENCES minigames(id),
        
        -- Global statistics
        total_participants INTEGER NOT NULL DEFAULT 0,
        total_plays INTEGER NOT NULL DEFAULT 0,
        
        -- Number statistics across all users
        global_most_played_number INTEGER,
        global_least_played_number INTEGER,
        number_distribution JSONB DEFAULT '{}'::jsonb,
        
        -- Performance
        global_best_score INTEGER NOT NULL DEFAULT 0,
        global_best_user_id UUID REFERENCES users(id),
        average_score_all_users DECIMAL(10, 2) NOT NULL DEFAULT 0,
        
        last_updated_at TIMESTAMP DEFAULT NOW() NOT NULL,
        
        -- Unique constraint
        UNIQUE(campaign_id, minigame_id)
      );
    `);

    // 7. Create indexes for better performance
    console.log("📝 Creating indexes...");
    await db.execute(sql`
      -- Indexes for participations
      CREATE INDEX IF NOT EXISTS idx_participations_user_campaign 
        ON participations(user_id, campaign_id);
      CREATE INDEX IF NOT EXISTS idx_participations_status 
        ON participations(status);
      
      -- Indexes for minigame_participations
      CREATE INDEX IF NOT EXISTS idx_minigame_participations_user 
        ON minigame_participations(user_id);
      CREATE INDEX IF NOT EXISTS idx_minigame_participations_minigame 
        ON minigame_participations(minigame_id);
      CREATE INDEX IF NOT EXISTS idx_minigame_participations_created 
        ON minigame_participations(created_at DESC);
      
      -- Indexes for minigame_statistics
      CREATE INDEX IF NOT EXISTS idx_minigame_stats_user_minigame 
        ON minigame_statistics(user_id, minigame_id);
      CREATE INDEX IF NOT EXISTS idx_minigame_stats_best_score 
        ON minigame_statistics(best_score DESC);
      
      -- Indexes for campaign_statistics
      CREATE INDEX IF NOT EXISTS idx_campaign_stats_campaign 
        ON campaign_statistics(campaign_id);
    `);

    // 8. Create update trigger for updated_at columns
    console.log("📝 Creating update triggers...");
    await db.execute(sql`
      -- Create function if not exists
      CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated_at = NOW();
        RETURN NEW;
      END;
      $$ language 'plpgsql';
      
      -- Create triggers
      DROP TRIGGER IF EXISTS update_participations_updated_at ON participations;
      CREATE TRIGGER update_participations_updated_at 
        BEFORE UPDATE ON participations 
        FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
      
      DROP TRIGGER IF EXISTS update_minigame_statistics_updated_at ON minigame_statistics;
      CREATE TRIGGER update_minigame_statistics_updated_at 
        BEFORE UPDATE ON minigame_statistics 
        FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    `);

    console.log("✅ Migration completed successfully!");
  } catch (error) {
    console.error("❌ Migration failed:", error);
    throw error;
  }
}

// Run the migration
migrateMinigameStats()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));