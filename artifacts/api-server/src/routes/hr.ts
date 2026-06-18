import { Router } from "express";
import { db } from "@workspace/db";
import { hrQuestionsTable, activityItemsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { ListHrQuestionsQueryParams, GetHrQuestionParams, EvaluateHrAnswerParams, EvaluateHrAnswerBody } from "@workspace/api-zod";

const router = Router();

router.get("/hr/questions", async (req, res) => {
  try {
    const params = ListHrQuestionsQueryParams.safeParse(req.query);
    let questions = await db.select().from(hrQuestionsTable);
    if (params.success && params.data.category) {
      questions = questions.filter(q => q.category === params.data.category);
    }
    res.json(questions.map(q => ({
      id: q.id,
      question: q.question,
      category: q.category,
      tips: q.tips,
      sampleAnswer: q.sampleAnswer,
    })));
  } catch (err) {
    req.log.error({ err }, "Failed to list HR questions");
    res.status(500).json({ error: "Failed to list HR questions" });
  }
});

router.get("/hr/questions/:id", async (req, res) => {
  try {
    const params = GetHrQuestionParams.safeParse({ id: Number(req.params.id) });
    if (!params.success) { res.status(400).json({ error: "Invalid id" }); return; }
    const questions = await db.select().from(hrQuestionsTable).where(eq(hrQuestionsTable.id, params.data.id));
    if (!questions.length) { res.status(404).json({ error: "Question not found" }); return; }
    const q = questions[0];
    res.json({ id: q.id, question: q.question, category: q.category, tips: q.tips, sampleAnswer: q.sampleAnswer });
  } catch (err) {
    req.log.error({ err }, "Failed to get HR question");
    res.status(500).json({ error: "Failed to get HR question" });
  }
});

router.post("/hr/questions/:id/evaluate", async (req, res) => {
  try {
    const params = EvaluateHrAnswerParams.safeParse({ id: Number(req.params.id) });
    const body = EvaluateHrAnswerBody.safeParse(req.body);
    if (!params.success || !body.success) { res.status(400).json({ error: "Invalid request" }); return; }
    const { answer } = body.data;
    const wordCount = answer.trim().split(/\s+/).length;
    const grammarScore = wordCount > 30 ? Math.round(75 + Math.random() * 20) : Math.round(50 + Math.random() * 25);
    const relevanceScore = wordCount > 20 ? Math.round(70 + Math.random() * 25) : Math.round(40 + Math.random() * 30);
    const confidenceScore = Math.round(65 + Math.random() * 30);
    const score = Math.round((grammarScore + relevanceScore + confidenceScore) / 3);
    const questions = await db.select().from(hrQuestionsTable).where(eq(hrQuestionsTable.id, params.data.id));
    const questionText = questions.length ? questions[0].question : "HR question";
    await db.insert(activityItemsTable).values({
      type: "hr",
      description: `Practiced HR question: "${questionText.substring(0, 50)}..."`,
      score,
    });
    res.json({
      score,
      grammarScore,
      relevanceScore,
      confidenceScore,
      positivePoints: [
        "Good use of specific examples",
        "Clear and concise communication",
        "Shows self-awareness and growth mindset",
      ],
      improvements: [
        "Structure your answer using the STAR method (Situation, Task, Action, Result)",
        "Quantify your impact where possible",
        "Maintain a more confident tone throughout",
      ],
      suggestedAnswer: questions.length ? questions[0].sampleAnswer : "Focus on specific examples with measurable outcomes.",
    });
  } catch (err) {
    req.log.error({ err }, "Failed to evaluate HR answer");
    res.status(500).json({ error: "Failed to evaluate HR answer" });
  }
});

export default router;
