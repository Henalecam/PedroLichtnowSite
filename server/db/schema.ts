import { sql } from "drizzle-orm";
import { text, timestamp, pgTable, uuid, boolean } from "drizzle-orm/pg-core";
import { InferModel } from "drizzle-orm";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
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