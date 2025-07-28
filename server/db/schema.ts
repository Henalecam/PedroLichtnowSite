import { sql } from "drizzle-orm";
import { text, timestamp, pgTable, uuid, boolean } from "drizzle-orm/pg-core";
import { InferModel } from "drizzle-orm";

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