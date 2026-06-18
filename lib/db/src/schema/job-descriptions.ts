import { pgTable, text, serial, timestamp, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const jobDescriptionsTable = pgTable("job_descriptions", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  company: text("company").notNull(),
  content: text("content"),
  matchScore: real("match_score").notNull().default(0),
  requiredSkills: text("required_skills").array().notNull().default([]),
  missingSkills: text("missing_skills").array().notNull().default([]),
  matchedSkills: text("matched_skills").array().notNull().default([]),
  experienceRequired: text("experience_required"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertJobDescriptionSchema = createInsertSchema(jobDescriptionsTable).omit({ id: true, createdAt: true });
export type InsertJobDescription = z.infer<typeof insertJobDescriptionSchema>;
export type JobDescription = typeof jobDescriptionsTable.$inferSelect;
