import { db, pool } from "./index";
import {
  hrQuestionsTable,
  aptitudeTestsTable,
  aptitudeQuestionsTable,
  tipsTable,
  codingQuestionsTable,
} from "./schema";

async function seed() {
  console.log("Seeding HR questions...");
  await db.insert(hrQuestionsTable).values([
    {
      question: "Tell me about yourself.",
      category: "self_introduction",
      tips: [
        "Keep it under 2 minutes",
        "Focus on professional background relevant to the role",
        "End with why you're excited about this opportunity",
      ],
      sampleAnswer:
        "I'm a software engineer with 3 years of experience building web applications. I started my career at a startup where I learned full-stack development, and I'm now looking to grow into a more senior role where I can mentor junior engineers.",
    },
    {
      question: "What is your greatest strength?",
      category: "strengths_weaknesses",
      tips: [
        "Pick a strength relevant to the job",
        "Back it up with a specific example",
        "Quantify the impact if possible",
      ],
      sampleAnswer:
        "My greatest strength is problem-solving under pressure. In my last role, I diagnosed and fixed a critical production bug within an hour during a high-traffic sale event, preventing significant revenue loss.",
    },
    {
      question: "What is your greatest weakness?",
      category: "strengths_weaknesses",
      tips: [
        "Choose a real but non-critical weakness",
        "Show what you're doing to improve it",
        "Avoid clichés like 'I'm a perfectionist'",
      ],
      sampleAnswer:
        "I used to struggle with delegating tasks because I wanted full control over quality. I've since learned to set clear expectations and checkpoints, which has helped my team move faster while maintaining quality.",
    },
    {
      question: "Describe a time you showed leadership.",
      category: "leadership",
      tips: [
        "Use the STAR method (Situation, Task, Action, Result)",
        "Highlight how you influenced or guided others",
        "Quantify the outcome",
      ],
      sampleAnswer:
        "When our team lead left mid-project, I stepped up to coordinate the remaining sprints. I organized daily stand-ups, redistributed tasks based on team strengths, and we delivered the project only one week behind the original schedule.",
    },
    {
      question: "Tell me about a time you led a project under a tight deadline.",
      category: "leadership",
      tips: [
        "Explain the constraints clearly",
        "Show prioritization and decision-making",
        "Share the measurable result",
      ],
      sampleAnswer:
        "I led a 3-person team to ship a customer-facing feature in 2 weeks instead of the usual 4. I cut scope to the MVP, ran daily syncs, and we launched on time with positive customer feedback.",
    },
    {
      question: "Describe a conflict you had with a teammate and how you resolved it.",
      category: "teamwork",
      tips: [
        "Stay neutral and professional describing the conflict",
        "Focus on the resolution, not blame",
        "Show what you learned",
      ],
      sampleAnswer:
        "A teammate and I disagreed on the architecture for a new service. We scheduled a 1:1, listed pros/cons of each approach, and ultimately combined the best parts of both ideas, which led to a more scalable solution.",
    },
    {
      question: "Tell me about a time you worked effectively in a team.",
      category: "teamwork",
      tips: [
        "Highlight your specific contribution",
        "Show collaboration, not just individual work",
        "Mention the team's overall outcome",
      ],
      sampleAnswer:
        "During a hackathon, our team of 4 built a prototype in 24 hours. I took ownership of the backend API while coordinating with the frontend developer on data contracts, and we won second place.",
    },
    {
      question: "Where do you see yourself in 5 years?",
      category: "general",
      tips: [
        "Align your answer with the company's growth path",
        "Show ambition without sounding unrealistic",
        "Mention skills you want to develop",
      ],
      sampleAnswer:
        "In 5 years, I'd like to be a senior or staff engineer, leading technical design for major features while mentoring junior developers on the team.",
    },
  ]);

  console.log("Seeding aptitude tests...");
  const [quantTest] = await db
    .insert(aptitudeTestsTable)
    .values({
      title: "Quantitative Aptitude - Basics",
      category: "quantitative",
      duration: 20,
      totalQuestions: 5,
      difficulty: "easy",
      description: "Practice basic arithmetic, percentages, and ratios under time pressure.",
    })
    .returning();

  const [logicalTest] = await db
    .insert(aptitudeTestsTable)
    .values({
      title: "Logical Reasoning - Patterns",
      category: "logical",
      duration: 15,
      totalQuestions: 5,
      difficulty: "medium",
      description: "Sharpen your pattern recognition and logical deduction skills.",
    })
    .returning();

  const [verbalTest] = await db
    .insert(aptitudeTestsTable)
    .values({
      title: "Verbal Reasoning - Comprehension",
      category: "verbal",
      duration: 15,
      totalQuestions: 5,
      difficulty: "easy",
      description: "Test your reading comprehension and vocabulary skills.",
    })
    .returning();

  console.log("Seeding aptitude questions...");
  await db.insert(aptitudeQuestionsTable).values([
    {
      testId: quantTest.id,
      question: "What is 15% of 200?",
      options: ["20", "30", "25", "35"],
      correctOption: 1,
      explanation: "15% of 200 = (15/100) * 200 = 30.",
    },
    {
      testId: quantTest.id,
      question: "If a train travels 60 km in 1.5 hours, what is its speed?",
      options: ["30 km/h", "40 km/h", "45 km/h", "50 km/h"],
      correctOption: 1,
      explanation: "Speed = Distance / Time = 60 / 1.5 = 40 km/h.",
    },
    {
      testId: quantTest.id,
      question: "What is the ratio of 4 to 16?",
      options: ["1:2", "1:4", "1:3", "2:1"],
      correctOption: 1,
      explanation: "4:16 simplifies to 1:4.",
    },
    {
      testId: quantTest.id,
      question: "A shirt costs $50 after a 20% discount. What was the original price?",
      options: ["$60", "$62.50", "$65", "$70"],
      correctOption: 1,
      explanation: "Original price = 50 / 0.8 = $62.50.",
    },
    {
      testId: quantTest.id,
      question: "What is the average of 10, 20, and 30?",
      options: ["15", "20", "25", "30"],
      correctOption: 1,
      explanation: "Average = (10+20+30)/3 = 20.",
    },
    {
      testId: logicalTest.id,
      question: "Find the next number: 2, 4, 8, 16, ?",
      options: ["24", "28", "32", "30"],
      correctOption: 2,
      explanation: "Each number doubles the previous one: 16 * 2 = 32.",
    },
    {
      testId: logicalTest.id,
      question: "If all Bloops are Razzies and all Razzies are Lazzies, are all Bloops definitely Lazzies?",
      options: ["Yes", "No", "Cannot be determined", "Only some"],
      correctOption: 0,
      explanation: "This follows basic transitive logic: Bloops -> Razzies -> Lazzies.",
    },
    {
      testId: logicalTest.id,
      question: "Which number is the odd one out: 3, 5, 7, 10, 11?",
      options: ["3", "7", "10", "11"],
      correctOption: 2,
      explanation: "10 is the only even number; all others are odd/prime.",
    },
    {
      testId: logicalTest.id,
      question: "Complete the pattern: A, C, E, G, ?",
      options: ["H", "I", "J", "K"],
      correctOption: 1,
      explanation: "The pattern skips one letter each time: A, C, E, G, I.",
    },
    {
      testId: logicalTest.id,
      question: "If today is Monday, what day will it be in 10 days?",
      options: ["Wednesday", "Thursday", "Friday", "Saturday"],
      correctOption: 1,
      explanation: "10 days from Monday = 1 week + 3 days = Thursday.",
    },
    {
      testId: verbalTest.id,
      question: "Choose the synonym for 'Benevolent':",
      options: ["Cruel", "Kind", "Greedy", "Lazy"],
      correctOption: 1,
      explanation: "Benevolent means kind and generous.",
    },
    {
      testId: verbalTest.id,
      question: "Choose the antonym for 'Diligent':",
      options: ["Hardworking", "Lazy", "Smart", "Honest"],
      correctOption: 1,
      explanation: "Diligent means hardworking, so the antonym is lazy.",
    },
    {
      testId: verbalTest.id,
      question: "'The early bird catches the worm' means:",
      options: [
        "Birds wake up early",
        "Being proactive leads to success",
        "Worms are caught by birds",
        "None of the above",
      ],
      correctOption: 1,
      explanation: "It's an idiom meaning those who act early gain an advantage.",
    },
    {
      testId: verbalTest.id,
      question: "Fill in the blank: She is _____ than her sister.",
      options: ["tall", "taller", "tallest", "more tall"],
      correctOption: 1,
      explanation: "Comparative adjective form: taller.",
    },
    {
      testId: verbalTest.id,
      question: "Choose the correctly spelled word:",
      options: ["Recieve", "Receive", "Receeve", "Receve"],
      correctOption: 1,
      explanation: "The correct spelling is 'Receive'.",
    },
  ]);

  console.log("Seeding tips...");
  await db.insert(tipsTable).values([
    {
      title: "Master the STAR Method",
      content:
        "Structure behavioral answers using Situation, Task, Action, and Result. This keeps your answers focused and lets interviewers quickly understand your impact.",
      category: "behavioral",
      tags: ["behavioral", "storytelling"],
    },
    {
      title: "Think Out Loud in Coding Interviews",
      content:
        "Interviewers care as much about your thought process as your final solution. Narrate your reasoning, mention trade-offs, and ask clarifying questions before coding.",
      category: "technical",
      tags: ["coding", "communication"],
    },
    {
      title: "Tailor Your Resume to Each Job",
      content:
        "Match keywords from the job description in your resume to pass ATS filters, and lead bullet points with quantifiable achievements rather than responsibilities.",
      category: "resume",
      tags: ["resume", "ats"],
    },
    {
      title: "Always Negotiate Your Offer",
      content:
        "Most companies expect negotiation and have room in their budget. Research market rates beforehand and ask for time to consider any offer before responding.",
      category: "negotiation",
      tags: ["salary", "negotiation"],
    },
    {
      title: "Prepare Smart Questions for the Interviewer",
      content:
        "Asking thoughtful questions about team structure, growth opportunities, or current challenges shows genuine interest and helps you evaluate the role too.",
      category: "general",
      tags: ["interview", "questions"],
    },
    {
      title: "Practice Whiteboard Communication",
      content:
        "Even in virtual interviews, practice explaining your code structure clearly using diagrams or comments so the interviewer can follow your logic easily.",
      category: "technical",
      tags: ["coding", "communication"],
    },
  ]);

  console.log("Seeding coding questions...");
  await db.insert(codingQuestionsTable).values([
    {
      title: "Two Sum",
      difficulty: "easy",
      topic: "Arrays",
      description:
        "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
      examples: JSON.stringify([
        { input: "nums = [2,7,11,15], target = 9", output: "[0,1]" },
      ]),
      company: "Google",
      starterCode: "function twoSum(nums, target) {\n  // your code here\n}",
      successRate: 85,
      tags: ["array", "hash-map"],
    },
    {
      title: "Reverse Linked List",
      difficulty: "medium",
      topic: "Linked List",
      description: "Given the head of a singly linked list, reverse the list and return the new head.",
      examples: JSON.stringify([
        { input: "head = [1,2,3,4,5]", output: "[5,4,3,2,1]" },
      ]),
      company: "Amazon",
      starterCode: "function reverseList(head) {\n  // your code here\n}",
      successRate: 70,
      tags: ["linked-list", "recursion"],
    },
    {
      title: "Valid Parentheses",
      difficulty: "easy",
      topic: "Stack",
      description:
        "Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
      examples: JSON.stringify([
        { input: "s = \"()[]{}\"", output: "true" },
      ]),
      company: "Microsoft",
      starterCode: "function isValid(s) {\n  // your code here\n}",
      successRate: 78,
      tags: ["string", "stack"],
    },
    {
      title: "Maximum Subarray",
      difficulty: "medium",
      topic: "Dynamic Programming",
      description:
        "Given an integer array nums, find the contiguous subarray with the largest sum and return its sum.",
      examples: JSON.stringify([
        { input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", output: "6" },
      ]),
      company: "Meta",
      starterCode: "function maxSubArray(nums) {\n  // your code here\n}",
      successRate: 65,
      tags: ["array", "dp"],
    },
    {
      title: "Binary Tree Level Order Traversal",
      difficulty: "medium",
      topic: "Trees",
      description:
        "Given the root of a binary tree, return the level order traversal of its nodes' values.",
      examples: JSON.stringify([
        { input: "root = [3,9,20,null,null,15,7]", output: "[[3],[9,20],[15,7]]" },
      ]),
      company: "Apple",
      starterCode: "function levelOrder(root) {\n  // your code here\n}",
      successRate: 72,
      tags: ["tree", "bfs"],
    },
  ]);

  console.log("Seed complete!");
}

seed()
  .then(() => pool.end())
  .catch((err) => {
    console.error("Seed failed:", err);
    pool.end();
    process.exit(1);
  });
