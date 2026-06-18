import { Link } from "wouter";
import { 
  useGetDashboardStats, 
  useGetStudyStreak, 
  useGetPerformanceAnalytics, 
  useGetDashboardActivity 
} from "@workspace/api-client-react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { 
  Trophy, 
  Flame, 
  Target, 
  Briefcase,
  PlayCircle,
  FileCode2,
  Users,
  BrainCircuit,
  ArrowRight
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const { data: stats, isLoading: statsLoading } = useGetDashboardStats();
  const { data: streak, isLoading: streakLoading } = useGetStudyStreak();
  const { data: analytics, isLoading: analyticsLoading } = useGetPerformanceAnalytics();
  const { data: activity, isLoading: activityLoading } = useGetDashboardActivity();

  if (statsLoading || streakLoading || analyticsLoading || activityLoading) {
    return <div className="p-8">Loading dashboard...</div>;
  }

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Welcome back</h1>
          <p className="text-muted-foreground mt-1">Here is what is happening with your interview prep today.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-full font-medium">
            <Flame className="w-5 h-5" />
            <span>{streak?.currentStreak || 0} Day Streak</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center justify-between">
              Total Questions
              <Target className="w-4 h-4 text-primary" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats?.questionsAttempted || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">across all categories</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center justify-between">
              Mock Interviews
              <PlayCircle className="w-4 h-4 text-primary" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats?.mockInterviewsCompleted || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">sessions completed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center justify-between">
              ATS Score
              <Briefcase className="w-4 h-4 text-primary" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats?.atsScore || 0}%</div>
            <p className="text-xs text-muted-foreground mt-1">last resume scan</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center justify-between">
              Global Rank
              <Trophy className="w-4 h-4 text-primary" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">#{stats?.rankPosition || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">top {(stats?.rankPosition! / stats?.totalUsers! * 100).toFixed(1)}%</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Progress</CardTitle>
              <CardDescription>Your performance score over the last 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={stats?.weeklyProgress || []}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '8px', border: '1px solid var(--border)' }}
                      itemStyle={{ color: 'var(--foreground)' }}
                    />
                    <Line type="monotone" dataKey="score" stroke="var(--primary)" strokeWidth={2} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link href="/coding">
              <Card className="hover-elevate cursor-pointer transition-all border-primary/20">
                <CardContent className="p-6 flex flex-col items-center text-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                    <FileCode2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Coding Practice</h3>
                    <p className="text-xs text-muted-foreground mt-1">Avg Score: {analytics?.coding?.avgScore || 0}%</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
            
            <Link href="/hr">
              <Card className="hover-elevate cursor-pointer transition-all border-primary/20">
                <CardContent className="p-6 flex flex-col items-center text-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">HR Questions</h3>
                    <p className="text-xs text-muted-foreground mt-1">Avg Score: {analytics?.hr?.avgScore || 0}%</p>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/aptitude">
              <Card className="hover-elevate cursor-pointer transition-all border-primary/20">
                <CardContent className="p-6 flex flex-col items-center text-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                    <BrainCircuit className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Aptitude Tests</h3>
                    <p className="text-xs text-muted-foreground mt-1">Avg Score: {analytics?.aptitude?.avgScore || 0}%</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/mock">
                <Button className="w-full justify-between" variant="outline">
                  Start Mock Interview
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/resume">
                <Button className="w-full justify-between" variant="outline">
                  Analyze Resume
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/jobs">
                <Button className="w-full justify-between" variant="outline">
                  Check Job Match
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activity?.map((item) => (
                  <div key={item.id} className="flex items-start gap-3">
                    <div className="w-2 h-2 mt-2 rounded-full bg-primary" />
                    <div>
                      <p className="text-sm font-medium">{item.description}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-muted-foreground">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </span>
                        {item.score && (
                          <span className="text-xs font-medium text-primary">Score: {item.score}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {!activity?.length && (
                  <p className="text-sm text-muted-foreground text-center py-4">No recent activity</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
