import { pgTable, text, serial, timestamp, real, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const mockInterviewsTable = pgTable("mock_interviews", {
  id: serial("id").primaryKey(),
  type: text("type").notNull().default("technical"),
  status: text("status").notNull().default("in_progress"),
  difficulty: text("difficulty").notNull().default("medium"),
  targetCompany: text("target_company"),
  overallScore: real("overall_score"),
  technicalScore: real("technical_score"),
  communicationScore: real("communication_score"),
  confidenceScore: real("confidence_score"),
  problemSolvingScore: real("problem_solving_score"),
  strengths: text("strengths").array().notNull().default([]),
  weaknesses: text("weaknesses").array().notNull().default([]),
  recommendations: text("recommendations").array().notNull().default([]),
  questionsAnswered: integer("questions_answered").notNull().default(0),
  totalQuestions: integer("total_questions").notNull().default(5),
  currentQuestion: text("current_question"),
  questions: text("questions").notNull().default("[]"),
  answers: text("answers").notNull().default("[]"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  completedAt: timestamp("completed_at", { withTimezone: true }),
});

export const insertMockInterviewSchema = createInsertSchema(mockInterviewsTable).omit({ id: true, createdAt: true, completedAt: true });
export type InsertMockInterview = z.infer<typeof insertMockInterviewSchema>;
export type MockInterview = typeof mockInterviewsTable.$inferSelect;
