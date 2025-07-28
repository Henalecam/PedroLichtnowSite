import { sql } from "drizzle-orm";
import { text, timestamp, pgTable, uuid, boolean, integer, pgEnum, decimal, jsonb } from "drizzle-orm/pg-core";
import { InferModel } from "drizzle-orm";

// Enums
export const participationStatusEnum = pgEnum("participation_status_enum", ["active", "inactive", "pending"]);

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  isAdmin: boolean("is_admin").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const posts = pgTable("posts", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  content: text("content").notNull(),
  excerpt: text("excerpt"),
  status: text("status", { enum: ["draft", "published"] }).notNull().default("draft"),
  featuredImage: text("featured_image"),
  authorId: uuid("author_id").references(() => users.id).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  publishedAt: timestamp("published_at"),
});

export const categories = pgTable("categories", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const postsToCategories = pgTable("posts_to_categories", {
  postId: uuid("post_id").references(() => posts.id).notNull(),
  categoryId: uuid("category_id").references(() => categories.id).notNull(),
});

// Type exports
export type User = InferModel<typeof users>;
export type NewUser = InferModel<typeof users, "insert">;

export type Post = InferModel<typeof posts>;
export type NewPost = InferModel<typeof posts, "insert">;

export type Category = InferModel<typeof categories>;
export type NewCategory = InferModel<typeof categories, "insert">;

export type PostToCategory = InferModel<typeof postsToCategories>;
export type NewPostToCategory = InferModel<typeof postsToCategories, "insert">;

// Campaigns
export const campaigns = pgTable("campaigns", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Minigames
export const minigames = pgTable("minigames", {
  id: uuid("id").defaultRandom().primaryKey(),
  campaignId: uuid("campaign_id").references(() => campaigns.id).notNull(),
  name: text("name").notNull(),
  description: text("description"),
  type: text("type").notNull(), // quiz, memory, puzzle, etc
  config: text("config").notNull(), // JSON string with game configuration
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// User purchases
export const userPurchases = pgTable("user_purchases", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id).notNull(),
  campaignId: uuid("campaign_id").references(() => campaigns.id).notNull(),
  amount: text("amount").notNull(), // Storing as text to avoid precision issues
  purchaseDate: timestamp("purchase_date").defaultNow().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Minigame scores
export const minigameScores = pgTable("minigame_scores", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id).notNull(),
  minigameId: uuid("minigame_id").references(() => minigames.id).notNull(),
  score: text("score").notNull(),
  playedAt: timestamp("played_at").defaultNow().notNull(),
});

// Type exports for campaigns
export type Campaign = InferModel<typeof campaigns>;
export type NewCampaign = InferModel<typeof campaigns, "insert">;

export type Minigame = InferModel<typeof minigames>;
export type NewMinigame = InferModel<typeof minigames, "insert">;

export type UserPurchase = InferModel<typeof userPurchases>;
export type NewUserPurchase = InferModel<typeof userPurchases, "insert">;

export type MinigameScore = InferModel<typeof minigameScores>;
export type NewMinigameScore = InferModel<typeof minigameScores, "insert">; 

// Participations
export const participations = pgTable("participations", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id).notNull(),
  campaignId: uuid("campaign_id").references(() => campaigns.id).notNull(),
  quantity: integer("quantity").notNull().default(0),
  status: participationStatusEnum("status").notNull().default("active"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Minigame Participations (stores each participation/play)
export const minigameParticipations = pgTable("minigame_participations", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id).notNull(),
  minigameId: uuid("minigame_id").references(() => minigames.id).notNull(),
  campaignId: uuid("campaign_id").references(() => campaigns.id).notNull(),
  score: integer("score").notNull().default(0),
  numbers: jsonb("numbers").$type<number[]>().notNull().default([]), // Array of numbers chosen
  playDuration: integer("play_duration"), // Duration in seconds
  metadata: jsonb("metadata").$type<Record<string, any>>().default({}), // Additional game data
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Minigame Statistics (aggregated data per user per minigame)
export const minigameStatistics = pgTable("minigame_statistics", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id).notNull(),
  minigameId: uuid("minigame_id").references(() => minigames.id).notNull(),
  campaignId: uuid("campaign_id").references(() => campaigns.id).notNull(),
  
  // General statistics
  totalPlays: integer("total_plays").notNull().default(0),
  totalScore: integer("total_score").notNull().default(0),
  averageScore: decimal("average_score", { precision: 10, scale: 2 }).notNull().default("0"),
  
  // Number statistics
  highestNumber: integer("highest_number"),
  lowestNumber: integer("lowest_number"),
  mostFrequentNumber: integer("most_frequent_number"),
  luckyNumbers: jsonb("lucky_numbers").$type<number[]>().default([]), // Top 5 most played numbers
  allNumbersPlayed: jsonb("all_numbers_played").$type<Record<number, number>>().default({}), // Map of number -> count
  
  // Performance statistics
  bestScore: integer("best_score").notNull().default(0),
  worstScore: integer("worst_score"),
  currentStreak: integer("current_streak").notNull().default(0),
  bestStreak: integer("best_streak").notNull().default(0),
  lastPlayedAt: timestamp("last_played_at"),
  
  // Time statistics
  totalPlayTime: integer("total_play_time").notNull().default(0), // in seconds
  averagePlayTime: decimal("average_play_time", { precision: 10, scale: 2 }).notNull().default("0"),
  
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Campaign Statistics (global statistics per campaign)
export const campaignStatistics = pgTable("campaign_statistics", {
  id: uuid("id").defaultRandom().primaryKey(),
  campaignId: uuid("campaign_id").references(() => campaigns.id).notNull(),
  minigameId: uuid("minigame_id").references(() => minigames.id),
  
  // Global statistics
  totalParticipants: integer("total_participants").notNull().default(0),
  totalPlays: integer("total_plays").notNull().default(0),
  
  // Number statistics across all users
  globalMostPlayedNumber: integer("global_most_played_number"),
  globalLeastPlayedNumber: integer("global_least_played_number"),
  numberDistribution: jsonb("number_distribution").$type<Record<number, number>>().default({}),
  
  // Performance
  globalBestScore: integer("global_best_score").notNull().default(0),
  globalBestUserId: uuid("global_best_user_id").references(() => users.id),
  averageScoreAllUsers: decimal("average_score_all_users", { precision: 10, scale: 2 }).notNull().default("0"),
  
  lastUpdatedAt: timestamp("last_updated_at").defaultNow().notNull(),
});

// Type exports for new tables
export type Participation = InferModel<typeof participations>;
export type NewParticipation = InferModel<typeof participations, "insert">;

export type MinigameParticipation = InferModel<typeof minigameParticipations>;
export type NewMinigameParticipation = InferModel<typeof minigameParticipations, "insert">;

export type MinigameStatistic = InferModel<typeof minigameStatistics>;
export type NewMinigameStatistic = InferModel<typeof minigameStatistics, "insert">;

export type CampaignStatistic = InferModel<typeof campaignStatistics>;
export type NewCampaignStatistic = InferModel<typeof campaignStatistics, "insert">; 