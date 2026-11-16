'use client';

import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
}

export function Input({ label, hint, className = '', ...props }: InputProps) {
  return (
    <label className="block space-y-1.5 group">
      {label && (
        <span className="block text-xs font-semibold text-slate-700 transition-colors group-focus-within:text-indigo-600">
          {label}
        </span>
      )}
      <input
        className={`w-full h-10 px-3.5 rounded-xl bg-white border border-slate-200/90 text-sm text-slate-900 placeholder:text-slate-400 shadow-[0_1px_2px_rgba(15,23,42,0.02)] transition-all duration-200 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/12 hover:border-slate-300 ${className}`}
        {...props}
      />
      {hint && <span className="block text-[11px] text-slate-400">{hint}</span>}
    </label>
  );
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export function Textarea({ label, className = '', ...props }: TextareaProps) {
  return (
    <label className="block space-y-1.5 group">
      {label && (
        <span className="block text-xs font-semibold text-slate-700 transition-colors group-focus-within:text-indigo-600">
          {label}
        </span>
      )}
      <textarea
        className={`w-full p-3.5 rounded-xl bg-white border border-slate-200/90 text-sm text-slate-900 placeholder:text-slate-400 shadow-[0_1px_2px_rgba(15,23,42,0.02)] transition-all duration-200 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/12 hover:border-slate-300 ${className}`}
        {...props}
      />
    </label>
  );
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
}

export function Select({ label, className = '', children, ...props }: SelectProps) {
  return (
    <label className="block space-y-1.5 group">
      {label && (
        <span className="block text-xs font-semibold text-slate-700 transition-colors group-focus-within:text-indigo-600">
          {label}
        </span>
      )}
      <select
        className={`w-full h-10 px-3 rounded-xl bg-white border border-slate-200/90 text-sm text-slate-900 shadow-[0_1px_2px_rgba(15,23,42,0.02)] transition-all duration-200 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/12 hover:border-slate-300 ${className}`}
        {...props}
      >
        {children}
      </select>
    </label>
  );
}
