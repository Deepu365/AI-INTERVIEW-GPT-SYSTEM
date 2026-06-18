import { SidebarNav } from "./sidebar-nav";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-slate-50 w-full overflow-hidden">
      <SidebarNav />
      <main className="flex-1 flex flex-col h-screen overflow-y-auto relative">
        {children}
      </main>
    </div>
  );
}
