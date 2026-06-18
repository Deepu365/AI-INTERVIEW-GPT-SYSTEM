import { useState } from "react";
import { useParams } from "wouter";
import { useGetCodingQuestion, useSubmitCodingSolution } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Play, CheckCircle2, XCircle, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export default function CodingQuestion() {
  const { id } = useParams();
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState<"javascript" | "python" | "java" | "cpp" | "typescript">("javascript");
  
  const { data: question, isLoading } = useGetCodingQuestion(Number(id), {
    query: { enabled: !!id, queryKey: ['codingQuestion', id] }
  });

  const submitMutation = useSubmitCodingSolution();

  // Initialize code when question loads
  useState(() => {
    if (question?.starterCode && !code) {
      setCode(question.starterCode);
    }
  });

  if (isLoading || !question) return <div className="p-8">Loading...</div>;

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden">
      {/* Left panel - Question */}
      <div className="w-1/3 border-r flex flex-col h-full bg-card overflow-y-auto">
        <div className="p-4 border-b flex items-center gap-4 sticky top-0 bg-card z-10">
          <Link href="/coding">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div className="flex-1 font-semibold truncate">{question.title}</div>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex items-center gap-2">
            <Badge variant={
              question.difficulty === "easy" ? "secondary" : 
              question.difficulty === "medium" ? "default" : "destructive"
            } className="capitalize">
              {question.difficulty}
            </Badge>
            <Badge variant="outline">{question.topic}</Badge>
            {question.company && <Badge variant="outline" className="bg-primary/5">{question.company}</Badge>}
          </div>

          <div className="prose prose-sm dark:prose-invert max-w-none">
            <p>{question.description}</p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Examples</h3>
            {question.examples.map((ex, i) => (
              <div key={i} className="bg-muted p-4 rounded-md font-mono text-sm space-y-2">
                <div><span className="text-muted-foreground">Input:</span> {ex.input}</div>
                <div><span className="text-muted-foreground">Output:</span> {ex.output}</div>
                {ex.explanation && (
                  <div className="text-muted-foreground mt-2 pt-2 border-t border-border/50 text-xs font-sans">
                    {ex.explanation}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel - Editor & Results */}
      <div className="flex-1 flex flex-col h-full">
        <div className="h-12 border-b flex items-center justify-between px-4 bg-muted/20">
          <Select value={language} onValueChange={(v: any) => setLanguage(v)}>
            <SelectTrigger className="w-[150px] h-8 bg-background">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="javascript">JavaScript</SelectItem>
              <SelectItem value="typescript">TypeScript</SelectItem>
              <SelectItem value="python">Python</SelectItem>
              <SelectItem value="java">Java</SelectItem>
              <SelectItem value="cpp">C++</SelectItem>
            </SelectContent>
          </Select>

          <Button 
            size="sm" 
            className="gap-2"
            onClick={() => submitMutation.mutate({ data: { code: code || question.starterCode || "", language } })}
            disabled={submitMutation.isPending}
          >
            <Play className="w-4 h-4" />
            {submitMutation.isPending ? "Running..." : "Submit Code"}
          </Button>
        </div>

        <div className="flex-1 relative flex flex-col bg-[#1e1e1e]">
          <textarea
            className="flex-1 w-full p-4 bg-transparent text-[#d4d4d4] font-mono text-sm resize-none focus:outline-none focus:ring-0 leading-relaxed"
            value={code || question.starterCode || ""}
            onChange={(e) => setCode(e.target.value)}
            spellCheck={false}
            placeholder="// Write your solution here..."
          />
        </div>

        {/* Results Panel */}
        {submitMutation.data && (
          <div className="h-[250px] border-t bg-card flex flex-col">
            <div className="p-2 border-b font-medium text-sm flex items-center gap-2 px-4">
              {submitMutation.data.passed ? (
                <span className="text-green-500 flex items-center gap-1"><CheckCircle2 className="w-4 h-4"/> Accepted</span>
              ) : (
                <span className="text-destructive flex items-center gap-1"><XCircle className="w-4 h-4"/> Rejected</span>
              )}
            </div>
            <div className="p-4 flex-1 overflow-y-auto space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-muted rounded p-3 text-center">
                  <div className="text-xs text-muted-foreground uppercase mb-1">Test Cases</div>
                  <div className="font-mono text-lg">{submitMutation.data.testCasesPassed} / {submitMutation.data.totalTestCases}</div>
                </div>
                <div className="bg-muted rounded p-3 text-center">
                  <div className="text-xs text-muted-foreground uppercase mb-1">Time</div>
                  <div className="font-mono text-lg">{submitMutation.data.timeComplexity}</div>
                </div>
                <div className="bg-muted rounded p-3 text-center">
                  <div className="text-xs text-muted-foreground uppercase mb-1">Space</div>
                  <div className="font-mono text-lg">{submitMutation.data.spaceComplexity}</div>
                </div>
              </div>
              <div className="text-sm p-4 bg-muted/50 rounded-md border">
                {submitMutation.data.feedback}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
