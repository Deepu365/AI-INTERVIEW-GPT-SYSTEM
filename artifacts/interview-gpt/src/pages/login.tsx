import { useState } from "react";
import { Link, useLocation } from "wouter";
import { BrainCircuit, Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/use-auth";

export default function Login() {
  const [, navigate] = useLocation();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) { setError("Please fill in all fields."); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    const name = email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, c => c.toUpperCase());
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
          <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center mb-6">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="text-3xl font-bold mb-4 leading-tight">Welcome back, future tech leader.</h2>
          <p className="text-indigo-200 text-lg leading-relaxed">
            Pick up right where you left off. Your streak, progress, and personalized roadmap are waiting.
          </p>
          <div className="mt-10 space-y-4">
            {[
              { emoji: "🔥", text: "Keep your daily study streak going" },
              { emoji: "📈", text: "Track your improvement across all categories" },
              { emoji: "🎯", text: "One step closer to your dream company" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-3 text-sm text-indigo-100">
                <span className="text-lg">{item.emoji}</span>
                {item.text}
              </div>
            ))}
          </div>
        </div>
        <div className="text-sm text-indigo-300">© 2026 InterviewGPT. All rights reserved.</div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2 font-bold text-xl mb-10 text-indigo-600">
            <BrainCircuit className="w-6 h-6" /> InterviewGPT
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Sign in</h1>
          <p className="text-gray-500 mb-8">
            New here?{" "}
            <Link href="/signup" className="text-indigo-600 hover:underline font-medium">Create a free account</Link>
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
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
                  className="pl-9 h-11 border-gray-200 focus:border-indigo-400 focus:ring-indigo-400"
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
                  placeholder="Enter your password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="pl-9 pr-10 h-11 border-gray-200 focus:border-indigo-400 focus:ring-indigo-400"
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">{error}</div>}

            <Button
              type="submit"
              className="w-full h-11 bg-gradient-to-r from-indigo-600 to-violet-600 text-white border-0 hover:opacity-90 font-semibold text-base shadow-md shadow-indigo-200"
              disabled={loading}
            >
              {loading ? "Signing in..." : (<>Sign in <ArrowRight className="w-4 h-4 ml-1" /></>)}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100" /></div>
            <div className="relative flex justify-center text-xs text-gray-400 bg-white px-3">or continue with</div>
          </div>

          <Button
            variant="outline"
            className="w-full h-11 border-gray-200 text-gray-700 font-medium hover:bg-gray-50 hover:border-indigo-200"
            onClick={() => { login("demo@interviewgpt.ai", "Demo User"); navigate("/dashboard"); }}
          >
            <span className="mr-2 text-base">🚀</span> Continue as Demo User
          </Button>
        </div>
      </div>
    </div>
  );
}
