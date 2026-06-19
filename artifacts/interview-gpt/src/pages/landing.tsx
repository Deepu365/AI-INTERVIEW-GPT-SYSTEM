import { Link } from "wouter";
import {
  BrainCircuit, Code2, Users, Trophy, FileText, ArrowRight, Sparkles,
  PlayCircle, CheckCircle2, Star, ChevronRight, Target, Map, Zap,
  TrendingUp, Award, Shield, Clock, BarChart3, BookOpen, Video
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/use-auth";

const features = [
  {
    icon: FileText,
    title: "AI Resume Analyzer",
    desc: "ATS scoring, keyword analysis, gap identification and actionable improvement suggestions to get past automated screening.",
    color: "from-rose-500 to-pink-600",
    bg: "bg-rose-50",
    badge: "Most Popular",
    badgeColor: "bg-rose-100 text-rose-700",
  },
  {
    icon: Video,
    title: "AI Mock Interviews",
    desc: "Realistic technical & HR mock sessions with AI evaluation, detailed post-interview reports and improvement tips.",
    color: "from-violet-500 to-purple-600",
    bg: "bg-violet-50",
    badge: "New",
    badgeColor: "bg-violet-100 text-violet-700",
  },
  {
    icon: Code2,
    title: "Coding Practice",
    desc: "500+ problems from Google, Amazon, Microsoft. Filter by topic, difficulty and company with an in-browser code editor.",
    color: "from-blue-500 to-cyan-600",
    bg: "bg-blue-50",
    badge: "500+ Questions",
    badgeColor: "bg-blue-100 text-blue-700",
  },
  {
    icon: Map,
    title: "Career Roadmap",
    desc: "Personalized 8-week learning plan based on your target role, current skill level and experience.",
    color: "from-emerald-500 to-teal-600",
    bg: "bg-emerald-50",
    badge: "Personalized",
    badgeColor: "bg-emerald-100 text-emerald-700",
  },
  {
    icon: Target,
    title: "Placement Predictor",
    desc: "Job description analyzer that matches your skills against real JDs and shows your fit percentage with gap analysis.",
    color: "from-amber-500 to-orange-600",
    bg: "bg-amber-50",
    badge: "AI-Powered",
    badgeColor: "bg-amber-100 text-amber-700",
  },
];

const stats = [
  { value: "50,000+", label: "Questions", icon: BookOpen, color: "text-blue-600", bg: "bg-blue-50" },
  { value: "10,000+", label: "Students", icon: Users, color: "text-violet-600", bg: "bg-violet-50" },
  { value: "500+", label: "Companies", icon: Award, color: "text-emerald-600", bg: "bg-emerald-50" },
  { value: "95%", label: "Success Rate", icon: TrendingUp, color: "text-rose-600", bg: "bg-rose-50" },
];

const testimonials = [
  { name: "Priya Sharma", role: "SDE-2 at Google", avatar: "PS", avatarGrad: "from-blue-500 to-cyan-500", text: "InterviewGPT helped me crack Google in just 3 months. The mock interviews and coding practice are absolutely top-notch!", rating: 5 },
  { name: "Rahul Kumar", role: "Software Engineer at Amazon", avatar: "RK", avatarGrad: "from-violet-500 to-purple-500", text: "The resume analyzer gave me an 87% ATS score and I started getting callbacks immediately. Highly recommend!", rating: 5 },
  { name: "Ananya Patel", role: "Product Manager at Microsoft", avatar: "AP", avatarGrad: "from-emerald-500 to-teal-500", text: "The HR question bank and AI evaluator are game-changers. I felt so prepared walking into my interviews.", rating: 5 },
];

const steps = [
  { step: "01", title: "Create your profile", desc: "Set your target role, experience level and skills.", color: "from-blue-500 to-indigo-500" },
  { step: "02", title: "Follow your roadmap", desc: "Practice coding, HR & aptitude with a personalized 8-week plan.", color: "from-violet-500 to-purple-500" },
  { step: "03", title: "Simulate real interviews", desc: "Take mock interviews and get AI-scored feedback.", color: "from-emerald-500 to-teal-500" },
  { step: "04", title: "Land your dream job", desc: "Apply with a polished resume and ace every round.", color: "from-amber-500 to-orange-500" },
];

export default function Landing() {
  const { isAuthenticated } = useAuth();
  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5 font-bold text-xl">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-md shadow-indigo-200">
              <BrainCircuit className="w-4 h-4 text-white" />
            </div>
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">InterviewGPT</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <a href="#features" className="hover:text-indigo-600 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-indigo-600 transition-colors">How it works</a>
            <a href="#testimonials" className="hover:text-indigo-600 transition-colors">Reviews</a>
          </div>
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <Link href="/dashboard">
                <Button size="sm" className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white border-0 hover:opacity-90 shadow-md shadow-indigo-200 font-semibold">
                  Go to Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="text-gray-700 hover:text-indigo-600 font-medium">Log In</Button>
                </Link>
                <Link href="/signup">
                  <Button size="sm" className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white border-0 hover:opacity-90 shadow-md shadow-indigo-200 font-semibold">
                    Get Started Free
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden pt-12 pb-16">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-indigo-100/50 rounded-full blur-3xl" />
          <div className="absolute top-10 right-0 w-96 h-96 bg-violet-100/40 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-cyan-100/30 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text & CTA */}
            <div>
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-50 to-violet-50 border border-indigo-200 rounded-full px-4 py-1.5 mb-7">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span className="text-xs font-semibold text-indigo-700 uppercase tracking-wide">AI-Powered Interview Preparation</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tight mb-5 leading-[1.08]">
                Crack Your<br />Dream Job with<br />
                <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">AI-Powered Interviews</span>
              </h1>
              <p className="text-lg text-gray-500 mb-3 leading-relaxed font-medium">
                Resume Analysis • Mock Interviews • Career Coach • Placement Predictor
              </p>
              <p className="text-base text-gray-400 mb-8 max-w-md">
                Everything you need to land your dream job at Google, Amazon, Microsoft & 500+ top companies.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-7">
                {isAuthenticated ? (
                  <Link href="/dashboard">
                    <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white border-0 hover:opacity-90 shadow-xl shadow-indigo-200/60 px-8 h-12 text-base font-bold rounded-xl">
                      Go to Dashboard <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                ) : (
                  <Link href="/signup">
                    <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white border-0 hover:opacity-90 shadow-xl shadow-indigo-200/60 px-8 h-12 text-base font-bold rounded-xl">
                      Get Started Free <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                )}
                <Button size="lg" variant="outline" className="px-8 h-12 text-base border-gray-200 rounded-xl hover:border-indigo-300 hover:text-indigo-600 font-semibold">
                  <PlayCircle className="w-5 h-5 mr-2 text-indigo-500" /> Watch Demo
                </Button>
              </div>
              <div className="flex flex-wrap items-center gap-5 text-sm text-gray-400">
                <div className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> No credit card required</div>
                <div className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Free forever plan</div>
                <div className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> 500+ questions</div>
              </div>
            </div>

            {/* Right: AI Interview Visual */}
            <div className="relative hidden lg:block">
              {/* Floating badges */}
              <div className="absolute -top-4 -left-4 z-20 bg-white rounded-2xl shadow-lg border border-gray-100 px-3 py-2 flex items-center gap-2 animate-bounce" style={{ animationDuration: "3s" }}>
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-800">ATS Score</div>
                  <div className="text-lg font-black text-emerald-600 leading-none">92%</div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-2 z-20 bg-white rounded-2xl shadow-lg border border-gray-100 px-3 py-2 flex items-center gap-2 animate-bounce" style={{ animationDuration: "4s", animationDelay: "1s" }}>
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                  <Award className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-800">Interview Score</div>
                  <div className="text-lg font-black text-amber-600 leading-none">8.7/10</div>
                </div>
              </div>

              {/* Main card */}
              <div className="bg-gradient-to-br from-slate-900 to-indigo-950 rounded-3xl p-6 shadow-2xl border border-white/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-violet-500/20 rounded-full blur-2xl" />
                <div className="relative">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
                        <BrainCircuit className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-white font-bold text-sm">AI Mock Interview</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-emerald-500/20 text-emerald-400 text-xs font-semibold px-2.5 py-1 rounded-full border border-emerald-500/30">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Live
                    </div>
                  </div>
                  {/* Interview type tabs */}
                  <div className="flex gap-2 mb-5">
                    {["Technical", "HR", "Coding"].map((t, i) => (
                      <span key={t} className={`text-xs px-3 py-1 rounded-full font-semibold ${i === 0 ? "bg-indigo-500 text-white" : "bg-white/10 text-white/50"}`}>{t}</span>
                    ))}
                  </div>
                  {/* AI message bubble */}
                  <div className="bg-white/10 rounded-2xl rounded-tl-sm p-4 mb-3 border border-white/10">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center">
                        <BrainCircuit className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-indigo-300 text-xs font-semibold">AI Interviewer</span>
                    </div>
                    <p className="text-white/90 text-sm leading-relaxed">
                      "Tell me about a time when you had to optimize a slow database query in production. Walk me through your approach."
                    </p>
                  </div>
                  {/* User response bubble */}
                  <div className="bg-indigo-600/30 rounded-2xl rounded-tr-sm p-4 mb-5 border border-indigo-500/20 ml-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center text-white font-bold text-[10px]">You</div>
                      <span className="text-blue-300 text-xs font-semibold">Your Answer</span>
                      <span className="ml-auto text-[10px] text-white/40">STAR method ✓</span>
                    </div>
                    <p className="text-white/80 text-xs leading-relaxed">
                      "In my last role, I identified an N+1 query issue affecting checkout load times. I used query profiling to isolate the bottleneck, then refactored using eager loading..."
                    </p>
                  </div>
                  {/* Feedback scores */}
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: "Clarity", score: 9, color: "from-blue-500 to-cyan-500" },
                      { label: "Technical", score: 8, color: "from-violet-500 to-purple-500" },
                      { label: "Confidence", score: 7, color: "from-emerald-500 to-teal-500" },
                    ].map((m) => (
                      <div key={m.label} className="bg-white/5 rounded-xl p-2.5 border border-white/10 text-center">
                        <div className={`text-xl font-black bg-gradient-to-r ${m.color} bg-clip-text text-transparent`}>{m.score}</div>
                        <div className="text-white/40 text-[10px] font-medium">{m.label}</div>
                        <div className="mt-1.5 h-1 bg-white/10 rounded-full overflow-hidden">
                          <div className={`h-full bg-gradient-to-r ${m.color} rounded-full`} style={{ width: `${m.score * 10}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="py-14 bg-gradient-to-r from-slate-900 via-indigo-950 to-violet-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/3 w-64 h-64 bg-indigo-400 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/3 w-48 h-48 bg-violet-400 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="text-center">
                  <div className={`w-12 h-12 rounded-2xl ${s.bg} flex items-center justify-center mx-auto mb-3`}>
                    <Icon className={`w-6 h-6 ${s.color}`} />
                  </div>
                  <div className="text-3xl font-extrabold text-white mb-1">{s.value}</div>
                  <div className="text-indigo-300 text-sm font-medium">{s.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 bg-gray-50/60">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-indigo-50 text-indigo-700 border-indigo-200 px-4 py-1.5">All-in-One Platform</Badge>
            <h2 className="text-4xl font-extrabold tracking-tight mb-4">
              Five tools. <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">One platform.</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              From resume to offer letter — every tool you need to ace your interviews.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className={`bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-200 group ${i === 0 ? "md:col-span-2 lg:col-span-1" : ""}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center shadow-md`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${f.badgeColor}`}>{f.badge}</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2 group-hover:text-indigo-600 transition-colors">{f.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                  <Link href="/signup">
                    <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                      Try it free <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-emerald-50 text-emerald-700 border-emerald-200 px-4 py-1.5">Simple Process</Badge>
            <h2 className="text-4xl font-extrabold tracking-tight mb-4">
              Go from <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">zero to hired</span> in 4 steps
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <div key={s.step} className="relative">
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px bg-gradient-to-r from-gray-200 to-transparent z-0" />
                )}
                <div className="relative z-10">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-4 shadow-lg`}>
                    <span className="text-white font-black text-lg">{s.step}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{s.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 bg-gradient-to-br from-slate-50 to-indigo-50/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <Badge className="mb-4 bg-amber-50 text-amber-700 border-amber-200 px-4 py-1.5">⭐ Success Stories</Badge>
            <h2 className="text-4xl font-extrabold tracking-tight">
              Loved by students who <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">got placed</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-5 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.avatarGrad} flex items-center justify-center text-white font-bold text-sm shadow`}>
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-sm text-gray-900">{t.name}</div>
                    <div className="text-xs text-gray-500">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl" />
        </div>
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-6">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl font-extrabold text-white mb-4 leading-tight">Ready to crack your dream interview?</h2>
          <p className="text-indigo-200 text-lg mb-10">Join 10,000+ students who've already landed jobs at top companies.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-white text-indigo-700 hover:bg-indigo-50 font-bold px-10 h-13 shadow-2xl text-base rounded-xl">
                Get Started Free <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 font-semibold px-8 h-13 rounded-xl">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 font-bold text-white">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center">
              <BrainCircuit className="w-3.5 h-3.5 text-white" />
            </div>
            InterviewGPT
          </div>
          <p className="text-sm text-gray-500">© 2026 InterviewGPT. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-gray-500">
            <span className="hover:text-gray-300 cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-gray-300 cursor-pointer transition-colors">Terms</span>
            <span className="hover:text-gray-300 cursor-pointer transition-colors">Contact</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
