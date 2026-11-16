'use client';

import React from 'react';
import { AlertCircle, CheckCircle2, Info, X } from 'lucide-react';

export interface ToastItem {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'error';
}

interface ToastContainerProps {
  toasts: ToastItem[];
  onDismiss: (id: string) => void;
}

export function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const barColor =
          toast.type === 'error'
            ? 'bg-rose-500'
            : toast.type === 'info'
            ? 'bg-sky-500'
            : 'bg-emerald-500';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto relative overflow-hidden flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-white/95 backdrop-blur-md border shadow-glass animate-slide-up ${
              toast.type === 'error' ? 'border-rose-200' : 'border-slate-200/90'
            }`}
          >
            {toast.type === 'error' ? (
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            ) : toast.type === 'info' ? (
              <Info className="w-4 h-4 text-sky-600 shrink-0" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            )}
            <p className="text-xs font-semibold text-slate-800 flex-1">{toast.message}</p>
            <button
              onClick={() => onDismiss(toast.id)}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            <span
              className={`absolute bottom-0 left-0 right-0 h-0.5 origin-left ${barColor} animate-toast-drain`}
            />
          </div>
        );
      })}
    </div>
  );
}
