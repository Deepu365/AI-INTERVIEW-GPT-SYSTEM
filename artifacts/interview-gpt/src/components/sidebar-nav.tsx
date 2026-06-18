import { Link, useLocation } from "wouter";
import {
  LayoutDashboard, Code2, Users, BrainCircuit, Video,
  FileText, Briefcase, Trophy, Map, Bookmark, Lightbulb,
  CalendarDays, UserCircle, LogOut, Flame
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useLocation as useWouterLocation } from "wouter";

const navLinks = [
  { href: "/dashboard",   label: "Dashboard",        icon: LayoutDashboard, group: "main",     iconColor: "from-indigo-500 to-blue-500" },
  { href: "/coding",      label: "Coding Practice",   icon: Code2,           group: "practice", iconColor: "from-blue-500 to-cyan-500" },
  { href: "/hr",          label: "HR Interview",      icon: Users,           group: "practice", iconColor: "from-violet-500 to-purple-500" },
  { href: "/aptitude",    label: "Aptitude Tests",    icon: BrainCircuit,    group: "practice", iconColor: "from-emerald-500 to-teal-500" },
  { href: "/mock",        label: "Mock Sessions",     icon: Video,           group: "practice", iconColor: "from-orange-500 to-amber-500" },
  { href: "/resume",      label: "Resume Analyzer",   icon: FileText,        group: "tools",    iconColor: "from-rose-500 to-pink-500" },
  { href: "/jobs",        label: "Job Match",         icon: Briefcase,       group: "tools",    iconColor: "from-cyan-500 to-blue-500" },
  { href: "/leaderboard", label: "Leaderboard",       icon: Trophy,          group: "tools",    iconColor: "from-amber-500 to-yellow-500" },
  { href: "/roadmap",     label: "Learning Roadmap",  icon: Map,             group: "tools",    iconColor: "from-indigo-500 to-violet-500" },
  { href: "/bookmarks",   label: "Bookmarks",         icon: Bookmark,        group: "misc",     iconColor: "from-slate-500 to-gray-500" },
  { href: "/tips",        label: "Tips & Resources",  icon: Lightbulb,       group: "misc",     iconColor: "from-yellow-500 to-amber-500" },
  { href: "/schedule",    label: "Schedule",          icon: CalendarDays,    group: "misc",     iconColor: "from-teal-500 to-emerald-500" },
  { href: "/profile",     label: "Profile",           icon: UserCircle,      group: "misc",     iconColor: "from-violet-500 to-indigo-500" },
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
    <div className="w-64 flex flex-col h-full sticky top-0 bg-[#0f172a] text-slate-300 shrink-0">
      {/* Logo */}
      <div className="h-16 flex items-center px-5 border-b border-white/5 shrink-0">
        <Link href="/">
          <div className="flex items-center gap-2.5 cursor-pointer">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-900/40">
              <BrainCircuit className="w-4.5 h-4.5 text-white" />
            </div>
            <span className="font-bold text-lg text-white tracking-tight">InterviewGPT</span>
          </div>
        </Link>
      </div>

      {/* User badge */}
      {user && (
        <div className="mx-4 mt-4 rounded-xl bg-gradient-to-r from-indigo-900/60 to-violet-900/60 border border-white/10 px-3 py-2.5 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white font-bold text-xs shrink-0 shadow">
            {user.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()}
          </div>
          <div className="min-w-0">
            <div className="text-sm font-semibold text-white truncate">{user.name}</div>
            <div className="text-[10px] text-slate-400 truncate">{user.email}</div>
          </div>
          <div className="ml-auto flex items-center gap-1 bg-orange-500/20 rounded-full px-2 py-0.5 shrink-0">
            <Flame className="w-3 h-3 text-orange-400" />
            <span className="text-[10px] font-bold text-orange-400">7</span>
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
                <div className="text-[9px] font-black uppercase tracking-[0.15em] text-slate-500 px-3 mb-1.5">
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
                      className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-150 ${
                        isActive
                          ? "bg-gradient-to-r from-indigo-600/90 to-violet-600/90 text-white shadow-md shadow-indigo-900/40"
                          : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                      }`}
                    >
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                        isActive
                          ? "bg-white/20"
                          : `bg-gradient-to-br ${link.iconColor} opacity-80`
                      }`}>
                        <Icon className="w-3.5 h-3.5 text-white" />
                      </div>
                      <span>{link.label}</span>
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
          className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all duration-150"
        >
          <div className="w-7 h-7 rounded-lg bg-red-500/20 flex items-center justify-center shrink-0">
            <LogOut className="w-3.5 h-3.5 text-red-400" />
          </div>
          Sign Out
        </button>
      </div>
    </div>
  );
}
