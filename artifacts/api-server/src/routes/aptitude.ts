import { Router } from "express";
import { db } from "@workspace/db";
import { aptitudeTestsTable, aptitudeQuestionsTable, aptitudeAttemptsTable, activityItemsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { CreateAptitudeAttemptBody, SubmitAptitudeAttemptParams, SubmitAptitudeAttemptBody } from "@workspace/api-zod";

const router = Router();

router.get("/aptitude/tests", async (req, res) => {
  try {
    const tests = await db.select().from(aptitudeTestsTable);
    res.json(tests.map(t => ({
      id: t.id,
      title: t.title,
      category: t.category,
      duration: t.duration,
      totalQuestions: t.totalQuestions,
      difficulty: t.difficulty,
      description: t.description,
    })));
  } catch (err) {
    req.log.error({ err }, "Failed to list aptitude tests");
    res.status(500).json({ error: "Failed to list aptitude tests" });
  }
});

router.post("/aptitude/tests", async (req, res) => {
  try {
    const body = CreateAptitudeAttemptBody.safeParse(req.body);
    if (!body.success) { res.status(400).json({ error: "Invalid request" }); return; }
    const { testId } = body.data;
    const tests = await db.select().from(aptitudeTestsTable).where(eq(aptitudeTestsTable.id, testId));
    if (!tests.length) { res.status(404).json({ error: "Test not found" }); return; }
    const questions = await db.select().from(aptitudeQuestionsTable).where(eq(aptitudeQuestionsTable.testId, testId));
    const attempt = await db.insert(aptitudeAttemptsTable).values({
      testId,
      status: "in_progress",
      totalQuestions: questions.length,
    }).returning();
    res.status(201).json({
      id: attempt[0].id,
      testId,
      questions: questions.map(q => ({
        id: q.id,
        question: q.question,
        options: q.options,
        explanation: q.explanation ?? null,
      })),
      startedAt: attempt[0].startedAt.toISOString(),
      status: "in_progress",
    });
  } catch (err) {
    req.log.error({ err }, "Failed to start aptitude attempt");
    res.status(500).json({ error: "Failed to start aptitude attempt" });
  }
});

router.post("/aptitude/attempts/:id/submit", async (req, res) => {
  try {
    const params = SubmitAptitudeAttemptParams.safeParse({ id: Number(req.params.id) });
    const body = SubmitAptitudeAttemptBody.safeParse(req.body);
    if (!params.success || !body.success) { res.status(400).json({ error: "Invalid request" }); return; }
    const { answers } = body.data;
    const attempts = await db.select().from(aptitudeAttemptsTable).where(eq(aptitudeAttemptsTable.id, params.data.id));
    if (!attempts.length) { res.status(404).json({ error: "Attempt not found" }); return; }
    const attempt = attempts[0];
    const questions = await db.select().from(aptitudeQuestionsTable).where(eq(aptitudeQuestionsTable.testId, attempt.testId));
    let correct = 0;
    for (const ans of answers) {
      const q = questions.find(q => q.id === ans.questionId);
      if (q && q.correctOption === ans.selectedOption) correct++;
    }
    const total = questions.length || 1;
    const score = Math.round((correct / total) * 100);
    const timeTaken = Math.round((Date.now() - attempt.startedAt.getTime()) / 1000);
    await db.update(aptitudeAttemptsTable).set({
      status: "completed",
      score,
      correctAnswers: correct,
      totalQuestions: total,
      timeTaken,
      completedAt: new Date(),
    }).where(eq(aptitudeAttemptsTable.id, params.data.id));
    const tests = await db.select().from(aptitudeTestsTable).where(eq(aptitudeTestsTable.id, attempt.testId));
    if (tests.length) {
      await db.insert(activityItemsTable).values({
        type: "aptitude",
        description: `Completed "${tests[0].title}" aptitude test`,
        score,
      });
    }
    res.json({
      attemptId: params.data.id,
      score,
      correctAnswers: correct,
      totalQuestions: total,
      timeTaken,
      categoryBreakdown: { overall: score },
    });
  } catch (err) {
    req.log.error({ err }, "Failed to submit aptitude attempt");
    res.status(500).json({ error: "Failed to submit attempt" });
  }
});

router.get("/aptitude/history", async (req, res) => {
  try {
    const attempts = await db.select().from(aptitudeAttemptsTable).where(eq(aptitudeAttemptsTable.status, "completed"));
    const result = [];
    for (const a of attempts) {
      const tests = await db.select().from(aptitudeTestsTable).where(eq(aptitudeTestsTable.id, a.testId));
      result.push({
        id: a.id,
        testTitle: tests.length ? tests[0].title : "Unknown Test",
        category: tests.length ? tests[0].category : "general",
        score: a.score ?? 0,
        completedAt: (a.completedAt ?? a.startedAt).toISOString(),
      });
    }
    res.json(result);
  } catch (err) {
    req.log.error({ err }, "Failed to get aptitude history");
    res.status(500).json({ error: "Failed to get aptitude history" });
  }
});

export default router;
