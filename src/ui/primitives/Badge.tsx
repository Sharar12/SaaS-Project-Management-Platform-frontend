import React from 'react';

export type BadgeTone = 'neutral' | 'indigo' | 'sky' | 'emerald' | 'amber' | 'rose' | 'violet';

const TONES: Record<BadgeTone, string> = {
  neutral: 'bg-slate-100/90 text-slate-700 border-slate-200/80',
  indigo: 'bg-indigo-50/90 text-indigo-700 border-indigo-200/80',
  sky: 'bg-sky-50/90 text-sky-700 border-sky-200/80',
  emerald: 'bg-emerald-50/90 text-emerald-700 border-emerald-200/80',
  amber: 'bg-amber-50/90 text-amber-700 border-amber-200/80',
  rose: 'bg-rose-50/90 text-rose-700 border-rose-200/80',
  violet: 'bg-violet-50/90 text-violet-700 border-violet-200/80',
};

interface BadgeProps {
  tone?: BadgeTone;
  dot?: boolean;
  pulse?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function Badge({
  tone = 'neutral',
  dot = false,
  pulse = false,
  children,
  className = '',
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-tight border transition-all duration-150 ${TONES[tone]} ${className}`}
    >
      {dot && (
        <span className="relative flex h-1.5 w-1.5">
          {pulse && (
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75" />
          )}
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-current" />
        </span>
      )}
      {children}
    </span>
  );
}
