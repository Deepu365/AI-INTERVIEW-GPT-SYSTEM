import { Router } from "express";
import { db } from "@workspace/db";
import { profilesTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { UpdateProfileBody } from "@workspace/api-zod";

const router = Router();

router.get("/profile", async (req, res) => {
  try {
    let profiles = await db.select().from(profilesTable).limit(1);
    if (profiles.length === 0) {
      const inserted = await db.insert(profilesTable).values({
        name: "Demo User",
        email: "demo@interviewgpt.ai",
        targetRole: "Software Engineer",
        experienceLevel: "junior",
        skills: ["JavaScript", "React", "Node.js", "Python"],
        bio: "Passionate developer preparing for top tech interviews.",
      }).returning();
      profiles = inserted;
    }
    const p = profiles[0];
    res.json({
      id: p.id,
      name: p.name,
      email: p.email,
      targetRole: p.targetRole,
      experienceLevel: p.experienceLevel,
      skills: p.skills,
      education: p.education ?? null,
      phone: p.phone ?? null,
      bio: p.bio ?? null,
      createdAt: p.createdAt.toISOString(),
    });
  } catch (err) {
    req.log.error({ err }, "Failed to get profile");
    res.status(500).json({ error: "Failed to get profile" });
  }
});

router.patch("/profile", async (req, res) => {
  try {
    const parsed = UpdateProfileBody.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "Invalid request body" });
      return;
    }
    const data = parsed.data;
    let profiles = await db.select().from(profilesTable).limit(1);
    if (profiles.length === 0) {
      const inserted = await db.insert(profilesTable).values({
        name: "Demo User",
        email: "demo@interviewgpt.ai",
        targetRole: "Software Engineer",
        experienceLevel: "junior",
        skills: [],
      }).returning();
      profiles = inserted;
    }
    const id = profiles[0].id;
    const updated = await db.update(profilesTable)
      .set({
        ...(data.name !== undefined && { name: data.name }),
        ...(data.targetRole !== undefined && { targetRole: data.targetRole }),
        ...(data.experienceLevel !== undefined && { experienceLevel: data.experienceLevel }),
        ...(data.skills !== undefined && { skills: data.skills }),
        ...(data.education !== undefined && { education: data.education }),
        ...(data.phone !== undefined && { phone: data.phone }),
        ...(data.bio !== undefined && { bio: data.bio }),
      })
      .where(eq(profilesTable.id, id))
      .returning();
    const p = updated[0];
    res.json({
      id: p.id,
      name: p.name,
      email: p.email,
      targetRole: p.targetRole,
      experienceLevel: p.experienceLevel,
      skills: p.skills,
      education: p.education ?? null,
      phone: p.phone ?? null,
      bio: p.bio ?? null,
      createdAt: p.createdAt.toISOString(),
    });
  } catch (err) {
    req.log.error({ err }, "Failed to update profile");
    res.status(500).json({ error: "Failed to update profile" });
  }
});

export default router;
