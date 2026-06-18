import { useListMockInterviews, useStartMockInterview } from "@workspace/api-client-react";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Video, Calendar, ArrowRight, PlayCircle, Clock } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useLocation } from "wouter";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Mock() {
  const { data: sessions, isLoading } = useListMockInterviews();
  const startMutation = useStartMockInterview();
  const [, setLocation] = useLocation();

  const [type, setType] = useState<"technical" | "hr" | "mixed">("mixed");
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("medium");

  const handleStart = () => {
    startMutation.mutate({ data: { type, difficulty } }, {
      onSuccess: (data) => {
        setLocation(`/mock/${data.id}`);
      }
    });
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Mock Interviews</h1>
          <p className="text-muted-foreground mt-1">Simulate real interview environments with AI.</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button size="lg" className="gap-2">
              <PlayCircle className="w-5 h-5" /> Start New Session
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Configure Mock Interview</DialogTitle>
              <DialogDescription>
                Set up your personalized AI interview session.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Interview Type</label>
                <Select value={type} onValueChange={(v: any) => setType(v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technical">Technical Only</SelectItem>
                    <SelectItem value="hr">HR / Behavioral Only</SelectItem>
                    <SelectItem value="mixed">Mixed (Technical + HR)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Difficulty</label>
                <Select value={difficulty} onValueChange={(v: any) => setDifficulty(v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full mt-4" onClick={handleStart} disabled={startMutation.isPending}>
                {startMutation.isPending ? "Preparing session..." : "Start Interview Now"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-1 md:col-span-3 bg-primary/5 border-primary/20">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Video className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Pro Tip for Mocks</h3>
                <p className="text-sm text-muted-foreground mt-1">Speak clearly and think out loud. The AI evaluates both your final answer and your thought process.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Past Sessions</h2>
        {isLoading ? (
          <div className="text-center p-8 text-muted-foreground">Loading past sessions...</div>
        ) : !sessions?.length ? (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <Video className="w-12 h-12 text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-medium">No mock interviews yet</h3>
              <p className="text-muted-foreground mt-2">Your completed mock interview reports will appear here.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sessions.map((session) => (
              <Card key={session.id} className="hover-elevate transition-all">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <Badge variant={session.status === 'completed' ? 'default' : 'secondary'} className="capitalize">
                      {session.status}
                    </Badge>
                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(session.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <CardTitle className="text-lg mt-2 capitalize">{session.type} Interview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-end">
                    <div>
                      {session.overallScore !== null && session.overallScore !== undefined ? (
                        <div className="flex items-baseline gap-1">
                          <span className="text-3xl font-bold">{session.overallScore}</span>
                          <span className="text-sm text-muted-foreground">/100</span>
                        </div>
                      ) : (
                        <div className="text-sm text-muted-foreground italic">No score yet</div>
                      )}
                    </div>
                    <Link href={`/mock/${session.id}`}>
                      <Button variant="ghost" size="sm" className="gap-1 hover:text-primary">
                        View Report <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
