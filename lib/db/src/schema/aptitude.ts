import { pgTable, text, serial, timestamp, integer, real, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const aptitudeTestsTable = pgTable("aptitude_tests", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  category: text("category").notNull().default("quantitative"),
  duration: integer("duration").notNull().default(30),
  totalQuestions: integer("total_questions").notNull().default(10),
  difficulty: text("difficulty").notNull().default("medium"),
  description: text("description").notNull().default(""),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const aptitudeQuestionsTable = pgTable("aptitude_questions", {
  id: serial("id").primaryKey(),
  testId: integer("test_id").notNull(),
  question: text("question").notNull(),
  options: text("options").array().notNull().default([]),
  correctOption: integer("correct_option").notNull().default(0),
  explanation: text("explanation"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const aptitudeAttemptsTable = pgTable("aptitude_attempts", {
  id: serial("id").primaryKey(),
  testId: integer("test_id").notNull(),
  status: text("status").notNull().default("in_progress"),
  score: real("score"),
  correctAnswers: integer("correct_answers"),
  totalQuestions: integer("total_questions"),
  timeTaken: integer("time_taken"),
  startedAt: timestamp("started_at", { withTimezone: true }).notNull().defaultNow(),
  completedAt: timestamp("completed_at", { withTimezone: true }),
});

export const insertAptitudeTestSchema = createInsertSchema(aptitudeTestsTable).omit({ id: true, createdAt: true });
export type InsertAptitudeTest = z.infer<typeof insertAptitudeTestSchema>;
export type AptitudeTest = typeof aptitudeTestsTable.$inferSelect;
