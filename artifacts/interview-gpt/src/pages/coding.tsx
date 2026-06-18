import { useListCodingQuestions, useGetCodingTopics } from "@workspace/api-client-react";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Code2, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export default function Coding() {
  const [topic, setTopic] = useState<string>("all");
  const [difficulty, setDifficulty] = useState<string>("all");

  const { data: questions, isLoading } = useListCodingQuestions({
    topic: topic !== "all" ? topic : undefined,
    difficulty: difficulty !== "all" ? difficulty as any : undefined,
  });

  const { data: topics } = useGetCodingTopics();

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Coding Practice</h1>
          <p className="text-muted-foreground mt-1">Master algorithms and data structures.</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search questions..." className="pl-9" />
        </div>
        <Select value={difficulty} onValueChange={setDifficulty}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Difficulties</SelectItem>
            <SelectItem value="easy">Easy</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="hard">Hard</SelectItem>
          </SelectContent>
        </Select>
        <Select value={topic} onValueChange={setTopic}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Topic" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Topics</SelectItem>
            {topics?.map(t => (
              <SelectItem key={t.topic} value={t.topic}>{t.topic}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="bg-card rounded-lg border shadow-sm overflow-hidden">
        <div className="grid grid-cols-12 p-4 border-b bg-muted/50 text-sm font-medium text-muted-foreground">
          <div className="col-span-1 text-center">Status</div>
          <div className="col-span-6">Title</div>
          <div className="col-span-2">Difficulty</div>
          <div className="col-span-3">Topic</div>
        </div>
        
        {isLoading ? (
          <div className="p-8 text-center text-muted-foreground">Loading questions...</div>
        ) : (
          <div className="divide-y">
            {questions?.map(q => (
              <Link key={q.id} href={`/coding/${q.id}`}>
                <div className="grid grid-cols-12 p-4 items-center hover:bg-muted/30 transition-colors cursor-pointer group">
                  <div className="col-span-1 flex justify-center">
                    {q.isSolved ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-muted-foreground/30" />
                    )}
                  </div>
                  <div className="col-span-6 font-medium group-hover:text-primary transition-colors">
                    {q.title}
                  </div>
                  <div className="col-span-2">
                    <Badge variant={
                      q.difficulty === "easy" ? "secondary" : 
                      q.difficulty === "medium" ? "default" : "destructive"
                    } className="capitalize">
                      {q.difficulty}
                    </Badge>
                  </div>
                  <div className="col-span-3 text-sm text-muted-foreground">
                    {q.topic}
                  </div>
                </div>
              </Link>
            ))}
            {!questions?.length && (
              <div className="p-8 text-center text-muted-foreground">No questions found matching your criteria.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
