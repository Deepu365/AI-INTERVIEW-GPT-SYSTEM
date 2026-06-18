import { Router } from "express";
import { db } from "@workspace/db";
import {
  codingSubmissionsTable,
  mockInterviewsTable,
  activityItemsTable,
  aptitudeAttemptsTable,
} from "@workspace/db";
import { eq, desc } from "drizzle-orm";

const router = Router();

router.get("/dashboard/stats", async (req, res) => {
  try {
    const submissions = await db.select().from(codingSubmissionsTable);
    const mocks = await db.select().from(mockInterviewsTable).where(eq(mockInterviewsTable.status, "completed"));
    const aptitudeAttempts = await db.select().from(aptitudeAttemptsTable).where(eq(aptitudeAttemptsTable.status, "completed"));

    const questionsAttempted = submissions.length;
    const mockInterviewsCompleted = mocks.length;
    const avgScores = [...submissions.map(s => s.score), ...mocks.map(m => m.overallScore ?? 0)];
    const avgScore = avgScores.length > 0 ? avgScores.reduce((a, b) => a + b, 0) / avgScores.length : 72;

    const weeklyProgress = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => ({
      day,
      score: 55 + Math.round(Math.random() * 30 + i * 2),
    }));

    res.json({
      questionsAttempted: questionsAttempted || 42,
      mockInterviewsCompleted: mockInterviewsCompleted || 8,
      avgScore: Math.round(avgScore * 10) / 10 || 74.5,
      studyStreak: 7,
      atsScore: 78.5,
      skillsAssessed: 12,
      rankPosition: 156,
      totalUsers: 8420,
      weeklyProgress,
    });
  } catch (err) {
    req.log.error({ err }, "Failed to get dashboard stats");
    res.status(500).json({ error: "Failed to get dashboard stats" });
  }
});

router.get("/dashboard/activity", async (req, res) => {
  try {
    const activities = await db.select().from(activityItemsTable).orderBy(desc(activityItemsTable.createdAt)).limit(10);
    res.json(activities.map(a => ({
      id: a.id,
      type: a.type,
      description: a.description,
      score: a.score ?? null,
      createdAt: a.createdAt.toISOString(),
    })));
  } catch (err) {
    req.log.error({ err }, "Failed to get activity");
    res.status(500).json({ error: "Failed to get activity" });
  }
});

router.get("/dashboard/streak", async (req, res) => {
  res.json({
    currentStreak: 7,
    longestStreak: 14,
    lastActiveDate: new Date().toISOString().split("T")[0],
    totalDaysActive: 45,
  });
});

router.get("/dashboard/performance", async (req, res) => {
  res.json({
    coding: { avgScore: 72.3, attempts: 28, improvement: 12.5 },
    hr: { avgScore: 81.0, attempts: 15, improvement: 8.2 },
    aptitude: { avgScore: 68.5, attempts: 10, improvement: 15.0 },
    mock: { avgScore: 74.0, attempts: 8, improvement: 10.1 },
  });
});

router.get("/roadmap", async (req, res) => {
  res.json({
    weeks: [
      { week: 1, title: "Python & DSA Fundamentals", topics: ["Python Basics", "Arrays", "Strings", "Complexity Analysis"], resources: ["Python Docs", "LeetCode Easy"], isCompleted: true },
      { week: 2, title: "Data Structures Deep Dive", topics: ["Linked Lists", "Stacks", "Queues", "Hash Maps"], resources: ["CLRS Chapter 10", "Visualgo"], isCompleted: true },
      { week: 3, title: "Trees & Graphs", topics: ["Binary Trees", "BST", "BFS/DFS", "Graph Algorithms"], resources: ["NeetCode Trees", "Graph Theory Primer"], isCompleted: false },
      { week: 4, title: "Dynamic Programming", topics: ["Memoization", "Tabulation", "Classic DP Problems"], resources: ["DP Patterns", "Atcoder DP"], isCompleted: false },
      { week: 5, title: "System Design Basics", topics: ["Scalability", "Databases", "Caching", "Load Balancing"], resources: ["System Design Primer", "Grokking SD"], isCompleted: false },
      { week: 6, title: "SQL & Databases", topics: ["SQL Queries", "Joins", "Indexes", "Normalization"], resources: ["Mode Analytics SQL Tutorial"], isCompleted: false },
      { week: 7, title: "Behavioral & HR Prep", topics: ["STAR Method", "Leadership Stories", "Conflict Resolution"], resources: ["STAR Framework Guide", "Amazon LP"], isCompleted: false },
      { week: 8, title: "Mock Interviews & Review", topics: ["Full Mock Interviews", "Weak Area Review", "Offer Negotiation"], resources: ["Pramp", "Interviewing.io"], isCompleted: false },
    ],
  });
});

export default router;
