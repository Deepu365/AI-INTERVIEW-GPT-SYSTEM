import { pgTable, text, serial, timestamp, real, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const resumesTable = pgTable("resumes", {
  id: serial("id").primaryKey(),
  fileName: text("file_name").notNull(),
  content: text("content"),
  atsScore: real("ats_score").notNull().default(0),
  skills: text("skills").array().notNull().default([]),
  missingSkills: text("missing_skills").array().notNull().default([]),
  suggestions: text("suggestions").array().notNull().default([]),
  keywordScore: real("keyword_score").notNull().default(0),
  formattingScore: real("formatting_score").notNull().default(0),
  relevanceScore: real("relevance_score").notNull().default(0),
  targetRole: text("target_role"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const resumeSuggestionsTable = pgTable("resume_suggestions", {
  id: serial("id").primaryKey(),
  resumeId: integer("resume_id").notNull(),
  category: text("category").notNull(),
  suggestion: text("suggestion").notNull(),
  priority: text("priority").notNull().default("medium"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertResumeSchema = createInsertSchema(resumesTable).omit({ id: true, createdAt: true });
export type InsertResume = z.infer<typeof insertResumeSchema>;
export type Resume = typeof resumesTable.$inferSelect;
