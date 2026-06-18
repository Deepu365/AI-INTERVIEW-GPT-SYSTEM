import { Router } from "express";
import { db } from "@workspace/db";
import { tipsTable, scheduledInterviewsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { ListTipsQueryParams, CreateScheduledInterviewBody, DeleteScheduledInterviewParams } from "@workspace/api-zod";

const router = Router();

router.get("/tips", async (req, res) => {
  try {
    const params = ListTipsQueryParams.safeParse(req.query);
    let tips = await db.select().from(tipsTable);
    if (params.success && params.data.category) {
      tips = tips.filter(t => t.category === params.data.category);
    }
    res.json(tips.map(t => ({
      id: t.id,
      title: t.title,
      content: t.content,
      category: t.category,
      tags: t.tags,
    })));
  } catch (err) {
    req.log.error({ err }, "Failed to list tips");
    res.status(500).json({ error: "Failed to list tips" });
  }
});

router.get("/schedule", async (req, res) => {
  try {
    const interviews = await db.select().from(scheduledInterviewsTable).orderBy(scheduledInterviewsTable.scheduledAt);
    res.json(interviews.map(i => ({
      id: i.id,
      company: i.company,
      role: i.role,
      type: i.type,
      scheduledAt: i.scheduledAt,
      notes: i.notes ?? null,
      status: i.status,
      createdAt: i.createdAt.toISOString(),
    })));
  } catch (err) {
    req.log.error({ err }, "Failed to list schedule");
    res.status(500).json({ error: "Failed to list schedule" });
  }
});

router.post("/schedule", async (req, res) => {
  try {
    const body = CreateScheduledInterviewBody.safeParse(req.body);
    if (!body.success) { res.status(400).json({ error: "Invalid request" }); return; }
    const inserted = await db.insert(scheduledInterviewsTable).values({
      company: body.data.company,
      role: body.data.role,
      type: body.data.type,
      scheduledAt: body.data.scheduledAt,
      notes: body.data.notes ?? null,
      status: "upcoming",
    }).returning();
    const i = inserted[0];
    res.status(201).json({
      id: i.id, company: i.company, role: i.role, type: i.type,
      scheduledAt: i.scheduledAt, notes: i.notes ?? null, status: i.status,
      createdAt: i.createdAt.toISOString(),
    });
  } catch (err) {
    req.log.error({ err }, "Failed to create scheduled interview");
    res.status(500).json({ error: "Failed to create scheduled interview" });
  }
});

router.delete("/schedule/:id", async (req, res) => {
  try {
    const params = DeleteScheduledInterviewParams.safeParse({ id: Number(req.params.id) });
    if (!params.success) { res.status(400).json({ error: "Invalid id" }); return; }
    await db.delete(scheduledInterviewsTable).where(eq(scheduledInterviewsTable.id, params.data.id));
    res.status(204).send();
  } catch (err) {
    req.log.error({ err }, "Failed to delete scheduled interview");
    res.status(500).json({ error: "Failed to delete scheduled interview" });
  }
});

export default router;
