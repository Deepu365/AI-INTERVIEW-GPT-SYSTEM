import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const hrQuestionsTable = pgTable("hr_questions", {
  id: serial("id").primaryKey(),
  question: text("question").notNull(),
  category: text("category").notNull().default("general"),
  tips: text("tips").array().notNull().default([]),
  sampleAnswer: text("sample_answer").notNull().default(""),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertHrQuestionSchema = createInsertSchema(hrQuestionsTable).omit({ id: true, createdAt: true });
export type InsertHrQuestion = z.infer<typeof insertHrQuestionSchema>;
export type HrQuestion = typeof hrQuestionsTable.$inferSelect;
