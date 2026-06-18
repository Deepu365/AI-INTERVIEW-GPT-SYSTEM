import { useGetLeaderboard } from "@workspace/api-client-react";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Medal, Award, UserCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/page-header";

export default function Leaderboard() {
  const [category, setCategory] = useState<"overall" | "coding" | "hr" | "aptitude">("overall");
  const { data: entries, isLoading } = useGetLeaderboard({
    query: { queryKey: ['leaderboard', category] }
  });

  const getRankIcon = (rank: number) => {
    switch(rank) {
      case 1: return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 2: return <Medal className="w-6 h-6 text-gray-400" />;
      case 3: return <Medal className="w-6 h-6 text-amber-700" />;
      default: return <span className="text-lg font-bold text-muted-foreground w-6 text-center">{rank}</span>;
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <PageHeader
        icon={<Trophy className="w-7 h-7 text-white" />}
        title="Global Leaderboard"
        description="See how you stack up against top candidates preparing for their next big role."
        gradient="from-amber-500 via-yellow-500 to-orange-400"
        iconBg="bg-white/20"
        badge="Live Rankings"
      />

      <Tabs value={category} onValueChange={(v: any) => setCategory(v)} className="w-full">
        <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto mb-8">
          <TabsTrigger value="overall">Overall</TabsTrigger>
          <TabsTrigger value="coding">Coding</TabsTrigger>
          <TabsTrigger value="hr">HR / Behavorial</TabsTrigger>
          <TabsTrigger value="aptitude">Aptitude</TabsTrigger>
        </TabsList>
        
        <TabsContent value={category}>
          <Card className="overflow-hidden border-primary/10 shadow-lg">
            <div className="grid grid-cols-12 p-4 border-b bg-muted/50 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              <div className="col-span-2 text-center">Rank</div>
              <div className="col-span-5">Candidate</div>
              <div className="col-span-2 text-right">Score</div>
              <div className="col-span-3 text-right">Questions</div>
            </div>
            
            {isLoading ? (
              <div className="p-12 text-center text-muted-foreground">Loading rankings...</div>
            ) : (
              <div className="divide-y divide-border/50">
                {entries?.map((entry) => (
                  <div 
                    key={entry.rank} 
                    className={`grid grid-cols-12 p-4 items-center transition-colors hover:bg-muted/30 ${
                      entry.isCurrentUser ? 'bg-primary/5 border-l-4 border-l-primary' : ''
                    }`}
                  >
                    <div className="col-span-2 flex justify-center items-center">
                      {getRankIcon(entry.rank)}
                    </div>
                    <div className="col-span-5 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                        <UserCircle className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="font-semibold text-foreground flex items-center gap-2">
                          {entry.name}
                          {entry.isCurrentUser && <Badge variant="default" className="h-5 px-1.5 text-[10px]">YOU</Badge>}
                        </div>
                        {entry.badge && entry.badge !== 'participant' && (
                          <div className="text-xs text-muted-foreground capitalize flex items-center gap-1 mt-0.5">
                            <Award className="w-3 h-3 text-primary" />
                            {entry.badge} Badge
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-span-2 text-right font-mono font-bold text-lg text-primary">
                      {entry.score.toLocaleString()}
                    </div>
                    <div className="col-span-3 text-right text-muted-foreground">
                      {entry.questionsAttempted} solved
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
