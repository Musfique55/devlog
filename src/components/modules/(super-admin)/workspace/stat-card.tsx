const WorkspaceStatCard = ({
  label,
  value,
  subtext,
  icon: Icon,
  variant = 'default',
}: {
  label: string;
  value: string;
  subtext: string;
  icon: React.ReactNode;
  variant?: 'default' | 'featured';
}) => (
  <div
    className={`p-6 rounded-xl flex flex-col justify-between h-32 relative overflow-hidden ${
      variant === 'featured'
        ? 'bg-purple-500/10 ring-1 ring-purple-500/20'
        : 'bg-zinc-900'
    }`}
  >
    <div className="flex justify-between items-start z-10">
      <span className="text-[10px] font-bold tracking-[0.2em] text-gray-300 uppercase">
        {label}
      </span>
      <div className="text-purple-400/50">{Icon}</div>
    </div>
    <div className="z-10">
      <div
        className={`text-3xl font-black tracking-tighter ${
          variant === 'featured' ? 'text-purple-300' : 'text-zinc-100'
        }`}
      >
        {value}
      </div>
      <div
        className={`text-[10px] font-bold ${
          variant === 'featured'
            ? 'text-purple-300'
            : 'text-slate-400'
        }`}
      >
        {subtext}
      </div>
    </div>
    {variant === 'featured' && (
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-transparent"></div>
    )}
    {variant === 'default' && (
      <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-purple-500/5 rounded-full blur-3xl"></div>
    )}
  </div>
);

export default WorkspaceStatCard;