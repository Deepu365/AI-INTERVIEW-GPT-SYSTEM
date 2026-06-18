import { Router } from "express";
import { db } from "@workspace/db";
import { jobDescriptionsTable, activityItemsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { AnalyzeJobDescriptionBody, GetJobDescriptionParams, DeleteJobDescriptionParams } from "@workspace/api-zod";

const router = Router();

const USER_SKILLS = ["JavaScript", "TypeScript", "React", "Node.js", "Python", "SQL", "Git"];

function analyzeJD(title: string, company: string, content: string) {
  const allSkills = ["JavaScript", "TypeScript", "React", "Node.js", "Python", "Java", "C++", "SQL", "Docker", "AWS", "Kubernetes", "Go", "Ruby", "Swift", "PostgreSQL", "MongoDB", "Redis", "GraphQL", "REST", "Git", "CI/CD", "Machine Learning"];
  const lower = content.toLowerCase();
  const requiredSkills = allSkills.filter(s => lower.includes(s.toLowerCase())).slice(0, 10);
  if (requiredSkills.length === 0) requiredSkills.push("Communication", "Problem Solving", "Team Collaboration");
  const matchedSkills = requiredSkills.filter(s => USER_SKILLS.includes(s));
  const missingSkills = requiredSkills.filter(s => !USER_SKILLS.includes(s));
  const matchScore = Math.round((matchedSkills.length / requiredSkills.length) * 100);
  const expMatch = content.match(/(\d+)\+?\s*years?/i);
  const experienceRequired = expMatch ? `${expMatch[1]}+ years` : null;
  return { requiredSkills, matchedSkills, missingSkills, matchScore, experienceRequired };
}

router.get("/job-descriptions", async (req, res) => {
  try {
    const jds = await db.select().from(jobDescriptionsTable).orderBy(jobDescriptionsTable.createdAt);
    res.json(jds.map(j => ({
      id: j.id,
      title: j.title,
      company: j.company,
      content: j.content ?? null,
      matchScore: j.matchScore,
      requiredSkills: j.requiredSkills,
      missingSkills: j.missingSkills,
      matchedSkills: j.matchedSkills,
      experienceRequired: j.experienceRequired ?? null,
      createdAt: j.createdAt.toISOString(),
    })));
  } catch (err) {
    req.log.error({ err }, "Failed to list job descriptions");
    res.status(500).json({ error: "Failed to list job descriptions" });
  }
});

router.post("/job-descriptions", async (req, res) => {
  try {
    const body = AnalyzeJobDescriptionBody.safeParse(req.body);
    if (!body.success) { res.status(400).json({ error: "Invalid request" }); return; }
    const { title, company, content } = body.data;
    const analysis = analyzeJD(title, company, content);
    const inserted = await db.insert(jobDescriptionsTable).values({
      title, company, content,
      matchScore: analysis.matchScore,
      requiredSkills: analysis.requiredSkills,
      missingSkills: analysis.missingSkills,
      matchedSkills: analysis.matchedSkills,
      experienceRequired: analysis.experienceRequired,
    }).returning();
    const j = inserted[0];
    await db.insert(activityItemsTable).values({
      type: "jd",
      description: `Analyzed JD: ${title} at ${company} (${analysis.matchScore}% match)`,
      score: analysis.matchScore,
    });
    res.status(201).json({
      id: j.id,
      title: j.title,
      company: j.company,
      content: j.content ?? null,
      matchScore: j.matchScore,
      requiredSkills: j.requiredSkills,
      missingSkills: j.missingSkills,
      matchedSkills: j.matchedSkills,
      experienceRequired: j.experienceRequired ?? null,
      createdAt: j.createdAt.toISOString(),
    });
  } catch (err) {
    req.log.error({ err }, "Failed to analyze job description");
    res.status(500).json({ error: "Failed to analyze job description" });
  }
});

router.get("/job-descriptions/:id", async (req, res) => {
  try {
    const params = GetJobDescriptionParams.safeParse({ id: Number(req.params.id) });
    if (!params.success) { res.status(400).json({ error: "Invalid id" }); return; }
    const jds = await db.select().from(jobDescriptionsTable).where(eq(jobDescriptionsTable.id, params.data.id));
    if (!jds.length) { res.status(404).json({ error: "Job description not found" }); return; }
    const j = jds[0];
    res.json({
      id: j.id, title: j.title, company: j.company, content: j.content ?? null,
      matchScore: j.matchScore, requiredSkills: j.requiredSkills, missingSkills: j.missingSkills,
      matchedSkills: j.matchedSkills, experienceRequired: j.experienceRequired ?? null,
      createdAt: j.createdAt.toISOString(),
    });
  } catch (err) {
    req.log.error({ err }, "Failed to get job description");
    res.status(500).json({ error: "Failed to get job description" });
  }
});

router.delete("/job-descriptions/:id", async (req, res) => {
  try {
    const params = DeleteJobDescriptionParams.safeParse({ id: Number(req.params.id) });
    if (!params.success) { res.status(400).json({ error: "Invalid id" }); return; }
    await db.delete(jobDescriptionsTable).where(eq(jobDescriptionsTable.id, params.data.id));
    res.status(204).send();
  } catch (err) {
    req.log.error({ err }, "Failed to delete job description");
    res.status(500).json({ error: "Failed to delete job description" });
  }
});

export default router;
