import { Link } from "wouter";
import {
  useGetDashboardStats,
  useGetStudyStreak,
  useGetPerformanceAnalytics,
  useGetDashboardActivity
} from "@workspace/api-client-react";
import {
  Trophy, Flame, Target, Briefcase, PlayCircle, FileCode2,
  Users, BrainCircuit, ArrowRight, Video, BookOpen, TrendingUp, Zap
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import { useAuth } from "@/hooks/use-auth";

const activityTypeConfig: Record<string, { color: string; bg: string; dot: string }> = {
  coding:   { color: "text-blue-600",   bg: "bg-blue-50",   dot: "bg-blue-500" },
  hr:       { color: "text-violet-600", bg: "bg-violet-50", dot: "bg-violet-500" },
  mock:     { color: "text-orange-600", bg: "bg-orange-50", dot: "bg-orange-500" },
  aptitude: { color: "text-emerald-600",bg: "bg-emerald-50",dot: "bg-emerald-500" },
  resume:   { color: "text-rose-600",   bg: "bg-rose-50",   dot: "bg-rose-500" },
  jd:       { color: "text-cyan-600",   bg: "bg-cyan-50",   dot: "bg-cyan-500" },
};

export default function Dashboard() {
  const { data: stats, isLoading: statsLoading } = useGetDashboardStats();
  const { data: streak } = useGetStudyStreak();
  const { data: analytics } = useGetPerformanceAnalytics();
  const { data: activity } = useGetDashboardActivity();
  const { user } = useAuth();

  const firstName = user?.name?.split(" ")[0] || "there";

  if (statsLoading) {
    return (
      <div className="flex-1 flex items-center justify-center h-full">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 animate-pulse" />
          <p className="text-sm text-gray-500">Loading your dashboard…</p>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      label: "Questions Solved",
      value: stats?.questionsAttempted || 0,
      sub: "across all categories",
      icon: Target,
      grad: "from-blue-500 to-cyan-500",
      bg: "from-blue-50 to-cyan-50",
      border: "border-blue-100",
      text: "text-blue-700",
    },
    {
      label: "Mock Interviews",
      value: stats?.mockInterviewsCompleted || 0,
      sub: "sessions completed",
      icon: Video,
      grad: "from-violet-500 to-purple-500",
      bg: "from-violet-50 to-purple-50",
      border: "border-violet-100",
      text: "text-violet-700",
    },
    {
      label: "ATS Score",
      value: `${stats?.atsScore || 0}%`,
      sub: "last resume scan",
      icon: Briefcase,
      grad: "from-emerald-500 to-teal-500",
      bg: "from-emerald-50 to-teal-50",
      border: "border-emerald-100",
      text: "text-emerald-700",
    },
    {
      label: "Global Rank",
      value: `#${stats?.rankPosition || 0}`,
      sub: `top ${((stats?.rankPosition ?? 1) / (stats?.totalUsers ?? 1000) * 100).toFixed(1)}%`,
      icon: Trophy,
      grad: "from-amber-500 to-orange-500",
      bg: "from-amber-50 to-orange-50",
      border: "border-amber-100",
      text: "text-amber-700",
    },
  ];

  const quickLinks = [
    { href: "/mock",   label: "Start Mock Interview", icon: Video,     grad: "from-violet-500 to-purple-500" },
    { href: "/resume", label: "Analyze Resume",        icon: Briefcase, grad: "from-rose-500 to-pink-500" },
    { href: "/jobs",   label: "Check Job Match",       icon: Target,    grad: "from-cyan-500 to-blue-500" },
    { href: "/coding", label: "Practice Coding",       icon: FileCode2, grad: "from-indigo-500 to-blue-500" },
  ];

  const practiceCards = [
    {
      href: "/coding",
      label: "Coding Practice",
      score: analytics?.coding?.avgScore || 0,
      icon: FileCode2,
      grad: "from-blue-500 to-cyan-500",
      bg: "bg-blue-50",
      border: "border-blue-100",
      textColor: "text-blue-600",
      badgeBg: "bg-blue-100 text-blue-700",
    },
    {
      href: "/hr",
      label: "HR Questions",
      score: analytics?.hr?.avgScore || 0,
      icon: Users,
      grad: "from-violet-500 to-purple-500",
      bg: "bg-violet-50",
      border: "border-violet-100",
      textColor: "text-violet-600",
      badgeBg: "bg-violet-100 text-violet-700",
    },
    {
      href: "/aptitude",
      label: "Aptitude Tests",
      score: analytics?.aptitude?.avgScore || 0,
      icon: BrainCircuit,
      grad: "from-emerald-500 to-teal-500",
      bg: "bg-emerald-50",
      border: "border-emerald-100",
      textColor: "text-emerald-600",
      badgeBg: "bg-emerald-100 text-emerald-700",
    },
  ];

  return (
    <div className="p-6 xl:p-8 max-w-7xl mx-auto space-y-6 w-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl xl:text-3xl font-bold text-gray-900">
            Good day, <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">{firstName}! 👋</span>
          </h1>
          <p className="text-gray-500 mt-1 text-sm">Here's your interview prep overview for today.</p>
        </div>
        <div className="flex items-center gap-2 bg-gradient-to-r from-orange-400 to-red-400 text-white px-4 py-2 rounded-2xl font-semibold shadow-md shadow-orange-200">
          <Flame className="w-4 h-4" />
          <span>{streak?.currentStreak || 0} Day Streak</span>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className={`rounded-2xl border ${card.border} bg-gradient-to-br ${card.bg} p-5 relative overflow-hidden`}>
              <div className="flex items-start justify-between mb-3">
                <p className={`text-xs font-semibold uppercase tracking-wide ${card.text} opacity-70`}>{card.label}</p>
                <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${card.grad} flex items-center justify-center shadow-md`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className={`text-3xl font-extrabold ${card.text}`}>{card.value}</div>
              <p className="text-xs text-gray-500 mt-1">{card.sub}</p>
            </div>
          );
        })}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Progress Chart */}
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="font-bold text-gray-900">Weekly Progress</h2>
                <p className="text-xs text-gray-400 mt-0.5">Performance score over the last 7 days</p>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full">
                <TrendingUp className="w-3.5 h-3.5" /> Improving
              </div>
            </div>
            <div className="h-52 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stats?.weeklyProgress || []}>
                  <defs>
                    <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#9ca3af' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#9ca3af' }} />
                  <Tooltip
                    contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
                    itemStyle={{ color: '#6366f1', fontWeight: 600 }}
                  />
                  <Area type="monotone" dataKey="score" stroke="#6366f1" strokeWidth={2.5} fill="url(#scoreGrad)" dot={{ r: 4, fill: '#6366f1', strokeWidth: 0 }} activeDot={{ r: 6, fill: '#6366f1' }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Practice Category Cards */}
          <div className="grid grid-cols-3 gap-4">
            {practiceCards.map((c) => {
              const Icon = c.icon;
              return (
                <Link href={c.href} key={c.label}>
                  <div className={`${c.bg} border ${c.border} rounded-2xl p-5 cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group`}>
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${c.grad} flex items-center justify-center mb-3 shadow`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 text-sm group-hover:text-indigo-600 transition-colors">{c.label}</h3>
                    <div className={`inline-flex items-center gap-1 mt-2 text-xs font-semibold px-2 py-0.5 rounded-full ${c.badgeBg}`}>
                      Avg: {c.score}%
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-5">
          {/* Quick Actions */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-4 h-4 text-amber-500" />
              <h2 className="font-bold text-gray-900">Quick Actions</h2>
            </div>
            <div className="space-y-2.5">
              {quickLinks.map((q) => {
                const Icon = q.icon;
                return (
                  <Link href={q.href} key={q.label}>
                    <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group border border-transparent hover:border-gray-100">
                      <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${q.grad} flex items-center justify-center shrink-0 shadow-sm`}>
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm font-medium text-gray-700 group-hover:text-indigo-600 transition-colors">{q.label}</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-auto text-gray-300 group-hover:text-indigo-400 transition-colors" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-4 h-4 text-indigo-500" />
              <h2 className="font-bold text-gray-900">Recent Activity</h2>
            </div>
            <div className="space-y-3">
              {activity?.slice(0, 5).map((item) => {
                const cfg = activityTypeConfig[item.type] || activityTypeConfig.coding;
                return (
                  <div key={item.id} className={`flex items-start gap-3 p-3 rounded-xl ${cfg.bg}`}>
                    <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${cfg.dot}`} />
                    <div className="min-w-0">
                      <p className={`text-xs font-semibold ${cfg.color} leading-snug`}>{item.description}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] text-gray-400">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </span>
                        {item.score && (
                          <span className={`text-[10px] font-bold ${cfg.color}`}>Score: {item.score}</span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
              {!activity?.length && (
                <p className="text-sm text-gray-400 text-center py-4">No recent activity yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
