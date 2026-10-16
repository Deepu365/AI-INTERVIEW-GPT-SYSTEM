import { Router } from "express";
import { db, mockInterviewsTable, activityItemsTable } from "@workspace/db";
import { eq, desc } from "drizzle-orm";
import { evaluateWithMCP } from "../services/mcp-evaluator";

import {
  StartMockInterviewBody,
  SubmitMockAnswerBody,
} from "@workspace/api-zod";

const TECHNICAL_QUESTIONS = [
  "Explain the difference between process and thread. How does context switching work?",
  "What is the time complexity of common sorting algorithms? When would you use each?",
  "Describe a challenging technical problem you solved. What was your approach?",
  "How would you design a URL shortener like bit.ly? Walk me through your architecture.",
  "Explain how garbage collection works in modern programming languages.",
];

const HR_QUESTIONS = [
  "Tell me about yourself and your background.",
  "What is your greatest professional achievement and why?",
  "Describe a time you faced a significant conflict with a teammate. How did you handle it?",
  "Where do you see yourself in 5 years?",
  "Why are you leaving your current position?",
];

const MIXED_QUESTIONS = [...TECHNICAL_QUESTIONS.slice(0, 3),...HR_QUESTIONS.slice(0, 2)];

type Interview = typeof mockInterviewsTable.$inferSelect;
type Answer = { questionIndex: number; answer: string };

function mapInterview(m: Interview) {
  return {
    id: m.id,
    type: m.type,
    status: m.status,
    overallScore: m.overallScore?? null,
    technicalScore: m.technicalScore?? null,
    communicationScore: m.communicationScore?? null,
    confidenceScore: m.confidenceScore?? null,
    problemSolvingScore: m.problemSolvingScore?? null,
    strengths: m.strengths?? [],
    weaknesses: m.weaknesses?? [],
    recommendations: m.recommendations?? [],
    questionsAnswered: m.questionsAnswered,
    totalQuestions: m.totalQuestions,
    currentQuestion: m.currentQuestion?? null,
    createdAt: m.createdAt.toISOString(),
    completedAt: m.completedAt? m.completedAt.toISOString() : null,
  };
}

const router = Router();

router.get("/mock-interviews", async (_req, res) => {
  try {
    const interviews = await db
  .select()
  .from(mockInterviewsTable)
  .orderBy(desc(mockInterviewsTable.createdAt));
    res.json(interviews.map(mapInterview));
  } catch (err) {
    console.error("Failed to list mock interviews", err);
    res.status(500).json({ error: "Failed to list mock interviews" });
  }
});

router.post("/mock-interviews", async (req, res) => {
  try {
    const body = StartMockInterviewBody.safeParse(req.body);
    if (!body.success) {
      res.status(400).json({ error: "Invalid request", issues: body.error.issues });
      return;
    }
    const { type, difficulty, targetCompany } = body.data;
    const questions =
      type === "technical"? TECHNICAL_QUESTIONS : type === "hr"? HR_QUESTIONS : MIXED_QUESTIONS;

    const inserted = await db
  .insert(mockInterviewsTable)
  .values({
        type,
        status: "in_progress",
        difficulty: difficulty?? "medium",
        targetCompany: targetCompany?? null,
        totalQuestions: questions.length,
        questionsAnswered: 0,
        currentQuestion: questions[0],
        questions,
        answers: [],
      })
  .returning();

    res.status(201).json(mapInterview(inserted[0]));
  } catch (err) {
    console.error("Failed to start mock interview", err);
    res.status(500).json({ error: "Failed to start mock interview" });
  }
});

router.get("/mock-interviews/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      res.status(400).json({ error: "Invalid id" });
      return;
    }

    const interviews = await db.select().from(mockInterviewsTable).where(eq(mockInterviewsTable.id, id));
    if (!interviews.length) {
      res.status(404).json({ error: "Interview not found" });
      return;
    }
    res.json(mapInterview(interviews[0]));
  } catch (err) {
    console.error("Failed to get mock interview", err);
    res.status(500).json({ error: "Failed to get mock interview" });
  }
});

router.post("/mock-interviews/:id/answer", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const body = SubmitMockAnswerBody.safeParse(req.body);
    if (Number.isNaN(id) ||!body.success) {
      res.status(400).json({ error: "Invalid request" });
      return;
    }

    const interviews = await db.select().from(mockInterviewsTable).where(eq(mockInterviewsTable.id, id));
    if (!interviews.length) {
      res.status(404).json({ error: "Interview not found" });
      return;
    }

    const interview = interviews[0];
    if (interview.status === "completed") {
      res.status(400).json({ error: "Interview already completed" });
      return;
    }

    const questions: string[] = interview.questions?? [];
    const answers: Answer[] = interview.answers?? [];

    if (body.data.questionIndex < 0 || body.data.questionIndex >= questions.length) {
      res.status(400).json({ error: "Invalid questionIndex" });
      return;
    }

    const existingIdx = answers.findIndex((a) => a.questionIndex === body.data.questionIndex);
    if (existingIdx!== -1) {
      answers[existingIdx] = { questionIndex: body.data.questionIndex, answer: body.data.answer };
    } else {
      answers.push({ questionIndex: body.data.questionIndex, answer: body.data.answer });
    }

    const nextIndex = body.data.questionIndex + 1;
    const isComplete = nextIndex >= questions.length;
    const nextQuestion = isComplete? null : questions[nextIndex];

    const feedbacks = [
      "Good answer! Try to be more specific with examples.",
      "Strong response. Consider using the STAR method for structure.",
      "Clear explanation. Quantify your impact for a stronger answer.",
    ];

    await db
  .update(mockInterviewsTable)
  .set({
        questionsAnswered: answers.length,
        currentQuestion: nextQuestion,
        answers,
      })
  .where(eq(mockInterviewsTable.id, id));

    res.json({
      isComplete,
      nextQuestion,
      questionIndex: nextIndex,
      feedback: feedbacks[Math.floor(Math.random() * feedbacks.length)],
    });
  } catch (err) {
    console.error("Failed to submit mock answer", err);
    res.status(500).json({ error: "Failed to submit mock answer" });
  }
});

router.post("/mock-interviews/:id/complete", async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      res.status(400).json({ error: "Invalid id" });
      return;
    }

    const interviews = await db.select().from(mockInterviewsTable).where(eq(mockInterviewsTable.id, id));
    if (!interviews.length) {
      res.status(404).json({ error: "Interview not found" });
      return;
    }

    const interview = interviews[0];
    if (interview.status === "completed") {
      res.status(400).json({ error: "Interview already completed" });
      return;
    }

    const questions: string[] = interview.questions?? [];
    const answers: Answer[] = interview.answers?? [];

    const aiResult = await evaluateWithMCP({
      type: interview.type,
      difficulty: interview.difficulty,
      targetCompany: interview.targetCompany,
      questions,
      answers,
    });

    const updated = await db
  .update(mockInterviewsTable)
  .set({
        status: "completed",
        overallScore: aiResult.overallScore?? 0,
        technicalScore: aiResult.technicalScore?? 0,
        communicationScore: aiResult.communicationScore?? 0,
        confidenceScore: aiResult.confidenceScore?? 0,
        problemSolvingScore: aiResult.problemSolvingScore?? 0,
        strengths: aiResult.strengths?? [],
        weaknesses: aiResult.weaknesses?? [],
        recommendations: aiResult.recommendations?? [],
        completedAt: new Date(),
      })
  .where(eq(mockInterviewsTable.id, id))
  .returning();

    await db.insert(activityItemsTable).values({
      type: "mock",
      description: `Completed ${interview.type} mock interview`,
      score: aiResult.overallScore?? 0,
    });

    res.json(mapInterview(updated[0]));
  } catch (err) {
    console.error("Failed to complete mock interview", err);
    res.status(500).json({ error: "Failed to complete mock interview" });
  }
});

export default router; 