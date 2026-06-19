import { Link } from "wouter";
import {
  BrainCircuit, Code2, Users, FileText, ArrowRight, Sparkles,
  PlayCircle, CheckCircle2, Star, Target, Map, Zap,
  TrendingUp, Award, BookOpen, Video, Mic, MicOff, Camera,
  Clock, MessageSquare, BarChart3, ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";

const features = [
  {
    icon: FileText,
    title: "AI Resume Analyzer",
    desc: "ATS scoring, keyword analysis, gap identification and actionable improvement suggestions.",
    gradient: "from-rose-500 to-pink-500",
    glow: "shadow-rose-500/25",
    bg: "from-rose-950/40 to-pink-950/20",
    border: "border-rose-500/20",
    badge: "Most Popular",
  },
  {
    icon: Video,
    title: "AI Mock Interviews",
    desc: "Realistic technical & HR sessions with AI evaluation and detailed post-interview reports.",
    gradient: "from-violet-500 to-purple-500",
    glow: "shadow-violet-500/25",
    bg: "from-violet-950/40 to-purple-950/20",
    border: "border-violet-500/20",
    badge: "New",
  },
  {
    icon: Code2,
    title: "Coding Practice",
    desc: "500+ problems from Google, Amazon, Microsoft with an in-browser code editor.",
    gradient: "from-blue-500 to-cyan-500",
    glow: "shadow-blue-500/25",
    bg: "from-blue-950/40 to-cyan-950/20",
    border: "border-blue-500/20",
    badge: "500+ Problems",
  },
  {
    icon: Map,
    title: "Career Roadmap",
    desc: "Personalized 8-week learning plan based on your target role and experience.",
    gradient: "from-emerald-500 to-teal-500",
    glow: "shadow-emerald-500/25",
    bg: "from-emerald-950/40 to-teal-950/20",
    border: "border-emerald-500/20",
    badge: "Personalized",
  },
  {
    icon: Target,
    title: "Placement Predictor",
    desc: "Match your skills against real JDs and see your fit percentage with gap analysis.",
    gradient: "from-amber-500 to-orange-500",
    glow: "shadow-amber-500/25",
    bg: "from-amber-950/40 to-orange-950/20",
    border: "border-amber-500/20",
    badge: "AI-Powered",
  },
];

const stats = [
  { value: "50,000+", label: "Practice Questions", icon: BookOpen, color: "from-blue-400 to-cyan-400" },
  { value: "10,000+", label: "Students Placed", icon: Users, color: "from-violet-400 to-purple-400" },
  { value: "500+", label: "Top Companies", icon: Award, color: "from-emerald-400 to-teal-400" },
  { value: "95%", label: "Success Rate", icon: TrendingUp, color: "from-rose-400 to-pink-400" },
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
    <div className="min-h-screen bg-[#0a0a1a] text-white overflow-x-hidden">

      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-white/8 bg-[#0a0a1a]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5 font-bold text-xl">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/40">
              <BrainCircuit className="w-4 h-4 text-white" />
            </div>
            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">InterviewGPT</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/60">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">How it works</a>
            <a href="#testimonials" className="hover:text-white transition-colors">Reviews</a>
          </div>
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <Link href="/dashboard">
                <Button size="sm" className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white border-0 hover:opacity-90 shadow-lg shadow-indigo-500/30 font-semibold">
                  Go to Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="text-white/70 hover:text-white hover:bg-white/10 font-medium">Log In</Button>
                </Link>
                <Link href="/signup">
                  <Button size="sm" className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white border-0 hover:opacity-90 shadow-lg shadow-indigo-500/30 font-semibold">
                    Get Started Free
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden pt-14 pb-20">
        {/* Background blobs */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-0 w-[700px] h-[700px] bg-indigo-600/15 rounded-full blur-3xl" />
          <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-cyan-500/8 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

            {/* Left: Text & CTA */}
            <div>
              <div className="inline-flex items-center gap-2 bg-indigo-500/15 border border-indigo-500/30 rounded-full px-4 py-1.5 mb-7">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span className="text-xs font-semibold text-indigo-300 uppercase tracking-wide">AI-Powered Interview Preparation</span>
              </div>
              <h1 className="text-5xl lg:text-[3.6rem] font-extrabold tracking-tight mb-5 leading-[1.1]">
                Crack Your<br />Dream Job with<br />
                <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">AI-Powered Interviews</span>
              </h1>
              <p className="text-lg text-white/60 mb-3 leading-relaxed font-medium">
                Resume Analysis • Mock Interviews • Career Coach • Placement Predictor
              </p>
              <p className="text-base text-white/40 mb-8 max-w-md">
                Everything you need to land your dream job at Google, Amazon, Microsoft & 500+ top companies.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-7">
                {isAuthenticated ? (
                  <Link href="/dashboard">
                    <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white border-0 hover:opacity-90 shadow-2xl shadow-indigo-500/40 px-8 h-12 text-base font-bold rounded-xl">
                      Go to Dashboard <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                ) : (
                  <Link href="/signup">
                    <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white border-0 hover:opacity-90 shadow-2xl shadow-indigo-500/40 px-8 h-12 text-base font-bold rounded-xl">
                      Get Started Free <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                )}
                <Button size="lg" variant="outline" className="px-8 h-12 text-base border-white/15 text-white/80 hover:bg-white/10 hover:text-white rounded-xl font-semibold bg-transparent">
                  <PlayCircle className="w-5 h-5 mr-2 text-indigo-400" /> Watch Demo
                </Button>
              </div>
              <div className="flex flex-wrap items-center gap-5 text-sm text-white/40">
                <div className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> No credit card required</div>
                <div className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Free forever plan</div>
                <div className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> 500+ questions</div>
              </div>
            </div>

            {/* Right: Human Video Interview Visual */}
            <div className="relative hidden lg:block">
              {/* Floating score badge */}
              <div className="absolute -top-5 right-8 z-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-2xl shadow-emerald-500/40 px-4 py-2.5 flex items-center gap-2.5">
                <TrendingUp className="w-5 h-5 text-white" />
                <div>
                  <div className="text-[10px] font-semibold text-emerald-100 uppercase tracking-wider">Interview Score</div>
                  <div className="text-xl font-black text-white leading-none">8.7 / 10</div>
                </div>
              </div>
              {/* Floating offer badge */}
              <div className="absolute -bottom-3 -left-3 z-20 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl shadow-2xl shadow-amber-500/40 px-4 py-2.5 flex items-center gap-2.5 animate-bounce" style={{ animationDuration: "3.5s" }}>
                <Award className="w-5 h-5 text-white" />
                <div>
                  <div className="text-[10px] font-semibold text-amber-100 uppercase tracking-wider">Offer Received!</div>
                  <div className="text-sm font-black text-white leading-none">Google SDE-2</div>
                </div>
              </div>

              {/* Main video call card */}
              <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 rounded-3xl overflow-hidden shadow-2xl border border-white/10 backdrop-blur-sm">
                {/* Top bar */}
                <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-slate-900/60">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                    <div className="w-2 h-2 rounded-full bg-amber-500" />
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-red-400 text-xs font-semibold">● REC</span>
                    <span className="text-white/30 text-xs ml-2">32:14</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-emerald-500/20 border border-emerald-500/30 rounded-full px-3 py-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-emerald-400 text-xs font-semibold">Live Interview</span>
                  </div>
                </div>

                {/* Video grid */}
                <div className="grid grid-cols-2 gap-3 p-4">
                  {/* Interviewer video */}
                  <div className="relative bg-gradient-to-br from-indigo-900/80 to-violet-900/60 rounded-2xl aspect-video flex items-center justify-center border border-indigo-500/20 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 to-slate-900" />
                    <div className="relative flex flex-col items-center gap-2">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-500/50">
                        RS
                      </div>
                      <div className="text-center">
                        <div className="text-white text-xs font-semibold">Rahul Sharma</div>
                        <div className="text-indigo-300 text-[10px]">Google • Senior SDE</div>
                      </div>
                    </div>
                    <div className="absolute bottom-2 left-2 bg-black/50 backdrop-blur rounded-full px-2 py-0.5 flex items-center gap-1">
                      <Mic className="w-2.5 h-2.5 text-green-400" />
                      <span className="text-[9px] text-white/80">Interviewer</span>
                    </div>
                    {/* Sound waves */}
                    <div className="absolute bottom-2 right-2 flex items-end gap-0.5">
                      {[3,5,4,6,3,5,4].map((h, i) => (
                        <div key={i} className="w-0.5 bg-indigo-400 rounded-full animate-pulse" style={{ height: `${h * 2}px`, animationDelay: `${i * 100}ms` }} />
                      ))}
                    </div>
                  </div>

                  {/* Candidate video */}
                  <div className="relative bg-gradient-to-br from-blue-900/80 to-cyan-900/60 rounded-2xl aspect-video flex items-center justify-center border border-blue-500/20 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-950 to-slate-900" />
                    <div className="relative flex flex-col items-center gap-2">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-500/50">
                        You
                      </div>
                      <div className="text-center">
                        <div className="text-white text-xs font-semibold">You</div>
                        <div className="text-blue-300 text-[10px]">Candidate</div>
                      </div>
                    </div>
                    <div className="absolute bottom-2 left-2 bg-black/50 backdrop-blur rounded-full px-2 py-0.5 flex items-center gap-1">
                      <Camera className="w-2.5 h-2.5 text-blue-400" />
                      <span className="text-[9px] text-white/80">On camera</span>
                    </div>
                  </div>
                </div>

                {/* Current question */}
                <div className="mx-4 mb-3 bg-white/5 border border-white/10 rounded-xl p-3.5">
                  <div className="flex items-center gap-2 mb-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-indigo-400" />
                    <span className="text-indigo-400 text-[10px] font-bold uppercase tracking-wider">Current Question</span>
                    <span className="ml-auto text-white/30 text-[10px]">Q3 of 8</span>
                  </div>
                  <p className="text-white/85 text-xs leading-relaxed">
                    "Design a URL shortener like bit.ly. Walk me through your system design approach."
                  </p>
                </div>

                {/* AI feedback bar */}
                <div className="grid grid-cols-3 gap-2 px-4 pb-4">
                  {[
                    { label: "Communication", val: 88, color: "from-violet-500 to-purple-500" },
                    { label: "Technical Depth", val: 92, color: "from-blue-500 to-cyan-500" },
                    { label: "Confidence", val: 76, color: "from-emerald-500 to-teal-500" },
                  ].map(m => (
                    <div key={m.label} className="bg-white/5 rounded-lg p-2 border border-white/8">
                      <div className={`text-base font-black bg-gradient-to-r ${m.color} bg-clip-text text-transparent`}>{m.val}%</div>
                      <div className="text-white/35 text-[9px] mb-1">{m.label}</div>
                      <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                        <div className={`h-full bg-gradient-to-r ${m.color} rounded-full`} style={{ width: `${m.val}%` }} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Controls bar */}
                <div className="flex items-center justify-center gap-3 px-4 pb-4">
                  <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                    <Mic className="w-4 h-4 text-white" />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                    <Camera className="w-4 h-4 text-white" />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center transition-colors shadow-lg shadow-red-500/40">
                    <MicOff className="w-4 h-4 text-white" />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                    <BarChart3 className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="py-14 border-y border-white/8 bg-gradient-to-r from-indigo-950/60 via-violet-950/40 to-indigo-950/60 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="text-center">
                  <div className={`text-4xl font-black mb-1 bg-gradient-to-r ${s.color} bg-clip-text text-transparent`}>{s.value}</div>
                  <div className="text-white/50 text-sm font-medium">{s.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 relative">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-violet-600/5 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-indigo-500/15 border border-indigo-500/30 rounded-full px-4 py-1.5 mb-5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span className="text-xs font-semibold text-indigo-300 uppercase tracking-wide">All-in-One Platform</span>
            </div>
            <h2 className="text-4xl font-extrabold tracking-tight mb-4 text-white">
              Five tools.{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">One platform.</span>
            </h2>
            <p className="text-white/50 text-lg max-w-xl mx-auto">
              From resume to offer letter — every tool you need to ace your interviews.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <Link href={isAuthenticated ? "/dashboard" : "/signup"} key={f.title}>
                  <div className={`group relative bg-gradient-to-br ${f.bg} border ${f.border} rounded-2xl p-6 hover:scale-[1.02] transition-all duration-200 cursor-pointer overflow-hidden`}>
                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-white/5 to-transparent`} />
                    <div className={`absolute -top-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-br ${f.gradient} opacity-10 blur-2xl group-hover:opacity-20 transition-opacity`} />
                    <div className="relative">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.gradient} flex items-center justify-center shadow-lg ${f.glow}`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <span className={`text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r ${f.gradient} bg-clip-text text-transparent border ${f.border} rounded-full px-2.5 py-1`}>
                          {f.badge}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold mb-2 text-white group-hover:text-white transition-colors">{f.title}</h3>
                      <p className="text-white/50 text-sm leading-relaxed">{f.desc}</p>
                      <div className={`mt-4 flex items-center gap-1 text-xs font-semibold bg-gradient-to-r ${f.gradient} bg-clip-text text-transparent opacity-0 group-hover:opacity-100 transition-opacity`}>
                        Try it free <ChevronRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-24 bg-white/3 border-y border-white/8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-emerald-500/15 border border-emerald-500/30 rounded-full px-4 py-1.5 mb-5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-xs font-semibold text-emerald-300 uppercase tracking-wide">Simple Process</span>
            </div>
            <h2 className="text-4xl font-extrabold tracking-tight mb-4 text-white">
              Go from{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">zero to hired</span>
              {" "}in 4 steps
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <div key={s.step} className="relative">
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px bg-gradient-to-r from-white/20 to-transparent z-0" />
                )}
                <div className="relative z-10">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-4 shadow-lg`}>
                    <span className="text-white font-black text-lg">{s.step}</span>
                  </div>
                  <h3 className="font-bold text-white mb-2">{s.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-amber-500/15 border border-amber-500/30 rounded-full px-4 py-1.5 mb-5">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="text-xs font-semibold text-amber-300 uppercase tracking-wide">Success Stories</span>
            </div>
            <h2 className="text-4xl font-extrabold tracking-tight text-white">
              Loved by students who{" "}
              <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">got placed</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:bg-white/8 hover:border-white/15 transition-all">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-white/70 text-sm leading-relaxed mb-5 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.avatarGrad} flex items-center justify-center text-white font-bold text-sm shadow`}>
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-sm text-white">{t.name}</div>
                    <div className="text-xs text-white/40">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
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
              <Button size="lg" className="bg-white text-indigo-700 hover:bg-indigo-50 font-bold px-10 h-12 shadow-2xl text-base rounded-xl">
                Get Started Free <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 font-semibold px-8 h-12 rounded-xl bg-transparent">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/40 border-t border-white/8 py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 font-bold text-white">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center">
              <BrainCircuit className="w-3.5 h-3.5 text-white" />
            </div>
            InterviewGPT
          </div>
          <p className="text-sm text-white/30">© 2026 InterviewGPT. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-white/30">
            <span className="hover:text-white/60 cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-white/60 cursor-pointer transition-colors">Terms</span>
            <span className="hover:text-white/60 cursor-pointer transition-colors">Contact</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
