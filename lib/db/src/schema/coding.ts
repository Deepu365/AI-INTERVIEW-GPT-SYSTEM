import { pgTable, text, serial, timestamp, real, boolean, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const codingQuestionsTable = pgTable("coding_questions", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  difficulty: text("difficulty").notNull().default("easy"),
  topic: text("topic").notNull(),
  description: text("description").notNull(),
  examples: text("examples").notNull().default("[]"),
  company: text("company"),
  starterCode: text("starter_code"),
  successRate: real("success_rate"),
  tags: text("tags").array().notNull().default([]),
  isSolved: boolean("is_solved").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const codingSubmissionsTable = pgTable("coding_submissions", {
  id: serial("id").primaryKey(),
  questionId: integer("question_id").notNull(),
  code: text("code").notNull(),
  language: text("language").notNull(),
  passed: boolean("passed").notNull().default(false),
  score: real("score").notNull().default(0),
  timeComplexity: text("time_complexity").notNull().default("O(n)"),
  spaceComplexity: text("space_complexity").notNull().default("O(1)"),
  feedback: text("feedback").notNull().default(""),
  testCasesPassed: integer("test_cases_passed").notNull().default(0),
  totalTestCases: integer("total_test_cases").notNull().default(5),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertCodingQuestionSchema = createInsertSchema(codingQuestionsTable).omit({ id: true, createdAt: true });
export type InsertCodingQuestion = z.infer<typeof insertCodingQuestionSchema>;
export type CodingQuestion = typeof codingQuestionsTable.$inferSelect;
