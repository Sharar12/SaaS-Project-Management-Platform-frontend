import React from 'react';

interface AvatarProps {
  initials: string;
  name?: string;
  colorClass?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  status?: 'online' | 'away' | 'offline';
}

const SIZES = {
  xs: 'w-6 h-6 text-[10px]',
  sm: 'w-7 h-7 text-xs',
  md: 'w-9 h-9 text-xs',
  lg: 'w-11 h-11 text-sm',
};

const STATUS_DOT = {
  online: 'bg-emerald-500',
  away: 'bg-amber-400',
  offline: 'bg-slate-300',
};

export function Avatar({
  initials,
  name,
  colorClass = 'bg-indigo-600',
  size = 'md',
  status,
}: AvatarProps) {
  return (
    <div className="relative inline-flex shrink-0 group" title={name}>
      <div
        className={`${SIZES[size]} ${colorClass} rounded-full text-white font-semibold flex items-center justify-center ring-2 ring-white shadow-xs transition-transform duration-200 group-hover:scale-105`}
      >
        {initials}
      </div>
      {status && (
        <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5">
          {status === 'online' && (
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
          )}
          <span
            className={`relative inline-flex rounded-full h-2.5 w-2.5 ring-2 ring-white ${STATUS_DOT[status]}`}
          />
        </span>
      )}
    </div>
  );
}
