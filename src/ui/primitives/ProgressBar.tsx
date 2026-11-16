import React from 'react';

interface ProgressBarProps {
  value: number;
  colorClass?: string;
  heightClass?: string;
}

export function ProgressBar({
  value,
  colorClass = 'bg-gradient-to-r from-indigo-600 via-indigo-500 to-sky-500',
  heightClass = 'h-2',
}: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div className={`w-full ${heightClass} rounded-full bg-slate-100 overflow-hidden`}>
      <div
        className={`relative ${heightClass} ${colorClass} rounded-full transition-all duration-700 ease-out overflow-hidden`}
        style={{ width: `${clamped}%` }}
      >
        {clamped > 0 && (
          <span
            aria-hidden
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"
          />
        )}
      </div>
    </div>
  );
}
