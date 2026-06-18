interface PageHeaderProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
  iconBg: string;
  badge?: string;
  actions?: React.ReactNode;
}

export function PageHeader({ icon, title, description, gradient, iconBg, badge, actions }: PageHeaderProps) {
  return (
    <div className={`relative overflow-hidden rounded-2xl p-6 mb-6 bg-gradient-to-br ${gradient}`}>
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-8 -right-8 w-48 h-48 rounded-full bg-white/30 blur-2xl" />
        <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-white/20 blur-xl" />
      </div>
      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className={`w-14 h-14 rounded-2xl ${iconBg} flex items-center justify-center shadow-lg shrink-0`}>
            {icon}
          </div>
          <div>
            {badge && (
              <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-white/70 bg-white/15 rounded-full px-2.5 py-0.5 mb-1">
                {badge}
              </span>
            )}
            <h1 className="text-2xl font-extrabold text-white tracking-tight leading-tight">{title}</h1>
            <p className="text-white/70 text-sm mt-0.5">{description}</p>
          </div>
        </div>
        {actions && <div className="hidden md:block">{actions}</div>}
      </div>
    </div>
  );
}
