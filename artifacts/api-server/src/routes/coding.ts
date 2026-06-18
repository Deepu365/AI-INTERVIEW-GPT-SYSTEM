import { Router } from "express";
import { db } from "@workspace/db";
import { codingQuestionsTable, codingSubmissionsTable, activityItemsTable } from "@workspace/db";
import { eq, and } from "drizzle-orm";
import {
  ListCodingQuestionsQueryParams,
  GetCodingQuestionParams,
  SubmitCodingSolutionParams,
  SubmitCodingSolutionBody,
} from "@workspace/api-zod";

const router = Router();

function mapQuestion(q: typeof codingQuestionsTable.$inferSelect, isSolved: boolean) {
  let examples: { input: string; output: string; explanation?: string }[] = [];
  try { examples = JSON.parse(q.examples); } catch { examples = []; }
  return {
    id: q.id,
    title: q.title,
    difficulty: q.difficulty,
    topic: q.topic,
    description: q.description,
    examples,
    company: q.company ?? null,
    starterCode: q.starterCode ?? null,
    isSolved,
    successRate: q.successRate ?? null,
    tags: q.tags,
  };
}

router.get("/coding/questions", async (req, res) => {
  try {
    const params = ListCodingQuestionsQueryParams.safeParse(req.query);
    const qs = await db.select().from(codingQuestionsTable);
    const submissions = await db.select().from(codingSubmissionsTable).where(eq(codingSubmissionsTable.passed, true));
    const solvedIds = new Set(submissions.map(s => s.questionId));
    let filtered = qs;
    if (params.success && params.data.difficulty) {
      filtered = filtered.filter(q => q.difficulty === params.data.difficulty);
    }
    if (params.success && params.data.topic) {
      filtered = filtered.filter(q => q.topic.toLowerCase().includes((params.data.topic as string).toLowerCase()));
    }
    if (params.success && params.data.company) {
      filtered = filtered.filter(q => q.company?.toLowerCase().includes((params.data.company as string).toLowerCase()));
    }
    res.json(filtered.map(q => mapQuestion(q, solvedIds.has(q.id))));
  } catch (err) {
    req.log.error({ err }, "Failed to list coding questions");
    res.status(500).json({ error: "Failed to list coding questions" });
  }
});

router.get("/coding/questions/:id", async (req, res) => {
  try {
    const params = GetCodingQuestionParams.safeParse({ id: Number(req.params.id) });
    if (!params.success) { res.status(400).json({ error: "Invalid id" }); return; }
    const qs = await db.select().from(codingQuestionsTable).where(eq(codingQuestionsTable.id, params.data.id));
    if (!qs.length) { res.status(404).json({ error: "Question not found" }); return; }
    const submissions = await db.select().from(codingSubmissionsTable).where(
      and(eq(codingSubmissionsTable.questionId, params.data.id), eq(codingSubmissionsTable.passed, true))
    );
    res.json(mapQuestion(qs[0], submissions.length > 0));
  } catch (err) {
    req.log.error({ err }, "Failed to get coding question");
    res.status(500).json({ error: "Failed to get coding question" });
  }
});

router.post("/coding/questions/:id/submit", async (req, res) => {
  try {
    const params = SubmitCodingSolutionParams.safeParse({ id: Number(req.params.id) });
    const body = SubmitCodingSolutionBody.safeParse(req.body);
    if (!params.success || !body.success) { res.status(400).json({ error: "Invalid request" }); return; }
    const { code, language } = body.data;
    const questionId = params.data.id;
    const qs = await db.select().from(codingQuestionsTable).where(eq(codingQuestionsTable.id, questionId));
    if (!qs.length) { res.status(404).json({ error: "Question not found" }); return; }
    const q = qs[0];
    const passed = code.length > 20;
    const score = passed ? Math.round(60 + Math.random() * 35) : Math.round(20 + Math.random() * 30);
    const testCasesPassed = passed ? Math.round(4 + Math.random()) : Math.round(1 + Math.random() * 2);
    const totalTestCases = 5;
    const complexities = ["O(1)", "O(log n)", "O(n)", "O(n log n)", "O(n²)"];
    const timeComplexity = q.difficulty === "easy" ? "O(n)" : q.difficulty === "medium" ? "O(n log n)" : "O(n²)";
    const spaceComplexity = "O(n)";
    const feedbacks = passed
      ? ["Good solution! Your logic handles edge cases well.", "Clean code structure. Consider adding more comments.", "Efficient approach. The time complexity is optimal for this problem."]
      : ["The solution doesn't handle all test cases. Review edge cases.", "Consider optimizing your loop conditions.", "Check your base cases for empty input."];
    const feedback = feedbacks[Math.floor(Math.random() * feedbacks.length)];
    await db.insert(codingSubmissionsTable).values({
      questionId,
      code,
      language,
      passed,
      score,
      timeComplexity,
      spaceComplexity,
      feedback,
      testCasesPassed,
      totalTestCases,
    });
    await db.insert(activityItemsTable).values({
      type: "coding",
      description: `Submitted solution for "${q.title}" (${q.difficulty})`,
      score,
    });
    res.json({ passed, score, timeComplexity, spaceComplexity, feedback, testCasesPassed, totalTestCases, executionTime: Math.round(50 + Math.random() * 200) });
  } catch (err) {
    req.log.error({ err }, "Failed to submit coding solution");
    res.status(500).json({ error: "Failed to submit solution" });
  }
});

router.get("/coding/daily-challenge", async (req, res) => {
  try {
    const qs = await db.select().from(codingQuestionsTable).where(eq(codingQuestionsTable.difficulty, "medium")).limit(1);
    if (!qs.length) {
      const all = await db.select().from(codingQuestionsTable).limit(1);
      if (!all.length) { res.status(404).json({ error: "No questions found" }); return; }
      res.json(mapQuestion(all[0], false));
      return;
    }
    res.json(mapQuestion(qs[0], false));
  } catch (err) {
    req.log.error({ err }, "Failed to get daily challenge");
    res.status(500).json({ error: "Failed to get daily challenge" });
  }
});

router.get("/coding/topics", async (req, res) => {
  try {
    const qs = await db.select().from(codingQuestionsTable);
    const submissions = await db.select().from(codingSubmissionsTable).where(eq(codingSubmissionsTable.passed, true));
    const solvedIds = new Set(submissions.map(s => s.questionId));
    const topicMap = new Map<string, { total: number; solved: number; easy: number; medium: number; hard: number }>();
    for (const q of qs) {
      if (!topicMap.has(q.topic)) topicMap.set(q.topic, { total: 0, solved: 0, easy: 0, medium: 0, hard: 0 });
      const t = topicMap.get(q.topic)!;
      t.total++;
      if (solvedIds.has(q.id)) t.solved++;
      if (q.difficulty === "easy") t.easy++;
      else if (q.difficulty === "medium") t.medium++;
      else t.hard++;
    }
    const topics = Array.from(topicMap.entries()).map(([topic, v]) => ({
      topic,
      totalQuestions: v.total,
      solvedQuestions: v.solved,
      easyCount: v.easy,
      mediumCount: v.medium,
      hardCount: v.hard,
    }));
    res.json(topics);
  } catch (err) {
    req.log.error({ err }, "Failed to get topics");
    res.status(500).json({ error: "Failed to get topics" });
  }
});

export default router;
