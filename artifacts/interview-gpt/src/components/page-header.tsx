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
    <div className="flex items-center justify-between mb-6 pb-5 border-b border-gray-100">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg shrink-0`}>
          {icon}
        </div>
        <div>
          {badge && (
            <span className={`inline-block text-[10px] font-bold uppercase tracking-widest bg-gradient-to-r ${gradient} bg-clip-text text-transparent mb-0.5`}>
              {badge}
            </span>
          )}
          <h1 className={`text-2xl font-extrabold tracking-tight bg-gradient-to-r ${gradient} bg-clip-text text-transparent leading-tight`}>
            {title}
          </h1>
          <p className="text-muted-foreground text-sm mt-0.5">{description}</p>
        </div>
      </div>
      {actions && <div>{actions}</div>}
    </div>
  );
}
