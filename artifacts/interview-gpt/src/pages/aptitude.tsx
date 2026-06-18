import { useListAptitudeTests, useGetAptitudeHistory } from "@workspace/api-client-react";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BrainCircuit, Clock, Target, Play, History } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Aptitude() {
  const { data: tests, isLoading: testsLoading } = useListAptitudeTests();
  const { data: history, isLoading: historyLoading } = useGetAptitudeHistory();

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Aptitude Tests</h1>
        <p className="text-muted-foreground mt-1">Sharpen your quantitative and logical reasoning skills under time pressure.</p>
      </div>

      <Tabs defaultValue="available" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="available">Available Tests</TabsTrigger>
          <TabsTrigger value="history">Your History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="available" className="space-y-6">
          {testsLoading ? (
            <div>Loading tests...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tests?.map((test) => (
                <Card key={test.id} className="hover-elevate transition-all flex flex-col h-full">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="outline" className="capitalize">{test.category.replace('_', ' ')}</Badge>
                      <Badge variant={test.difficulty === 'hard' ? 'destructive' : test.difficulty === 'medium' ? 'default' : 'secondary'}>
                        {test.difficulty}
                      </Badge>
                    </div>
                    <CardTitle className="line-clamp-2">{test.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{test.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="mt-auto">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6 bg-muted/50 p-3 rounded-lg">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-primary" />
                        <span>{test.duration} mins</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Target className="w-4 h-4 text-primary" />
                        <span>{test.totalQuestions} Qs</span>
                      </div>
                    </div>
                    <Link href={`/aptitude/${test.id}`}>
                      <Button className="w-full gap-2">
                        <Play className="w-4 h-4" /> Start Test
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="history">
          {historyLoading ? (
            <div>Loading history...</div>
          ) : !history?.length ? (
            <div className="text-center py-16 bg-muted/30 rounded-lg border border-dashed">
              <History className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium">No tests taken yet</h3>
              <p className="text-muted-foreground mt-1">Complete your first aptitude test to see your history.</p>
            </div>
          ) : (
            <div className="bg-card border rounded-lg overflow-hidden">
              <div className="grid grid-cols-5 p-4 border-b bg-muted/50 text-sm font-medium text-muted-foreground">
                <div className="col-span-2">Test Name</div>
                <div>Category</div>
                <div>Score</div>
                <div>Date Completed</div>
              </div>
              <div className="divide-y">
                {history.map((attempt: any) => (
                  <div key={attempt.id} className="grid grid-cols-5 p-4 items-center hover:bg-muted/30 transition-colors">
                    <div className="col-span-2 font-medium">{attempt.testTitle}</div>
                    <div className="text-sm capitalize">{attempt.category.replace('_', ' ')}</div>
                    <div>
                      <Badge variant="secondary" className="font-mono">{attempt.score}%</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(attempt.completedAt).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
