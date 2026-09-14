interface ContributionChartProps {
  data?: number[];
}

export function ContributionChart({ data }: ContributionChartProps) {
  // Static contribution data for 6 months (120 cells)
  const defaultData = [3, 2, 1, 4, 0, 1, 1, 1, 4, 2, 1, 0, 1, 1, 0, 4, 3, 2, 0, 1, 2, 3, 0, 4, 2, 2, 0, 4, 4, 0, 1, 2, 3, 1, 1, 0, 2, 0, 4, 2, 0, 3, 1, 4, 3, 2, 1, 0, 0, 4, 2, 2, 1, 4, 1, 3, 2, 1, 1, 0, 3, 0, 4, 4, 2, 2, 1, 0, 0, 3, 2, 1, 4, 3, 0, 2, 1, 4, 2, 3, 1, 2, 4, 0, 3, 1, 1, 2, 0, 4, 2, 1, 3, 0, 4, 3, 1, 2, 4, 0, 1, 3, 2, 1, 4, 0, 2, 1, 3, 2, 0, 4, 1, 3, 2, 1, 4, 0, 3, 2];
  const chartData = data || defaultData;

  const getIntensity = (value: number): string => {
    const intensities = ['bg-zinc-900', 'bg-primary/20', 'bg-primary/40', 'bg-primary/60', 'bg-primary/80', 'bg-primary'];
    return intensities[Math.min(value, 5)];
  };

  return (
    <section className="bg-zinc-900/60 p-8 rounded-xl border border-zinc-800/50">
      {/* Header */}
      <div className="flex justify-between items-end mb-6">
        <h2 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider">Contribution Activity</h2>
        <span className="text-xs text-zinc-600">Last 6 Months</span>
      </div>

      {/* Chart Grid */}
      <div className="flex flex-wrap gap-1.5">
        {chartData.map((value, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-sm ${getIntensity(value)} transition-colors duration-200 hover:ring-1 hover:ring-primary cursor-pointer`}
            title={`${value} contributions`}
          />
        ))}
      </div>
    </section>
  );
}
