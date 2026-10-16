import { useListMockInterviews, useStartMockInterview } from "@workspace/api-client-react";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Video, Calendar, ArrowRight, PlayCircle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useLocation } from "wouter";
import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { PageHeader } from "@/components/page-header";

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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50/60 to-yellow-50">
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <PageHeader
        icon={<Video className="w-7 h-7 text-white" />}
        title="Mock Interviews"
        description="Simulate real technical & HR interview environments with detailed AI evaluation."
        gradient="from-orange-500 via-amber-500 to-yellow-400"
        iconBg="bg-white/20"
        badge="AI Evaluated"
        actions={
          <Dialog>
            <DialogTrigger asChild>
              <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm px-4 py-2 rounded-xl transition-colors">
                <PlayCircle className="w-4 h-4" /> Start New Session
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Configure Mock Interview</DialogTitle>
                <DialogDescription>Set up your personalized AI interview session.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Interview Type</label>
                  <Select value={type} onValueChange={(v: any) => setType(v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
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
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full mt-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white border-0" onClick={handleStart} disabled={startMutation.isPending}>
                  {startMutation.isPending ? "Preparing session..." : "Start Interview Now"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        }
      />

      <div className="rounded-xl border bg-gradient-to-r from-orange-50 to-amber-50 border-orange-200 p-5 flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shrink-0">
          <Video className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-orange-900">Pro Tip for Mocks</h3>
          <p className="text-sm text-orange-700/80 mt-0.5">Speak clearly and think out loud. The AI evaluates both your final answer and your thought process.</p>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-bold mb-4 text-gray-800">Past Sessions</h2>
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
    </div>
  );
}

