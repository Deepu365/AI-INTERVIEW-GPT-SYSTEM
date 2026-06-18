import { Router } from "express";
import { GetLeaderboardQueryParams } from "@workspace/api-zod";

const router = Router();

const NAMES = ["Arjun Sharma", "Priya Patel", "Rahul Singh", "Neha Gupta", "Vikram Nair", "Ananya Krishnan", "Rohit Mehta", "Sneha Joshi", "Amit Kumar", "Deepa Reddy", "Kiran Rao", "Suresh Iyer", "Meera Nambiar", "Aditya Verma", "Pooja Mishra"];

function getBadge(rank: number): string {
  if (rank === 1) return "gold";
  if (rank === 2 || rank === 3) return "silver";
  if (rank <= 5) return "bronze";
  if (rank <= 10) return "top10";
  if (rank <= 50) return "top50";
  return "participant";
}

router.get("/leaderboard", async (req, res) => {
  try {
    const params = GetLeaderboardQueryParams.safeParse(req.query);
    const category = params.success && params.data.category ? params.data.category : "overall";
    const entries = NAMES.map((name, i) => ({
      rank: i + 1,
      name,
      score: Math.max(20, 98 - i * 4 + Math.round(Math.random() * 3)),
      questionsAttempted: Math.max(5, 120 - i * 6 + Math.round(Math.random() * 10)),
      badge: getBadge(i + 1),
      isCurrentUser: i === 11,
    }));
    res.json(entries);
  } catch (err) {
    req.log.error({ err }, "Failed to get leaderboard");
    res.status(500).json({ error: "Failed to get leaderboard" });
  }
});

export default router;
