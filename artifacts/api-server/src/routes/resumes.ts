import { Router } from "express";
import { db } from "@workspace/db";
import { resumesTable, resumeSuggestionsTable, activityItemsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { CreateResumeBody, GetResumeParams, DeleteResumeParams, GetResumeSuggestionsParams } from "@workspace/api-zod";

const router = Router();

function analyzeResume(content: string, targetRole?: string) {
  const skills = [];
  const allSkills = ["Python", "JavaScript", "TypeScript", "React", "Node.js", "Java", "C++", "SQL", "Docker", "AWS", "Git", "MongoDB", "PostgreSQL", "Redis", "GraphQL", "REST API", "Machine Learning", "TensorFlow"];
  const lower = content.toLowerCase();
  for (const skill of allSkills) {
    if (lower.includes(skill.toLowerCase())) skills.push(skill);
  }
  const missing = allSkills.filter(s => !skills.includes(s)).slice(0, 5);
  const atsScore = Math.min(95, 45 + skills.length * 4 + (content.length > 500 ? 10 : 0));
  const keywordScore = Math.min(95, 40 + skills.length * 5);
  const formattingScore = content.length > 200 ? 82 : 60;
  const relevanceScore = targetRole ? 76 : 70;
  const suggestions = [
    "Add quantifiable achievements (e.g., 'Improved performance by 40%')",
    `Include keywords related to ${targetRole || "your target role"}`,
    "Add a professional summary section",
    "List certifications and online courses",
    "Include GitHub profile and portfolio links",
  ];
  return { skills, missingSkills: missing, atsScore, keywordScore, formattingScore, relevanceScore, suggestions };
}

router.get("/resumes", async (req, res) => {
  try {
    const resumes = await db.select().from(resumesTable).orderBy(resumesTable.createdAt);
    res.json(resumes.map(r => ({
      id: r.id,
      fileName: r.fileName,
      content: r.content ?? null,
      atsScore: r.atsScore,
      skills: r.skills,
      missingSkills: r.missingSkills,
      keywordScore: r.keywordScore,
      formattingScore: r.formattingScore,
      relevanceScore: r.relevanceScore,
      suggestions: r.suggestions,
      createdAt: r.createdAt.toISOString(),
    })));
  } catch (err) {
    req.log.error({ err }, "Failed to list resumes");
    res.status(500).json({ error: "Failed to list resumes" });
  }
});

router.post("/resumes", async (req, res) => {
  try {
    const parsed = CreateResumeBody.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "Invalid request body" });
      return;
    }
    const { fileName, content, targetRole } = parsed.data;
    const analysis = analyzeResume(content, targetRole);
    const inserted = await db.insert(resumesTable).values({
      fileName,
      content,
      atsScore: analysis.atsScore,
      skills: analysis.skills,
      missingSkills: analysis.missingSkills,
      keywordScore: analysis.keywordScore,
      formattingScore: analysis.formattingScore,
      relevanceScore: analysis.relevanceScore,
      suggestions: analysis.suggestions,
      targetRole: targetRole ?? null,
    }).returning();
    const r = inserted[0];
    await db.insert(activityItemsTable).values({
      type: "resume",
      description: `Analyzed resume: ${fileName} (ATS Score: ${analysis.atsScore.toFixed(1)})`,
      score: analysis.atsScore,
    });
    res.status(201).json({
      id: r.id,
      fileName: r.fileName,
      content: r.content ?? null,
      atsScore: r.atsScore,
      skills: r.skills,
      missingSkills: r.missingSkills,
      keywordScore: r.keywordScore,
      formattingScore: r.formattingScore,
      relevanceScore: r.relevanceScore,
      suggestions: r.suggestions,
      createdAt: r.createdAt.toISOString(),
    });
  } catch (err) {
    req.log.error({ err }, "Failed to create resume");
    res.status(500).json({ error: "Failed to create resume" });
  }
});

router.get("/resumes/:id", async (req, res) => {
  try {
    const params = GetResumeParams.safeParse({ id: Number(req.params.id) });
    if (!params.success) { res.status(400).json({ error: "Invalid id" }); return; }
    const resumes = await db.select().from(resumesTable).where(eq(resumesTable.id, params.data.id));
    if (!resumes.length) { res.status(404).json({ error: "Resume not found" }); return; }
    const r = resumes[0];
    res.json({
      id: r.id,
      fileName: r.fileName,
      content: r.content ?? null,
      atsScore: r.atsScore,
      skills: r.skills,
      missingSkills: r.missingSkills,
      keywordScore: r.keywordScore,
      formattingScore: r.formattingScore,
      relevanceScore: r.relevanceScore,
      suggestions: r.suggestions,
      createdAt: r.createdAt.toISOString(),
    });
  } catch (err) {
    req.log.error({ err }, "Failed to get resume");
    res.status(500).json({ error: "Failed to get resume" });
  }
});

router.delete("/resumes/:id", async (req, res) => {
  try {
    const params = DeleteResumeParams.safeParse({ id: Number(req.params.id) });
    if (!params.success) { res.status(400).json({ error: "Invalid id" }); return; }
    await db.delete(resumesTable).where(eq(resumesTable.id, params.data.id));
    res.status(204).send();
  } catch (err) {
    req.log.error({ err }, "Failed to delete resume");
    res.status(500).json({ error: "Failed to delete resume" });
  }
});

router.get("/resumes/:id/suggestions", async (req, res) => {
  try {
    const params = GetResumeSuggestionsParams.safeParse({ id: Number(req.params.id) });
    if (!params.success) { res.status(400).json({ error: "Invalid id" }); return; }
    const resumes = await db.select().from(resumesTable).where(eq(resumesTable.id, params.data.id));
    if (!resumes.length) { res.status(404).json({ error: "Resume not found" }); return; }
    const suggestions = [
      { id: 1, category: "skills", suggestion: "Add Docker and Kubernetes to your skills section", priority: "high" },
      { id: 2, category: "keywords", suggestion: "Include cloud platform keywords: AWS, GCP, or Azure", priority: "high" },
      { id: 3, category: "experience", suggestion: "Add quantifiable metrics to your work experience (e.g., 'reduced load time by 35%')", priority: "high" },
      { id: 4, category: "formatting", suggestion: "Use consistent bullet point formatting throughout", priority: "medium" },
      { id: 5, category: "projects", suggestion: "Add a dedicated Projects section with GitHub links", priority: "medium" },
      { id: 6, category: "certifications", suggestion: "Consider adding AWS Certified Developer or Google Cloud Professional certifications", priority: "low" },
    ];
    res.json(suggestions);
  } catch (err) {
    req.log.error({ err }, "Failed to get suggestions");
    res.status(500).json({ error: "Failed to get suggestions" });
  }
});

export default router;
