import { useState } from "react";
import { Link, useLocation } from "wouter";
import { BrainCircuit, Mail, Lock, User, Eye, EyeOff, ArrowRight, CheckCircle2, Star, Code2, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const perks = [
  "500+ coding problems from top companies",
  "AI-powered HR answer evaluator",
  "Resume ATS optimizer with gap analysis",
  "Mock interview simulator with reports",
  "8-week personalized learning roadmap",
  "Global leaderboard & streak tracking",
];

export default function Signup() {
  const [, navigate] = useLocation();
  const { login } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!name.trim()) { setError("Please enter your name."); return; }
    if (!email.includes("@")) { setError("Please enter a valid email."); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters."); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    navigate("/login?registered=1");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-900 via-indigo-950 to-violet-900 flex-col justify-between p-12 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-violet-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <Link href="/">
          <div className="flex items-center gap-2.5 font-bold text-xl cursor-pointer relative z-10">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-400 to-violet-400 flex items-center justify-center shadow-lg">
              <BrainCircuit className="w-5 h-5 text-white" />
            </div>
            <span>InterviewGPT</span>
          </div>
        </Link>

        <div className="relative z-10">
          <h2 className="text-4xl font-extrabold mb-3 leading-tight">
            Start your journey to<br />
            <span className="bg-gradient-to-r from-indigo-300 to-violet-300 bg-clip-text text-transparent">your dream company.</span>
          </h2>
          <p className="text-slate-300 text-base mb-8 leading-relaxed">
            Join 50,000+ students who've landed at Google, Amazon, Microsoft & more.
          </p>

          <div className="space-y-3 mb-8">
            {perks.map((p, i) => (
              <div key={p} className="flex items-center gap-3 text-sm text-slate-200">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                </div>
                {p}
              </div>
            ))}
          </div>

          {/* Testimonial */}
          <div className="bg-white/8 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">
            <div className="flex gap-0.5 mb-3">
              {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
            </div>
            <p className="text-sm text-slate-300 italic leading-relaxed">
              "From zero to cracking Google SDE interview in 3 months. The structured roadmap made all the difference."
            </p>
            <div className="flex items-center gap-3 mt-4">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-400 to-violet-400 flex items-center justify-center text-white font-bold text-sm">PS</div>
              <div>
                <div className="text-sm font-semibold text-white">Priya Sharma</div>
                <div className="text-xs text-slate-400">SDE-2 at Google</div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-sm text-slate-500 relative z-10">© 2026 InterviewGPT. All rights reserved.</div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-gradient-to-br from-slate-50 via-violet-50/40 to-indigo-50/40 relative overflow-hidden">
        <div className="absolute top-10 right-10 w-64 h-64 bg-violet-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-indigo-200/30 rounded-full blur-3xl" />

        <div className="w-full max-w-md relative z-10">
          <div className="lg:hidden flex items-center gap-2 font-bold text-xl mb-10 text-indigo-600">
            <BrainCircuit className="w-6 h-6" /> InterviewGPT
          </div>

          <div className="bg-white rounded-3xl shadow-xl shadow-violet-100/60 border border-violet-100/80 p-8">
            <div className="mb-7">
              <h1 className="text-2xl font-bold text-gray-900 mb-1.5">Create your free account</h1>
              <p className="text-sm text-gray-500">
                Already have an account?{" "}
                <Link href="/login" className="text-indigo-600 hover:underline font-semibold">Sign in →</Link>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name</Label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                    <User className="w-4 h-4 text-blue-500" />
                  </div>
                  <Input
                    id="name"
                    placeholder="Your full name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="pl-12 h-12 border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-indigo-400"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email address</Label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center">
                    <Mail className="w-4 h-4 text-indigo-500" />
                  </div>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="pl-12 h-12 border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-indigo-400"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">Password</Label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-violet-50 rounded-lg flex items-center justify-center">
                    <Lock className="w-4 h-4 text-violet-500" />
                  </div>
                  <Input
                    id="password"
                    type={showPass ? "text" : "password"}
                    placeholder="Minimum 6 characters"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="pl-12 pr-10 h-12 border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-indigo-400"
                  />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">{error}</div>
              )}

              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-indigo-600 to-violet-600 text-white border-0 hover:opacity-90 font-semibold text-base rounded-xl shadow-md shadow-indigo-200 mt-1"
                disabled={loading}
              >
                {loading ? "Creating account..." : (<>Create Account <ArrowRight className="w-4 h-4 ml-1.5" /></>)}
              </Button>
            </form>

            <p className="text-xs text-gray-400 text-center mt-5">
              By signing up, you agree to our{" "}
              <span className="text-indigo-500 cursor-pointer hover:underline">Terms of Service</span> &{" "}
              <span className="text-indigo-500 cursor-pointer hover:underline">Privacy Policy</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
