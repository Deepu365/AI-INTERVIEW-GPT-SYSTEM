import { Link, useLocation } from "wouter";
import {
  LayoutDashboard, Code2, Users, BrainCircuit, Video,
  FileText, Briefcase, Trophy, Map, Bookmark, Lightbulb,
  CalendarDays, UserCircle, LogOut, Flame
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useLocation as useWouterLocation } from "wouter";

const navLinks = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, group: "main" },
  { href: "/coding", label: "Coding Practice", icon: Code2, group: "practice" },
  { href: "/hr", label: "HR Interview", icon: Users, group: "practice" },
  { href: "/aptitude", label: "Aptitude Tests", icon: BrainCircuit, group: "practice" },
  { href: "/mock", label: "Mock Sessions", icon: Video, group: "practice" },
  { href: "/resume", label: "Resume Analyzer", icon: FileText, group: "tools" },
  { href: "/jobs", label: "Job Match", icon: Briefcase, group: "tools" },
  { href: "/leaderboard", label: "Leaderboard", icon: Trophy, group: "tools" },
  { href: "/roadmap", label: "Learning Roadmap", icon: Map, group: "tools" },
  { href: "/bookmarks", label: "Bookmarks", icon: Bookmark, group: "misc" },
  { href: "/tips", label: "Tips & Resources", icon: Lightbulb, group: "misc" },
  { href: "/schedule", label: "Schedule", icon: CalendarDays, group: "misc" },
  { href: "/profile", label: "Profile", icon: UserCircle, group: "misc" },
];

const groupLabels: Record<string, string> = {
  main: "",
  practice: "Practice",
  tools: "Career Tools",
  misc: "More",
};

export function SidebarNav() {
  const [location] = useLocation();
  const [, navigate] = useWouterLocation();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const groups = ["main", "practice", "tools", "misc"];

  return (
    <div className="w-64 flex flex-col h-full sticky top-0 bg-[#0f172a] text-slate-300">
      {/* Logo */}
      <div className="h-16 flex items-center px-5 border-b border-white/5 shrink-0">
        <Link href="/">
          <div className="flex items-center gap-2.5 cursor-pointer">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-900/40">
              <BrainCircuit className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg text-white tracking-tight">InterviewGPT</span>
          </div>
        </Link>
      </div>

      {/* User badge */}
      {user && (
        <div className="mx-4 mt-4 rounded-xl bg-white/5 border border-white/10 px-3 py-2.5 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white font-bold text-xs shrink-0">
            {user.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()}
          </div>
          <div className="min-w-0">
            <div className="text-sm font-medium text-white truncate">{user.name}</div>
            <div className="text-xs text-slate-400 truncate">{user.email}</div>
          </div>
          <div className="ml-auto flex items-center gap-1 text-orange-400 shrink-0">
            <Flame className="w-3.5 h-3.5" />
            <span className="text-xs font-semibold">7</span>
          </div>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-5">
        {groups.map((group) => {
          const links = navLinks.filter(l => l.group === group);
          return (
            <div key={group}>
              {groupLabels[group] && (
                <div className="text-[10px] font-semibold uppercase tracking-widest text-slate-500 px-3 mb-1.5">
                  {groupLabels[group]}
                </div>
              )}
              <div className="space-y-0.5">
                {links.map((link) => {
                  const isActive = location === link.href || (link.href !== "/dashboard" && location.startsWith(link.href));
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                        isActive
                          ? "bg-indigo-600 text-white shadow-md shadow-indigo-900/40"
                          : "text-slate-400 hover:text-white hover:bg-white/8"
                      }`}
                    >
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-white" : "text-slate-500"}`} />
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 pb-4 border-t border-white/5 pt-3 shrink-0">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-150"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </div>
  );
}
