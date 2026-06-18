import { Link, useLocation } from "wouter";
import { 
  LayoutDashboard, 
  Code2, 
  Users, 
  BrainCircuit, 
  Video, 
  FileText, 
  Briefcase, 
  Trophy, 
  Map, 
  Bookmark, 
  Lightbulb, 
  CalendarDays, 
  UserCircle 
} from "lucide-react";

export function SidebarNav() {
  const [location] = useLocation();

  const links = [
    { href: "/", label: "Dashboard", icon: LayoutDashboard },
    { href: "/coding", label: "Coding Practice", icon: Code2 },
    { href: "/hr", label: "HR Interview", icon: Users },
    { href: "/aptitude", label: "Aptitude Tests", icon: BrainCircuit },
    { href: "/mock", label: "Mock Sessions", icon: Video },
    { href: "/resume", label: "Resume Analyzer", icon: FileText },
    { href: "/jobs", label: "Job Match", icon: Briefcase },
    { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
    { href: "/roadmap", label: "Learning Roadmap", icon: Map },
    { href: "/bookmarks", label: "Bookmarks", icon: Bookmark },
    { href: "/tips", label: "Tips & Resources", icon: Lightbulb },
    { href: "/schedule", label: "Schedule", icon: CalendarDays },
    { href: "/profile", label: "Profile", icon: UserCircle },
  ];

  return (
    <div className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col h-full sticky top-0">
      <div className="h-16 flex items-center px-6 border-b border-sidebar-border">
        <div className="flex items-center gap-2 text-primary font-bold text-xl tracking-tight">
          <BrainCircuit className="w-6 h-6" />
          <span>InterviewGPT</span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-1">
        {links.map((link) => {
          const isActive = location === link.href || (link.href !== "/" && location.startsWith(link.href));
          const Icon = link.icon;
          return (
            <Link 
              key={link.href} 
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive 
                  ? "bg-sidebar-primary/10 text-sidebar-primary" 
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`}
            >
              <Icon className="w-4 h-4" />
              {link.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
