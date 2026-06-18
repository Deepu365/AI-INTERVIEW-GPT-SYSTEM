import { useState, useEffect } from "react";
import { useParams, useLocation } from "wouter";
import { useCreateAptitudeAttempt, useSubmitAptitudeAttempt } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Clock, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AptitudeTest() {
  const { id } = useParams();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const createMutation = useCreateAptitudeAttempt();
  const submitMutation = useSubmitAptitudeAttempt();
  
  const [attempt, setAttempt] = useState<any>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [currentIdx, setCurrentIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 mins default
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<any>(null);

  // Initialize test on mount
  useEffect(() => {
    if (id && !attempt && !createMutation.isPending && !createMutation.isSuccess) {
      createMutation.mutate({ data: { testId: Number(id) } }, {
        onSuccess: (data) => {
          setAttempt(data);
          // Assuming 30 minutes if not specified in response
          setTimeLeft(30 * 60);
        },
        onError: () => {
          toast({ title: "Failed to start test", variant: "destructive" });
          setLocation("/aptitude");
        }
      });
    }
  }, [id, attempt, createMutation, setLocation, toast]);

  // Timer logic
  useEffect(() => {
    if (!attempt || submitted || timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(timer);
  }, [attempt, timeLeft, submitted]);

  // Auto-submit on timeout
  useEffect(() => {
    if (timeLeft === 0 && !submitted && attempt) {
      handleSubmit();
    }
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (optIdx: number) => {
    if (!attempt) return;
    const currentQ = attempt.questions[currentIdx];
    setAnswers(prev => ({ ...prev, [currentQ.id]: optIdx }));
  };

  const handleSubmit = () => {
    if (!attempt) return;
    setSubmitted(true);
    
    const answerList = Object.entries(answers).map(([qId, opt]) => ({
      questionId: Number(qId),
      selectedOption: opt
    }));

    submitMutation.mutate(
      { id: attempt.id, data: { answers: answerList } } as any,
      {
        onSuccess: (res) => {
          setResult(res);
          toast({ title: "Test submitted successfully!" });
        },
        onError: () => {
          toast({ title: "Error submitting test", variant: "destructive" });
          setSubmitted(false);
        }
      }
    );
  };

  if (createMutation.isPending || (!attempt && !createMutation.isError)) {
    return <div className="flex h-screen items-center justify-center text-muted-foreground">Preparing your test...</div>;
  }

  if (result) {
    return (
      <div className="p-8 max-w-3xl mx-auto flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
        <Card className="w-full text-center p-8 border-primary/20">
          <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold tracking-tight mb-2">Test Completed</h1>
          <p className="text-muted-foreground mb-8">Great job finishing the assessment!</p>
          
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="bg-muted p-4 rounded-lg">
              <div className="text-3xl font-bold text-primary">{result.score}%</div>
              <div className="text-sm font-medium uppercase text-muted-foreground mt-1">Score</div>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <div className="text-3xl font-bold text-primary">{result.correctAnswers}/{result.totalQuestions}</div>
              <div className="text-sm font-medium uppercase text-muted-foreground mt-1">Correct</div>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <div className="text-3xl font-bold text-primary">{Math.floor((result.timeTaken || 0) / 60)}m</div>
              <div className="text-sm font-medium uppercase text-muted-foreground mt-1">Time Taken</div>
            </div>
          </div>
          
          <Button size="lg" onClick={() => setLocation("/aptitude")}>
            Back to Dashboard
          </Button>
        </Card>
      </div>
    );
  }

  const currentQ = attempt?.questions?.[currentIdx];
  const totalQ = attempt?.questions?.length || 0;
  const progress = ((currentIdx + 1) / totalQ) * 100;

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-background max-w-4xl mx-auto w-full p-4 md:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight">Aptitude Assessment</h1>
          <div className="text-sm text-muted-foreground flex items-center gap-2">
            Question {currentIdx + 1} of {totalQ}
          </div>
        </div>
        
        <div className={`flex items-center gap-2 px-4 py-2 rounded-full font-mono text-lg font-semibold ${timeLeft < 300 ? 'bg-destructive/10 text-destructive' : 'bg-muted text-foreground'}`}>
          <Clock className="w-5 h-5" />
          {formatTime(timeLeft)}
        </div>
      </div>

      <Progress value={progress} className="mb-8" />

      {/* Question */}
      {currentQ && (
        <Card className="flex-1 flex flex-col shadow-sm">
          <CardHeader className="bg-muted/30 border-b pb-6">
            <CardTitle className="text-xl leading-relaxed font-medium">
              {currentQ.question}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 p-6 overflow-y-auto">
            <RadioGroup 
              value={answers[currentQ.id]?.toString()} 
              onValueChange={(v) => handleSelectOption(Number(v))}
              className="space-y-3"
            >
              {currentQ.options.map((opt: string, idx: number) => (
                <div 
                  key={idx} 
                  className={`flex items-center space-x-3 border p-4 rounded-lg cursor-pointer transition-colors ${
                    answers[currentQ.id] === idx ? 'bg-primary/5 border-primary shadow-sm' : 'hover:bg-muted/50'
                  }`}
                  onClick={() => handleSelectOption(idx)}
                >
                  <RadioGroupItem value={idx.toString()} id={`opt-${idx}`} />
                  <Label htmlFor={`opt-${idx}`} className="flex-1 cursor-pointer text-base leading-relaxed font-normal">
                    {opt}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
          <div className="p-4 border-t bg-muted/20 flex items-center justify-between">
            <Button 
              variant="outline" 
              onClick={() => setCurrentIdx(prev => Math.max(0, prev - 1))}
              disabled={currentIdx === 0}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" /> Previous
            </Button>
            
            {currentIdx === totalQ - 1 ? (
              <Button 
                onClick={handleSubmit} 
                className="gap-2"
                disabled={submitMutation.isPending}
              >
                {submitMutation.isPending ? "Submitting..." : "Submit Test"} <CheckCircle2 className="w-4 h-4" />
              </Button>
            ) : (
              <Button 
                onClick={() => setCurrentIdx(prev => Math.min(totalQ - 1, prev + 1))}
                className="gap-2"
              >
                Next Question <ArrowRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </Card>
      )}
    </div>
  );
}
