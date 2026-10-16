type EvaluateInput = {
  type: string;
  difficulty: string | null;
  targetCompany: string | null;
  questions: string[];
  answers: { questionIndex: number; answer: string }[];
};

type EvaluateResult = {
  overallScore: number;
  technicalScore: number;
  communicationScore: number;
  confidenceScore: number; // <-- ee line add cheyyi
  problemSolvingScore: number;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
};

export async function evaluateWithMCP(
  input: EvaluateInput
): Promise<EvaluateResult> {

  const avgScore = Math.floor(Math.random() * 40) + 60;

  return {
    overallScore: avgScore,
    technicalScore: avgScore - 5,
    communicationScore: avgScore + 2,
    confidenceScore: avgScore - 2,
    problemSolvingScore: avgScore,
    strengths: [
      "Clear communication",
      "Good problem solving"
    ],
    weaknesses: [
      "Needs more examples",
      "Time management"
    ],
    recommendations: [
      "Practice STAR method",
      "Solve 2 LeetCode medium problems daily"
    ]
  };
}