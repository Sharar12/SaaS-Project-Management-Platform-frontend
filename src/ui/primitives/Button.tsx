'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const VARIANTS: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary:
    'bg-gradient-to-b from-indigo-500 to-indigo-600 text-white border border-indigo-600 shadow-[0_1px_2px_rgba(79,70,229,0.35),inset_0_1px_0_rgba(255,255,255,0.22)] hover:from-indigo-500 hover:to-indigo-700 hover:shadow-[0_8px_20px_-4px_rgba(79,70,229,0.4)]',
  secondary:
    'bg-white text-slate-700 border border-slate-200/90 shadow-[0_1px_2px_rgba(15,23,42,0.04)] hover:bg-slate-50/90 hover:text-slate-900 hover:border-slate-300 hover:shadow-soft',
  ghost:
    'bg-transparent text-slate-600 border border-transparent hover:bg-slate-100/80 hover:text-slate-900',
  danger:
    'bg-white text-rose-600 border border-rose-200 hover:bg-rose-50 hover:border-rose-300 shadow-[0_1px_2px_rgba(225,29,72,0.06)]',
};

const SIZES: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'h-8 px-3 text-xs gap-1.5 rounded-lg',
  md: 'h-9 px-4 text-sm gap-2 rounded-xl',
  lg: 'h-11 px-6 text-sm gap-2 rounded-xl',
};

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  leftIcon,
  rightIcon,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={`group relative overflow-hidden inline-flex items-center justify-center font-semibold tracking-[-0.01em] transition-all duration-200 active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-4 focus:ring-indigo-500/15 ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      {...props}
    >
      {/* Subtle diagonal light sweep on primary buttons */}
      {variant === 'primary' && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
        />
      )}

      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin shrink-0" />
      ) : (
        leftIcon && (
          <span className="shrink-0 transition-transform duration-200 group-hover:scale-105">
            {leftIcon}
          </span>
        )
      )}

      <span className="relative z-10 inline-flex items-center">{children}</span>

      {!loading && rightIcon && (
        <span className="relative z-10 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5">
          {rightIcon}
        </span>
      )}
    </button>
  );
}
