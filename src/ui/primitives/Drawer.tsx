'use client';

import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  headerExtra?: React.ReactNode;
  children: React.ReactNode;
}

export function Drawer({ open, onClose, title, headerExtra, children }: DrawerProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="fixed inset-0 bg-slate-900/20 backdrop-blur-[2px] animate-fade-in"
        onClick={onClose}
      />
      <aside className="relative z-10 w-full max-w-xl bg-white h-full border-l border-slate-200/90 shadow-glass flex flex-col animate-slide-in-right">
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white/95 backdrop-blur-md">
          <div className="flex items-center gap-3">
            {headerExtra}
            {title && <h3 className="text-sm font-semibold text-slate-900">{title}</h3>}
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-all active:scale-95"
            aria-label="Close drawer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">{children}</div>
      </aside>
    </div>
  );
}
