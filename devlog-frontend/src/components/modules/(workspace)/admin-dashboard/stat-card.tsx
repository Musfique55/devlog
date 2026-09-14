'use client';

import { ReactNode } from 'react';

interface StatCardProps {
  label: string;
  value: number | string;
  subtext?: string;
  icon?: ReactNode;
  trend?: string;
  trendColor?: string;
  children?: ReactNode;
  variant?: 'default' | 'warning' | 'success';
}

export function WorkspaceAdminStatCard({
  label,
  value,
  subtext,
  icon,
  trend,
  trendColor = 'text-primary',
  children,
  variant = 'default',
}: StatCardProps) {
  const borderClass = {
    default: '',
    warning: 'border-l-2 border-tertiary-container/50',
    success: '',
  }[variant];

  const valueColor = {
    default: 'text-on-background',
    warning: 'text-tertiary',
    success: 'text-on-background',
  }[variant];

  return (
    <div className={`bg-surface-container p-6 rounded-xl relative overflow-hidden group ${borderClass}`}>
      <div className="flex justify-between items-start mb-4">
        <span className="text-[0.6875rem] font-medium uppercase tracking-[0.05em] text-zinc-500">{label}</span>
        {icon && <div className="text-lg">{icon}</div>}
      </div>

      <div className="flex items-baseline gap-2">
        <span className={`text-3xl font-bold tracking-tight ${valueColor}`}>{value}</span>
        {trend && <span className={`text-xs font-bold ${trendColor}`}>{trend}</span>}
      </div>

      {subtext && <p className="mt-6 text-xs text-zinc-500 leading-relaxed">{subtext}</p>}

      {children && <div className="mt-6">{children}</div>}
    </div>
  );
}
