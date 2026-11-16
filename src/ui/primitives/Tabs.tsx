'use client';

import React from 'react';

export interface TabOption {
  id: string;
  label: string;
  count?: number;
}

interface TabsProps {
  options: TabOption[];
  activeId: string;
  onChange: (id: string) => void;
}

export function Tabs({ options, activeId, onChange }: TabsProps) {
  return (
    <div className="inline-flex flex-wrap items-center gap-1 p-1 rounded-2xl bg-slate-100/80 border border-slate-200/70">
      {options.map((tab) => {
        const active = tab.id === activeId;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 ${
              active
                ? 'bg-white text-slate-900 shadow-soft scale-[1.01]'
                : 'text-slate-500 hover:text-slate-800 hover:bg-white/50'
            }`}
          >
            <span>{tab.label}</span>
            {typeof tab.count === 'number' && (
              <span
                className={`px-1.5 py-0.5 rounded-full text-[10px] transition-colors ${
                  active ? 'bg-indigo-50 text-indigo-700' : 'bg-slate-200/70 text-slate-600'
                }`}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
