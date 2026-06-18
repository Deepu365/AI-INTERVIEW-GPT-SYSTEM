import { Router, type IRouter } from "express";
import healthRouter from "./health";
import profileRouter from "./profile";
import dashboardRouter from "./dashboard";
import resumesRouter from "./resumes";
import codingRouter from "./coding";
import hrRouter from "./hr";
import aptitudeRouter from "./aptitude";
import mockInterviewsRouter from "./mock-interviews";
import jobDescriptionsRouter from "./job-descriptions";
import leaderboardRouter from "./leaderboard";
import bookmarksRouter from "./bookmarks";
import tipsRouter from "./tips";

const router: IRouter = Router();

router.use(healthRouter);
router.use(profileRouter);
router.use(dashboardRouter);
router.use(resumesRouter);
router.use(codingRouter);
router.use(hrRouter);
router.use(aptitudeRouter);
router.use(mockInterviewsRouter);
router.use(jobDescriptionsRouter);
router.use(leaderboardRouter);
router.use(bookmarksRouter);
router.use(tipsRouter);

export default router;
