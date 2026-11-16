'use client';

import React, { useRef, useState } from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  spotlight?: boolean;
}

const PADDING = {
  none: '',
  sm: 'p-4',
  md: 'p-5',
  lg: 'p-6',
};

export function Card({
  interactive = false,
  padding = 'md',
  spotlight = true,
  className = '',
  children,
  onMouseMove,
  ...props
}: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState<{ x: number; y: number; visible: boolean }>({
    x: 0,
    y: 0,
    visible: false,
  });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (interactive && spotlight && cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setCoords({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        visible: true,
      });
    }
    onMouseMove?.(e);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={() => setCoords((prev) => ({ ...prev, visible: false }))}
      className={`relative overflow-hidden bg-white rounded-2xl border border-slate-200/85 shadow-soft ${
        interactive
          ? 'transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-soft-hover hover:border-indigo-200/90 cursor-pointer'
          : ''
      } ${PADDING[padding]} ${className}`}
      {...props}
    >
      {interactive && spotlight && (
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-px transition-opacity duration-300"
          style={{
            opacity: coords.visible ? 1 : 0,
            background: `radial-gradient(360px circle at ${coords.x}px ${coords.y}px, rgba(79, 70, 229, 0.055), transparent 60%)`,
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
