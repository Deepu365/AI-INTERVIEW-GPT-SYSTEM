import { useListCodingQuestions, useGetCodingTopics } from "@workspace/api-client-react";
import { Link } from "wouter";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Code2, CheckCircle2, Circle, Flame, TrendingUp, Trophy } from "lucide-react";
import { useState } from "react";
import { PageHeader } from "@/components/page-header";

const difficultyConfig = {
  easy: { label: "Easy", textColor: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200", dot: "bg-emerald-500" },
  medium: { label: "Medium", textColor: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200", dot: "bg-amber-500" },
  hard: { label: "Hard", textColor: "text-red-600", bg: "bg-red-50", border: "border-red-200", dot: "bg-red-500" },
};

export default function Coding() {
  const [topic, setTopic] = useState<string>("all");
  const [difficulty, setDifficulty] = useState<string>("all");

  const { data: questions, isLoading } = useListCodingQuestions({
    topic: topic !== "all" ? topic : undefined,
    difficulty: difficulty !== "all" ? difficulty as any : undefined,
  });

  const { data: topics } = useGetCodingTopics();

  const total = questions?.length ?? 0;
  const solved = questions?.filter(q => q.isSolved).length ?? 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50/40 to-indigo-50/60">
      <div className="p-6 max-w-6xl mx-auto">
        <PageHeader
          icon={<Code2 className="w-7 h-7 text-white" />}
          title="Coding Practice"
          description="Master algorithms, data structures and system design with 500+ problems."
          gradient="from-blue-600 via-blue-500 to-cyan-500"
          iconBg="bg-white/20"
          badge="500+ Problems"
        />

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl p-4 text-white shadow-lg shadow-blue-200">
            <div className="flex items-center gap-2 mb-1">
              <Trophy className="w-4 h-4 text-blue-100" />
              <span className="text-blue-100 text-xs font-semibold uppercase tracking-wider">Solved</span>
            </div>
            <div className="text-3xl font-black">{solved}</div>
            <div className="text-blue-200 text-xs mt-0.5">of {total} problems</div>
          </div>
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-4 text-white shadow-lg shadow-emerald-200">
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-100" />
              <span className="text-emerald-100 text-xs font-semibold uppercase tracking-wider">Easy</span>
            </div>
            <div className="text-3xl font-black">{questions?.filter(q => q.difficulty === "easy" && q.isSolved).length ?? 0}</div>
            <div className="text-emerald-200 text-xs mt-0.5">completed</div>
          </div>
          <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-4 text-white shadow-lg shadow-amber-200">
            <div className="flex items-center gap-2 mb-1">
              <Flame className="w-4 h-4 text-amber-100" />
              <span className="text-amber-100 text-xs font-semibold uppercase tracking-wider">Medium</span>
            </div>
            <div className="text-3xl font-black">{questions?.filter(q => q.difficulty === "medium" && q.isSolved).length ?? 0}</div>
            <div className="text-amber-200 text-xs mt-0.5">completed</div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400" />
            <Input placeholder="Search questions..." className="pl-9 bg-white border-blue-100 focus:border-blue-400 rounded-xl shadow-sm" />
          </div>
          <Select value={difficulty} onValueChange={setDifficulty}>
            <SelectTrigger className="w-[180px] bg-white border-blue-100 rounded-xl shadow-sm">
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
            <SelectTrigger className="w-[180px] bg-white border-blue-100 rounded-xl shadow-sm">
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

        {/* Question List */}
        <div className="bg-white rounded-2xl border border-blue-100 shadow-sm overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-12 px-5 py-3.5 border-b border-blue-50 bg-gradient-to-r from-blue-50 to-cyan-50 text-xs font-bold text-blue-600 uppercase tracking-wider">
            <div className="col-span-1 text-center">Done</div>
            <div className="col-span-6">Problem Title</div>
            <div className="col-span-2">Difficulty</div>
            <div className="col-span-3">Topic</div>
          </div>

          {isLoading ? (
            <div className="p-10 text-center text-blue-400 font-medium">Loading questions...</div>
          ) : (
            <div className="divide-y divide-blue-50/60">
              {questions?.map((q, idx) => {
                const diff = difficultyConfig[q.difficulty as keyof typeof difficultyConfig] ?? difficultyConfig.easy;
                return (
                  <Link key={q.id} href={`/coding/${q.id}`}>
                    <div className={`grid grid-cols-12 px-5 py-3.5 items-center hover:bg-blue-50/50 transition-colors cursor-pointer group ${q.isSolved ? "bg-emerald-50/20" : ""}`}>
                      <div className="col-span-1 flex justify-center">
                        {q.isSolved ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                        ) : (
                          <Circle className="w-5 h-5 text-blue-200 group-hover:text-blue-300 transition-colors" />
                        )}
                      </div>
                      <div className="col-span-6">
                        <span className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors text-sm">
                          {idx + 1}. {q.title}
                        </span>
                      </div>
                      <div className="col-span-2">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full ${diff.bg} ${diff.textColor} border ${diff.border}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${diff.dot}`} />
                          {diff.label}
                        </span>
                      </div>
                      <div className="col-span-3">
                        <span className="text-xs font-medium text-gray-500 bg-gray-50 border border-gray-100 px-2 py-1 rounded-lg">
                          {q.topic}
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
              {!questions?.length && (
                <div className="p-10 text-center text-blue-400 font-medium">No questions found matching your criteria.</div>
              )}
            </div>
          )}
        </div>

        {/* Progress bar */}
        {total > 0 && (
          <div className="mt-4 bg-white rounded-2xl border border-blue-100 shadow-sm p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-gray-700 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-blue-500" /> Overall Progress
              </span>
              <span className="text-sm font-black text-blue-600">{Math.round((solved / total) * 100)}%</span>
            </div>
            <div className="h-2.5 bg-blue-50 rounded-full overflow-hidden border border-blue-100">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-700"
                style={{ width: `${(solved / total) * 100}%` }}
              />
            </div>
            <div className="mt-1.5 text-xs text-gray-400">{solved} of {total} problems solved</div>
          </div>
        )}
      </div>
    </div>
  );
}
