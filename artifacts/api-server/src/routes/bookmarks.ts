import { Router } from "express";
import { db } from "@workspace/db";
import { bookmarksTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { CreateBookmarkBody, DeleteBookmarkParams } from "@workspace/api-zod";

const router = Router();

router.get("/bookmarks", async (req, res) => {
  try {
    const bookmarks = await db.select().from(bookmarksTable).orderBy(bookmarksTable.createdAt);
    res.json(bookmarks.map(b => ({
      id: b.id,
      questionType: b.questionType,
      questionId: b.questionId,
      title: b.title,
      difficulty: b.difficulty ?? null,
      category: b.category ?? null,
      createdAt: b.createdAt.toISOString(),
    })));
  } catch (err) {
    req.log.error({ err }, "Failed to list bookmarks");
    res.status(500).json({ error: "Failed to list bookmarks" });
  }
});

router.post("/bookmarks", async (req, res) => {
  try {
    const body = CreateBookmarkBody.safeParse(req.body);
    if (!body.success) { res.status(400).json({ error: "Invalid request" }); return; }
    const inserted = await db.insert(bookmarksTable).values({
      questionType: body.data.questionType,
      questionId: body.data.questionId,
      title: body.data.title,
      difficulty: body.data.difficulty ?? null,
      category: body.data.category ?? null,
    }).returning();
    const b = inserted[0];
    res.status(201).json({
      id: b.id,
      questionType: b.questionType,
      questionId: b.questionId,
      title: b.title,
      difficulty: b.difficulty ?? null,
      category: b.category ?? null,
      createdAt: b.createdAt.toISOString(),
    });
  } catch (err) {
    req.log.error({ err }, "Failed to create bookmark");
    res.status(500).json({ error: "Failed to create bookmark" });
  }
});

router.delete("/bookmarks/:id", async (req, res) => {
  try {
    const params = DeleteBookmarkParams.safeParse({ id: Number(req.params.id) });
    if (!params.success) { res.status(400).json({ error: "Invalid id" }); return; }
    await db.delete(bookmarksTable).where(eq(bookmarksTable.id, params.data.id));
    res.status(204).send();
  } catch (err) {
    req.log.error({ err }, "Failed to delete bookmark");
    res.status(500).json({ error: "Failed to delete bookmark" });
  }
});

export default router;
