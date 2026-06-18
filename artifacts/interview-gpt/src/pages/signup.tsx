import { useState } from "react";
import { Link, useLocation } from "wouter";
import { BrainCircuit, Mail, Lock, User, Eye, EyeOff, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/use-auth";

const perks = [
  "500+ coding problems from top companies",
  "AI-powered HR answer evaluator",
  "Resume ATS optimizer",
  "Mock interview simulator",
  "Weekly personalized learning roadmap",
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
    login(email, name);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 flex-col justify-between p-12 text-white">
        <Link href="/">
          <div className="flex items-center gap-2 font-bold text-xl cursor-pointer">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
              <BrainCircuit className="w-4 h-4 text-white" />
            </div>
            InterviewGPT
          </div>
        </Link>
        <div>
          <h2 className="text-3xl font-bold mb-4 leading-tight">Start your interview preparation journey today.</h2>
          <p className="text-indigo-200 text-base mb-8 leading-relaxed">
            Join 50,000+ students who've used InterviewGPT to land roles at Google, Amazon, Microsoft, and more.
          </p>
          <div className="space-y-3">
            {perks.map((p) => (
              <div key={p} className="flex items-center gap-3 text-sm text-indigo-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                {p}
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white/10 rounded-2xl p-5">
          <p className="text-sm text-indigo-100 italic leading-relaxed">
            "I went from zero to cracking my Google SDE interview in 3 months with InterviewGPT. The structured roadmap made all the difference."
          </p>
          <div className="flex items-center gap-3 mt-4">
            <div className="w-9 h-9 rounded-full bg-indigo-400 flex items-center justify-center text-white font-bold text-sm">PS</div>
            <div>
              <div className="text-sm font-semibold">Priya Sharma</div>
              <div className="text-xs text-indigo-300">SDE-2 at Google</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2 font-bold text-xl mb-10 text-indigo-600">
            <BrainCircuit className="w-6 h-6" /> InterviewGPT
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create your account</h1>
          <p className="text-gray-500 mb-8">
            Already have an account?{" "}
            <Link href="/login" className="text-indigo-600 hover:underline font-medium">Sign in</Link>
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="name"
                  placeholder="Your full name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="pl-9 h-11 border-gray-200 focus:border-indigo-400"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="pl-9 h-11 border-gray-200 focus:border-indigo-400"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="password"
                  type={showPass ? "text" : "password"}
                  placeholder="Minimum 6 characters"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="pl-9 pr-10 h-11 border-gray-200 focus:border-indigo-400"
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">{error}</div>}

            <Button
              type="submit"
              className="w-full h-11 bg-gradient-to-r from-indigo-600 to-violet-600 text-white border-0 hover:opacity-90 font-semibold text-base shadow-md shadow-indigo-200 mt-2"
              disabled={loading}
            >
              {loading ? "Creating account..." : (<>Create Account <ArrowRight className="w-4 h-4 ml-1" /></>)}
            </Button>
          </form>

          <p className="text-xs text-gray-400 text-center mt-5">
            By creating an account, you agree to our{" "}
            <span className="text-indigo-500 cursor-pointer hover:underline">Terms of Service</span> and{" "}
            <span className="text-indigo-500 cursor-pointer hover:underline">Privacy Policy</span>.
          </p>
        </div>
      </div>
    </div>
  );
}
