'use client';

import React from 'react';
import { Card } from '../primitives/Card';

interface StatCardProps {
  label: string;
  value: string | number;
  trend?: string;
  trendTone?: 'positive' | 'neutral' | 'warning';
  icon: React.ReactNode;
  iconBg?: string;
}

export function StatCard({
  label,
  value,
  trend,
  trendTone = 'positive',
  icon,
  iconBg = 'bg-indigo-50 text-indigo-600',
}: StatCardProps) {
  const trendColor =
    trendTone === 'positive'
      ? 'text-emerald-700 bg-emerald-50 border-emerald-200/70'
      : trendTone === 'warning'
      ? 'text-amber-700 bg-amber-50 border-amber-200/70'
      : 'text-slate-600 bg-slate-100 border-slate-200/70';

  return (
    <Card interactive className="group">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium text-slate-500">{label}</p>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1.5 tracking-tight">
            {value}
          </p>
          {trend && (
            <span
              className={`inline-block mt-2.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${trendColor}`}
            >
              {trend}
            </span>
          )}
        </div>
        <div
          className={`w-11 h-11 rounded-2xl flex items-center justify-center shadow-xs transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 ${iconBg}`}
        >
          {icon}
        </div>
      </div>

      {/* Bottom accent sweep on hover */}
      <div className="mt-4 h-0.5 w-full bg-slate-100 rounded-full overflow-hidden">
        <div className="h-full w-full bg-gradient-to-r from-indigo-500 to-sky-400 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
      </div>
    </Card>
  );
}
