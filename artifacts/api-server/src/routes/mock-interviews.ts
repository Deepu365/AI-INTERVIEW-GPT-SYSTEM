import { Router } from "express";
import { db } from "@workspace/db";
import { mockInterviewsTable, activityItemsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import {
  StartMockInterviewBody,
  GetMockInterviewParams,
  SubmitMockAnswerParams,
  SubmitMockAnswerBody,
  CompleteMockInterviewParams,
  CompleteMockInterviewBody,
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

const MIXED_QUESTIONS = [...TECHNICAL_QUESTIONS.slice(0, 3), ...HR_QUESTIONS.slice(0, 2)];

function mapInterview(m: typeof mockInterviewsTable.$inferSelect) {
  return {
    id: m.id,
    type: m.type,
    status: m.status,
    overallScore: m.overallScore ?? null,
    technicalScore: m.technicalScore ?? null,
    communicationScore: m.communicationScore ?? null,
    confidenceScore: m.confidenceScore ?? null,
    problemSolvingScore: m.problemSolvingScore ?? null,
    strengths: m.strengths,
    weaknesses: m.weaknesses,
    recommendations: m.recommendations,
    questionsAnswered: m.questionsAnswered,
    totalQuestions: m.totalQuestions,
    currentQuestion: m.currentQuestion ?? null,
    createdAt: m.createdAt.toISOString(),
    completedAt: m.completedAt ? m.completedAt.toISOString() : null,
  };
}

const router = Router();

router.get("/mock-interviews", async (req, res) => {
  try {
    const interviews = await db.select().from(mockInterviewsTable).orderBy(mockInterviewsTable.createdAt);
    res.json(interviews.map(mapInterview));
  } catch (err) {
    req.log.error({ err }, "Failed to list mock interviews");
    res.status(500).json({ error: "Failed to list mock interviews" });
  }
});

router.post("/mock-interviews", async (req, res) => {
  try {
    const body = StartMockInterviewBody.safeParse(req.body);
    if (!body.success) { res.status(400).json({ error: "Invalid request" }); return; }
    const { type, difficulty, targetCompany } = body.data;
    const questions = type === "technical" ? TECHNICAL_QUESTIONS : type === "hr" ? HR_QUESTIONS : MIXED_QUESTIONS;
    const inserted = await db.insert(mockInterviewsTable).values({
      type,
      status: "in_progress",
      difficulty: difficulty ?? "medium",
      targetCompany: targetCompany ?? null,
      totalQuestions: questions.length,
      questionsAnswered: 0,
      currentQuestion: questions[0],
      questions: JSON.stringify(questions),
      answers: JSON.stringify([]),
    }).returning();
    res.status(201).json(mapInterview(inserted[0]));
  } catch (err) {
    req.log.error({ err }, "Failed to start mock interview");
    res.status(500).json({ error: "Failed to start mock interview" });
  }
});

router.get("/mock-interviews/:id", async (req, res) => {
  try {
    const params = GetMockInterviewParams.safeParse({ id: Number(req.params.id) });
    if (!params.success) { res.status(400).json({ error: "Invalid id" }); return; }
    const interviews = await db.select().from(mockInterviewsTable).where(eq(mockInterviewsTable.id, params.data.id));
    if (!interviews.length) { res.status(404).json({ error: "Interview not found" }); return; }
    res.json(mapInterview(interviews[0]));
  } catch (err) {
    req.log.error({ err }, "Failed to get mock interview");
    res.status(500).json({ error: "Failed to get mock interview" });
  }
});

router.post("/mock-interviews/:id/answer", async (req, res) => {
  try {
    const params = SubmitMockAnswerParams.safeParse({ id: Number(req.params.id) });
    const body = SubmitMockAnswerBody.safeParse(req.body);
    if (!params.success || !body.success) { res.status(400).json({ error: "Invalid request" }); return; }
    const interviews = await db.select().from(mockInterviewsTable).where(eq(mockInterviewsTable.id, params.data.id));
    if (!interviews.length) { res.status(404).json({ error: "Interview not found" }); return; }
    const interview = interviews[0];
    let questions: string[] = [];
    try { questions = JSON.parse(interview.questions); } catch { questions = []; }
    let answers: { questionIndex: number; answer: string }[] = [];
    try { answers = JSON.parse(interview.answers); } catch { answers = []; }
    answers.push({ questionIndex: body.data.questionIndex, answer: body.data.answer });
    const nextIndex = body.data.questionIndex + 1;
    const isComplete = nextIndex >= questions.length;
    const nextQuestion = isComplete ? null : questions[nextIndex];
    const feedbacks = [
      "Good answer! Try to be more specific with examples.",
      "Strong response. Consider using the STAR method for structure.",
      "Clear explanation. Quantify your impact for a stronger answer.",
    ];
    await db.update(mockInterviewsTable).set({
      questionsAnswered: answers.length,
      currentQuestion: nextQuestion,
      answers: JSON.stringify(answers),
    }).where(eq(mockInterviewsTable.id, params.data.id));
    res.json({
      isComplete,
      nextQuestion,
      questionIndex: nextIndex,
      feedback: feedbacks[Math.floor(Math.random() * feedbacks.length)],
    });
  } catch (err) {
    req.log.error({ err }, "Failed to submit mock answer");
    res.status(500).json({ error: "Failed to submit mock answer" });
  }
});

router.post("/mock-interviews/:id/complete", async (req, res) => {
  try {
    const params = CompleteMockInterviewParams.safeParse({ id: Number(req.params.id) });
    const body = CompleteMockInterviewBody.safeParse(req.body);
    if (!params.success || !body.success) { res.status(400).json({ error: "Invalid request" }); return; }
    const interviews = await db.select().from(mockInterviewsTable).where(eq(mockInterviewsTable.id, params.data.id));
    if (!interviews.length) { res.status(404).json({ error: "Interview not found" }); return; }
    const interview = interviews[0];
    const overallScore = Math.round(65 + Math.random() * 30);
    const technicalScore = Math.round(60 + Math.random() * 35);
    const communicationScore = Math.round(70 + Math.random() * 25);
    const confidenceScore = Math.round(65 + Math.random() * 30);
    const problemSolvingScore = Math.round(62 + Math.random() * 33);
    const updated = await db.update(mockInterviewsTable).set({
      status: "completed",
      overallScore,
      technicalScore,
      communicationScore,
      confidenceScore,
      problemSolvingScore,
      strengths: ["Strong problem-solving approach", "Clear communication", "Good time management"],
      weaknesses: ["Could improve on edge case handling", "More structured answers needed", "Deepen system design knowledge"],
      recommendations: ["Practice 2-3 LeetCode medium problems daily", "Review STAR method for behavioral questions", "Study system design fundamentals"],
      completedAt: new Date(),
    }).where(eq(mockInterviewsTable.id, params.data.id)).returning();
    await db.insert(activityItemsTable).values({
      type: "mock",
      description: `Completed ${interview.type} mock interview`,
      score: overallScore,
    });
    res.json(mapInterview(updated[0]));
  } catch (err) {
    req.log.error({ err }, "Failed to complete mock interview");
    res.status(500).json({ error: "Failed to complete mock interview" });
  }
});

export default router;
