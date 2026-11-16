import React from 'react';
import { Card } from '../primitives/Card';

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <Card className="text-center py-14 px-6 border-dashed bg-white-grid">
      <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200/90 shadow-soft text-indigo-600 flex items-center justify-center mx-auto mb-4 animate-float-slow">
        {icon}
      </div>
      <h3 className="text-base font-bold text-slate-900">{title}</h3>
      <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1.5 leading-relaxed">
        {description}
      </p>
      {action && <div className="mt-6">{action}</div>}
    </Card>
  );
}
