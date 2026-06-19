import { useState } from "react";
import { Link, useLocation } from "wouter";
import { BrainCircuit, Mail, Lock, Eye, EyeOff, ArrowRight, Code2, Users, Trophy, Zap, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/use-auth";

export default function Login() {
  const [location, navigate] = useLocation();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const justRegistered = new URLSearchParams(window.location.search).get("registered") === "1";

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
      {/* Left Panel — dark gradient */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-900 via-indigo-950 to-violet-900 flex-col justify-between p-12 text-white relative overflow-hidden">
        {/* decorative blobs */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-violet-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <Link href="/">
          <div className="flex items-center gap-2.5 font-bold text-xl cursor-pointer relative z-10">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-400 to-violet-400 flex items-center justify-center shadow-lg">
              <BrainCircuit className="w-5 h-5 text-white" />
            </div>
            <span className="text-white">InterviewGPT</span>
          </div>
        </Link>

        <div className="relative z-10">
          <h2 className="text-4xl font-extrabold mb-4 leading-tight">
            Welcome back,<br />
            <span className="bg-gradient-to-r from-indigo-300 to-violet-300 bg-clip-text text-transparent">future tech leader.</span>
          </h2>
          <p className="text-slate-300 text-base mb-10 leading-relaxed">
            Your streak, progress & personalized roadmap are waiting for you.
          </p>

          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Code2, label: "Coding Questions", value: "500+", color: "from-blue-500 to-cyan-500" },
              { icon: Users, label: "HR Questions", value: "200+", color: "from-violet-500 to-purple-500" },
              { icon: Trophy, label: "Students Placed", value: "50K+", color: "from-amber-500 to-orange-500" },
              { icon: Zap, label: "Success Rate", value: "95%", color: "from-emerald-500 to-teal-500" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm">
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-3`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-white">{item.value}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{item.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="text-sm text-slate-500 relative z-10">© 2026 InterviewGPT. All rights reserved.</div>
      </div>

      {/* Right Panel — rich gradient bg */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-gradient-to-br from-slate-50 via-indigo-50/40 to-violet-50/40 relative overflow-hidden">
        <div className="absolute top-10 right-10 w-64 h-64 bg-indigo-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-violet-200/30 rounded-full blur-3xl" />

        <div className="w-full max-w-md relative z-10">
          <div className="lg:hidden flex items-center gap-2 font-bold text-xl mb-10 text-indigo-600">
            <BrainCircuit className="w-6 h-6" /> InterviewGPT
          </div>

          {/* Card */}
          <div className="bg-white rounded-3xl shadow-xl shadow-indigo-100/60 border border-indigo-100/80 p-8">
            {justRegistered && (
              <div className="flex items-center gap-2.5 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl px-4 py-3 mb-5 text-sm font-medium">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
                Account created! Sign in to get started.
              </div>
            )}
            <div className="mb-7">
              <h1 className="text-2xl font-bold text-gray-900 mb-1.5">Sign in to your account</h1>
              <p className="text-sm text-gray-500">
                New here?{" "}
                <Link href="/signup" className="text-indigo-600 hover:underline font-semibold">Create a free account →</Link>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
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
                    className="pl-12 h-12 border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-indigo-400 focus:ring-indigo-100"
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
                    placeholder="Enter your password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="pl-12 pr-10 h-12 border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-indigo-400 focus:ring-indigo-100"
                  />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-indigo-600 to-violet-600 text-white border-0 hover:opacity-90 font-semibold text-base rounded-xl shadow-md shadow-indigo-200 mt-1"
                disabled={loading}
              >
                {loading ? "Signing in..." : (<>Sign In <ArrowRight className="w-4 h-4 ml-1.5" /></>)}
              </Button>
            </form>

            <div className="relative my-5">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100" /></div>
              <div className="relative flex justify-center text-xs text-gray-400 bg-white px-3">or</div>
            </div>

            <Button
              variant="outline"
              className="w-full h-12 border-indigo-200 text-indigo-700 font-semibold hover:bg-indigo-50 rounded-xl text-sm"
              onClick={() => { login("demo@interviewgpt.ai", "Demo User"); navigate("/dashboard"); }}
            >
              <span className="mr-2 text-base">🚀</span> Continue as Demo User
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
