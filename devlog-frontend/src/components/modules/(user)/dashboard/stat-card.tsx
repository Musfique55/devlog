interface StatCardProps {
  label: string;
  value: string | number;
  unit?: string;
  accent?: 'primary' | 'default';
}

export function StatCard({ label, value, unit, accent = 'default' }: StatCardProps) {
  return (
    <div className="bg-zinc-900/60 p-6 rounded-xl hover:bg-zinc-900/80 transition-colors border border-zinc-800/50">
      <p className="text-xs font-medium uppercase tracking-widest text-zinc-500 mb-2">{label}</p>
      <div className="flex items-baseline gap-2">
        <h3 className="text-3xl font-bold text-zinc-100">{value}</h3>
        {unit && (
          <span className={accent === 'primary' ? 'text-primary text-sm font-semibold' : 'text-zinc-500 text-sm'}>
            {unit}
          </span>
        )}
      </div>
    </div>
  );
}
