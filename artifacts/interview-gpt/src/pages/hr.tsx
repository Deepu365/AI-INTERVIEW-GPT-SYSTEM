import { useListHrQuestions, useEvaluateHrAnswer } from "@workspace/api-client-react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Users, ChevronRight, CheckCircle2, MessageSquare, Lightbulb } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { PageHeader } from "@/components/page-header";

export default function Hr() {
  const [category, setCategory] = useState<string>("all");
  const [selectedQuestionId, setSelectedQuestionId] = useState<number | null>(null);
  const [answer, setAnswer] = useState("");
  
  const { data: questions, isLoading } = useListHrQuestions({
    query: { queryKey: ['listHrQuestions', category] }
  });
  
  const evaluateMutation = useEvaluateHrAnswer();
  const { toast } = useToast();

  const handleEvaluate = () => {
    if (!selectedQuestionId || !answer) return;
    evaluateMutation.mutate(
      { id: selectedQuestionId, data: { answer } } as any,
      { onSuccess: () => { toast({ title: "Answer evaluated!" }); } }
    );
  };

  const selectedQuestion = questions?.find(q => q.id === selectedQuestionId);

  return (
    <div className="p-6 max-w-6xl mx-auto flex flex-col gap-4" style={{ height: 'calc(100vh - 0px)' }}>
      <PageHeader
        icon={<Users className="w-7 h-7 text-white" />}
        title="HR Interview Prep"
        description="Master behavioral questions with AI-powered STAR feedback and scoring."
        gradient="from-violet-600 via-purple-500 to-fuchsia-500"
        iconBg="bg-white/20"
        badge="AI Feedback"
      />

      <div className="flex gap-6 flex-1 overflow-hidden min-h-0">
        {/* Left List */}
        <div className="w-72 flex flex-col gap-3 shrink-0">
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="self_introduction">Self Introduction</SelectItem>
              <SelectItem value="strengths_weaknesses">Strengths & Weaknesses</SelectItem>
              <SelectItem value="leadership">Leadership</SelectItem>
              <SelectItem value="teamwork">Teamwork</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex-1 overflow-y-auto space-y-2 pr-1">
            {isLoading ? (
              <div className="p-4 text-center text-muted-foreground">Loading...</div>
            ) : (
              questions?.map(q => (
                <Card 
                  key={q.id} 
                  className={`cursor-pointer transition-all hover:shadow-md ${selectedQuestionId === q.id ? 'border-violet-400 shadow-md bg-violet-50/50' : ''}`}
                  onClick={() => { setSelectedQuestionId(q.id); setAnswer(""); evaluateMutation.reset(); }}
                >
                  <CardContent className="p-3 flex gap-2.5 items-start">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${selectedQuestionId === q.id ? 'bg-violet-500' : 'bg-violet-100'}`}>
                      <MessageSquare className={`w-3.5 h-3.5 ${selectedQuestionId === q.id ? 'text-white' : 'text-violet-600'}`} />
                    </div>
                    <div>
                      <h3 className="font-medium text-sm line-clamp-2">{q.question}</h3>
                      <Badge variant="secondary" className="mt-1.5 text-[10px] capitalize">{q.category.replace('_', ' ')}</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>

        {/* Right Practice Area */}
        <div className="flex-1 flex flex-col bg-card border rounded-xl overflow-hidden shadow-sm">
          {selectedQuestion ? (
            <div className="flex flex-col h-full">
              <div className="p-5 border-b bg-violet-50/40">
                <h2 className="text-lg font-semibold leading-relaxed">{selectedQuestion.question}</h2>
                <div className="mt-3 p-3 bg-violet-50 rounded-lg border border-violet-200">
                  <h4 className="flex items-center gap-2 text-sm font-semibold text-violet-700 mb-2">
                    <Lightbulb className="w-4 h-4" /> Tips for this question
                  </h4>
                  <ul className="list-disc list-inside text-sm text-violet-600/80 space-y-1 ml-4">
                    {selectedQuestion.tips?.map((tip, i) => (
                      <li key={i}>{tip}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex-1 p-5 flex flex-col gap-4 overflow-y-auto">
                <div className="flex-1 flex flex-col gap-2">
                  <label className="text-sm font-medium">Your Answer</label>
                  <Textarea 
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="Type your answer here using the STAR method: Situation, Task, Action, Result..."
                    className="flex-1 resize-none text-sm p-3 leading-relaxed min-h-[140px]"
                  />
                </div>

                <div className="flex justify-end">
                  <Button 
                    onClick={handleEvaluate} 
                    disabled={!answer || evaluateMutation.isPending}
                    className="bg-gradient-to-r from-violet-600 to-purple-600 text-white border-0"
                  >
                    {evaluateMutation.isPending ? "Evaluating..." : "Get AI Feedback"}
                  </Button>
                </div>

                {evaluateMutation.data && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                    <div className="flex items-center gap-4 p-4 border rounded-xl bg-gradient-to-r from-violet-50 to-purple-50 border-violet-200">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center text-2xl font-bold text-white shadow-md">
                        {evaluateMutation.data.score}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Feedback Score</h3>
                        <p className="text-sm text-muted-foreground">Grammar: {evaluateMutation.data.grammarScore} / Relevance: {evaluateMutation.data.relevanceScore}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <Card className="border-green-200 bg-green-50/30">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm text-green-600 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4" /> What you did well
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="list-disc list-inside text-sm space-y-1">
                            {evaluateMutation.data.positivePoints?.map((p: string, i: number) => <li key={i}>{p}</li>)}
                          </ul>
                        </CardContent>
                      </Card>
                      <Card className="border-orange-200 bg-orange-50/30">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm text-orange-600 flex items-center gap-2">
                            <ChevronRight className="w-4 h-4" /> Areas to improve
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="list-disc list-inside text-sm space-y-1">
                            {evaluateMutation.data.improvements?.map((p: string, i: number) => <li key={i}>{p}</li>)}
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-100 to-purple-100 flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-violet-500" />
              </div>
              <h3 className="text-lg font-medium">Select a question</h3>
              <p className="text-sm text-muted-foreground mt-2 max-w-sm">
                Choose a question from the list on the left to start practicing your behavioral interview answers.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
