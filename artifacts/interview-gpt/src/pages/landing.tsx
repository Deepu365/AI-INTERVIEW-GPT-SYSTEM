import { Link } from "wouter";
import {
  BrainCircuit, Code2, Users, Trophy, FileText, Zap, Target, TrendingUp,
  Star, CheckCircle2, ArrowRight, Sparkles, Award, Clock, BookOpen,
  BarChart3, Shield, PlayCircle, ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const features = [
  { icon: Code2, title: "Coding Practice", desc: "500+ problems from top companies. Filter by topic, difficulty & company.", color: "from-blue-500 to-cyan-500", bg: "bg-blue-50" },
  { icon: Users, title: "HR Interview Prep", desc: "Behavioral questions with AI-powered STAR feedback and scoring.", color: "from-violet-500 to-purple-500", bg: "bg-violet-50" },
  { icon: BrainCircuit, title: "Aptitude Tests", desc: "Timed quantitative, logical & verbal reasoning tests with analytics.", color: "from-emerald-500 to-teal-500", bg: "bg-emerald-50" },
  { icon: PlayCircle, title: "Mock Interviews", desc: "Realistic technical & HR mock sessions with detailed post-interview reports.", color: "from-orange-500 to-amber-500", bg: "bg-orange-50" },
  { icon: FileText, title: "Resume Analyzer", desc: "ATS-optimized scoring with gap analysis and actionable suggestions.", color: "from-rose-500 to-pink-500", bg: "bg-rose-50" },
  { icon: Trophy, title: "Leaderboard", desc: "Compete globally, track your rank and climb the charts.", color: "from-yellow-500 to-orange-500", bg: "bg-yellow-50" },
];

const stats = [
  { value: "50K+", label: "Students Placed" },
  { value: "500+", label: "Practice Questions" },
  { value: "95%", label: "Success Rate" },
  { value: "200+", label: "Top Companies" },
];

const testimonials = [
  { name: "Priya Sharma", role: "SDE at Google", avatar: "PS", text: "InterviewGPT helped me crack Google in just 3 months. The mock interviews and coding practice are absolutely top-notch!", rating: 5 },
  { name: "Rahul Kumar", role: "Software Engineer at Amazon", avatar: "RK", text: "The resume analyzer gave me an 87% ATS score and I started getting callbacks immediately. Highly recommend!", rating: 5 },
  { name: "Ananya Patel", role: "Product Manager at Microsoft", avatar: "AP", text: "The HR question bank and AI evaluator are game-changers. I felt so prepared walking into my interviews.", rating: 5 },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center">
              <BrainCircuit className="w-4 h-4 text-white" />
            </div>
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">InterviewGPT</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <a href="#features" className="hover:text-indigo-600 transition-colors">Features</a>
            <a href="#stats" className="hover:text-indigo-600 transition-colors">Stats</a>
            <a href="#testimonials" className="hover:text-indigo-600 transition-colors">Reviews</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="text-gray-700 hover:text-indigo-600">Log In</Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white border-0 hover:opacity-90 shadow-md shadow-indigo-200">
                Get Started Free
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden pt-20 pb-32">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-60" />
          <div className="absolute top-20 right-1/4 w-80 h-80 bg-violet-100 rounded-full blur-3xl opacity-60" />
          <div className="absolute bottom-0 left-1/2 w-64 h-64 bg-cyan-100 rounded-full blur-3xl opacity-40" />
        </div>
        <div className="max-w-7xl mx-auto px-6 text-center">
          <Badge className="mb-6 bg-indigo-50 text-indigo-700 border-indigo-200 px-4 py-1.5 text-sm font-medium">
            <Sparkles className="w-3.5 h-3.5 mr-1.5" /> AI-Powered Interview Preparation
          </Badge>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
            Crack Your Dream
            <span className="block bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
              Tech Interview
            </span>
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            Practice coding, ace behavioral questions, analyze your resume and simulate real interviews — all in one powerful platform trusted by 50,000+ students.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/signup">
              <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white border-0 hover:opacity-90 shadow-xl shadow-indigo-200 px-8 h-12 text-base font-semibold">
                Start Practicing Free <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="px-8 h-12 text-base border-gray-200 hover:border-indigo-300 hover:text-indigo-600">
                I already have an account
              </Button>
            </Link>
          </div>
          <div className="mt-8 flex items-center justify-center gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> No credit card</div>
            <div className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Free forever</div>
            <div className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> 500+ questions</div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section id="stats" className="py-16 bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center text-white">
                <div className="text-4xl font-extrabold mb-1">{s.value}</div>
                <div className="text-indigo-200 text-sm font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-indigo-50 text-indigo-700 border-indigo-200">Everything you need</Badge>
            <h2 className="text-4xl font-bold tracking-tight mb-4">
              All-in-one interview preparation
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              From coding practice to resume analysis — every tool you need to land your dream job.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 group">
                  <div className={`w-12 h-12 rounded-xl ${f.bg} flex items-center justify-center mb-4`}>
                    <div className={`bg-gradient-to-br ${f.color} w-full h-full rounded-xl flex items-center justify-center`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-indigo-600 transition-colors">{f.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <Badge className="mb-4 bg-emerald-50 text-emerald-700 border-emerald-200">Why InterviewGPT?</Badge>
              <h2 className="text-4xl font-bold tracking-tight mb-6">Built for serious job seekers</h2>
              <div className="space-y-5">
                {[
                  { icon: Target, title: "Personalized Learning Path", desc: "8-week roadmap tailored to your target role, skills, and experience level." },
                  { icon: BarChart3, title: "Real-time Performance Analytics", desc: "Track progress across categories, topics, and difficulty levels with detailed charts." },
                  { icon: Award, title: "ATS-Optimized Resume Scoring", desc: "AI keyword analysis with actionable suggestions to beat automated screening." },
                  { icon: Clock, title: "Timed Practice Tests", desc: "Simulate real exam pressure with countdown timers on aptitude tests and coding challenges." },
                  { icon: Shield, title: "Company-wise Filtering", desc: "Filter questions by Google, Amazon, Microsoft, Facebook and 200+ companies." },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="flex gap-4">
                      <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0 mt-0.5">
                        <Icon className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{item.title}</div>
                        <div className="text-sm text-gray-500 mt-0.5">{item.desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="bg-gradient-to-br from-indigo-50 to-violet-50 rounded-3xl p-8 border border-indigo-100">
              <div className="space-y-4">
                {[
                  { label: "Coding Questions", value: 85, color: "bg-indigo-500" },
                  { label: "HR Preparation", value: 92, color: "bg-violet-500" },
                  { label: "Aptitude Score", value: 78, color: "bg-emerald-500" },
                  { label: "Resume ATS Score", value: 88, color: "bg-orange-500" },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-sm font-medium mb-1.5">
                      <span className="text-gray-700">{item.label}</span>
                      <span className="text-gray-500">{item.value}%</span>
                    </div>
                    <div className="h-2.5 rounded-full bg-white shadow-inner">
                      <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.value}%` }} />
                    </div>
                  </div>
                ))}
                <div className="pt-4 border-t border-indigo-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white font-bold text-sm">JS</div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">John's Progress</div>
                    <div className="text-xs text-gray-500">7-day streak • Top 5% this week</div>
                  </div>
                  <div className="ml-auto">
                    <Badge className="bg-emerald-100 text-emerald-700 border-0">🔥 On Fire</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <Badge className="mb-4 bg-yellow-50 text-yellow-700 border-yellow-200">Success Stories</Badge>
            <h2 className="text-4xl font-bold tracking-tight">Loved by students who got placed</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-5">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white font-bold text-sm">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-gray-900">{t.name}</div>
                    <div className="text-xs text-gray-500">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to crack your dream interview?</h2>
          <p className="text-indigo-200 text-lg mb-8">Join 50,000+ students who've already landed jobs at top companies.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-white text-indigo-700 hover:bg-indigo-50 font-semibold px-8 h-12 shadow-xl">
                Create Free Account <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
          <div className="flex items-center gap-2 font-semibold text-white">
            <BrainCircuit className="w-4 h-4 text-indigo-400" />
            InterviewGPT
          </div>
          <div>© 2026 InterviewGPT. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
