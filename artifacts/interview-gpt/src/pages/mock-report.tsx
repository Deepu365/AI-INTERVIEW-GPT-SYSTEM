import { 
  useGetMockInterview, 
  useSubmitMockAnswer, 
  useCompleteMockInterview 
} from "@workspace/api-client-react";
import { useParams, Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  ArrowLeft, 
  CheckCircle2, 
  ChevronRight, 
  Target, 
  Award, 
  BrainCircuit,
  MessageSquare,
  StopCircle,
  Play
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";

export default function MockSession() {
  const { id } = useParams();
  const { toast } = useToast();
  
  const { data: session, isLoading, refetch } = useGetMockInterview(Number(id), {
    query: { enabled: !!id }
  });

  const submitAnswerMutation = useSubmitMockAnswer();
  const completeMutation = useCompleteMockInterview();

  const [answer, setAnswer] = useState("");

  if (isLoading) return <div className="p-8 text-center text-muted-foreground">Loading session...</div>;
  if (!session) return <div className="p-8 text-center text-muted-foreground">Session not found</div>;

  const handleAnswerSubmit = () => {
    if (!answer.trim()) return;
    submitAnswerMutation.mutate(
      { 
        id: session.id, 
        data: { 
          questionIndex: session.questionsAnswered || 0, 
          answer 
        } 
      } as any, 
      {
        onSuccess: () => {
          setAnswer("");
          toast({ title: "Answer recorded", description: "Loading next question..." });
          refetch();
        }
      }
    );
  };

  const handleComplete = () => {
    completeMutation.mutate(
      { 
        id: session.id, 
        data: { sessionData: "completed" } 
      } as any,
      {
        onSuccess: () => {
          toast({ title: "Interview completed!", description: "Generating your final report..." });
          refetch();
        }
      }
    );
  };

  // ---------------------------------------------------------
  // INTERACTIVE SESSION VIEW (in_progress)
  // ---------------------------------------------------------
  if (session.status === 'in_progress') {
    const qAnswered = session.questionsAnswered || 0;
    const qTotal = session.totalQuestions || 5;
    const progress = (qAnswered / qTotal) * 100;

    return (
      <div className="flex flex-col h-[calc(100vh-4rem)] max-w-4xl mx-auto w-full p-4 md:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight capitalize">{session.type} Interview Session</h1>
            <p className="text-sm text-muted-foreground mt-1">Speak clearly and formulate your thoughts.</p>
          </div>
          <Button variant="destructive" size="sm" onClick={handleComplete} disabled={completeMutation.isPending}>
            <StopCircle className="w-4 h-4 mr-2" /> End Interview
          </Button>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm font-medium text-muted-foreground">
            <span>Progress</span>
            <span>{qAnswered} of {qTotal} Completed</span>
          </div>
          <Progress value={progress} />
        </div>

        <Card className="flex-1 flex flex-col shadow-lg border-primary/20">
          <CardHeader className="bg-muted/30 border-b pb-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <BrainCircuit className="w-5 h-5" />
              </div>
              <span className="font-semibold text-primary uppercase tracking-wider text-xs">AI Interviewer</span>
            </div>
            <CardTitle className="text-xl md:text-2xl leading-relaxed font-medium">
              {session.currentQuestion || "Let's begin the interview. Can you tell me a little about yourself?"}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 p-6 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-2">
              <label className="text-sm font-semibold flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-muted-foreground" /> Your Response
              </label>
              <Textarea 
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Type your answer here as if you are speaking to the interviewer..."
                className="flex-1 resize-none text-base p-4 leading-relaxed"
                autoFocus
              />
            </div>
          </CardContent>
          <div className="p-4 border-t bg-muted/20 flex justify-end">
            <Button 
              size="lg" 
              onClick={handleAnswerSubmit}
              disabled={!answer.trim() || submitAnswerMutation.isPending}
              className="gap-2"
            >
              {submitAnswerMutation.isPending ? "Submitting..." : "Submit Answer & Continue"} 
              <Play className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // ---------------------------------------------------------
  // REPORT VIEW (completed)
  // ---------------------------------------------------------
  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div className="flex items-center gap-4">
        <Link href="/mock">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight capitalize">{session.type} Mock Report</h1>
          <p className="text-muted-foreground mt-1">
            {new Date(session.createdAt).toLocaleDateString()} at {new Date(session.createdAt).toLocaleTimeString()}
          </p>
        </div>
        <Badge variant="default" className="ml-auto capitalize text-sm px-3 py-1">
          {session.status}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="col-span-1 md:col-span-4 bg-primary text-primary-foreground overflow-hidden relative shadow-lg border-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:linear-gradient(to_bottom,white,transparent)]"></div>
          <CardContent className="p-8 flex flex-col md:flex-row items-center justify-between relative z-10">
            <div className="text-center md:text-left mb-6 md:mb-0">
              <h2 className="text-lg font-medium opacity-90 uppercase tracking-widest">Overall Score</h2>
              <div className="text-7xl font-black tracking-tighter mt-1">{session.overallScore || 0}<span className="text-2xl opacity-70">/100</span></div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 w-full md:w-auto">
              <div className="text-center">
                <div className="text-xs uppercase tracking-widest opacity-80 mb-2">Technical</div>
                <div className="text-3xl font-bold">{session.technicalScore || '-'}</div>
              </div>
              <div className="text-center">
                <div className="text-xs uppercase tracking-widest opacity-80 mb-2">Communication</div>
                <div className="text-3xl font-bold">{session.communicationScore || '-'}</div>
              </div>
              <div className="text-center">
                <div className="text-xs uppercase tracking-widest opacity-80 mb-2">Confidence</div>
                <div className="text-3xl font-bold">{session.confidenceScore || '-'}</div>
              </div>
              <div className="text-center">
                <div className="text-xs uppercase tracking-widest opacity-80 mb-2">Problem Solving</div>
                <div className="text-3xl font-bold">{session.problemSolvingScore || '-'}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 shadow-sm border-t-4 border-t-green-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-600 dark:text-green-500">
              <Award className="w-5 h-5" /> Key Strengths
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {session.strengths?.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
              {!session.strengths?.length && <li className="text-muted-foreground text-sm">No strengths recorded yet.</li>}
            </ul>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 shadow-sm border-t-4 border-t-orange-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-600 dark:text-orange-500">
              <Target className="w-5 h-5" /> Areas for Improvement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {session.weaknesses?.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm">
                  <ChevronRight className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
              {!session.weaknesses?.length && <li className="text-muted-foreground text-sm">No weaknesses recorded yet.</li>}
            </ul>
          </CardContent>
        </Card>

        <Card className="md:col-span-4 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BrainCircuit className="w-5 h-5 text-primary" /> Actionable Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {session.recommendations?.map((item, i) => (
                <div key={i} className="p-4 rounded-lg bg-muted/50 border text-sm leading-relaxed">
                  {item}
                </div>
              ))}
              {!session.recommendations?.length && <div className="text-muted-foreground text-sm">No recommendations yet.</div>}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
