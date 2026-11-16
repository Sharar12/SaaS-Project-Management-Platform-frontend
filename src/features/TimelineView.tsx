'use client';

import React, { useMemo } from 'react';
import { Calendar } from 'lucide-react';
import { Badge, Card } from '@/ui';
import { useWorkspace } from './WorkspaceContext';

const DAY_MS = 86_400_000;

export function TimelineView() {
  const { projects, tasks, openTaskDrawer } = useWorkspace();

  const { minMs, totalMs, axisLabels } = useMemo(() => {
    const timestamps: number[] = [];
    projects.forEach((p) => {
      timestamps.push(new Date(p.startDate).getTime(), new Date(p.dueDate).getTime());
    });
    tasks.forEach((t) => {
      timestamps.push(new Date(t.startDate).getTime(), new Date(t.dueDate).getTime());
    });

    const min = timestamps.length ? Math.min(...timestamps) - 2 * DAY_MS : Date.now();
    const max = timestamps.length
      ? Math.max(...timestamps) + 3 * DAY_MS
      : Date.now() + 30 * DAY_MS;
    const span = Math.max(7 * DAY_MS, max - min);

    const labels = [0, 0.25, 0.5, 0.75].map((ratio) =>
      new Date(min + span * ratio).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      })
    );

    return { minMs: min, totalMs: span, axisLabels: labels };
  }, [projects, tasks]);

  const getSpanStyle = (startDate: string, dueDate: string) => {
    const start = new Date(startDate).getTime();
    const end = Math.max(start + DAY_MS, new Date(dueDate).getTime());
    const leftPct = Math.max(0, Math.min(92, ((start - minMs) / totalMs) * 100));
    const widthPct = Math.max(8, Math.min(100 - leftPct, ((end - start) / totalMs) * 100));
    return { left: `${leftPct}%`, width: `${widthPct}%` };
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Roadmap Timeline</h1>
        <p className="text-sm text-slate-500 mt-1">
          Accurate multi-month schedule across active company projects.
        </p>
      </div>

      <Card padding="none" className="overflow-hidden">
        <div className="grid grid-cols-12 border-b border-slate-200/80 bg-slate-50/80 text-[11px] font-semibold text-slate-500">
          <div className="col-span-4 py-3 px-4 border-r border-slate-200/60 flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5" />
            Initiative / Deliverable
          </div>
          <div className="col-span-8 grid grid-cols-4">
            {axisLabels.map((lbl, i) => (
              <div key={i} className="py-3 px-3 border-r border-slate-200/50 last:border-r-0">
                {lbl}
              </div>
            ))}
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {projects.map((proj) => {
            const projTasks = tasks.filter((t) => t.projectId === proj.id);
            return (
              <div key={proj.id}>
                <div className="grid grid-cols-12 bg-slate-50/40 px-4 py-2.5 items-center">
                  <div className="col-span-4 flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: proj.color }}
                    />
                    <span className="text-xs font-bold text-slate-800">{proj.name}</span>
                  </div>
                  <div className="col-span-8 text-[11px] text-slate-400">
                    {proj.startDate} → {proj.dueDate}
                  </div>
                </div>

                {projTasks.map((task) => (
                  <div
                    key={task.id}
                    onClick={() => openTaskDrawer(task.id)}
                    className="grid grid-cols-12 items-center hover:bg-slate-50/70 transition-colors cursor-pointer"
                  >
                    <div className="col-span-4 py-3 px-4 border-r border-slate-100 flex items-center justify-between gap-2">
                      <span className="text-xs font-medium text-slate-800 truncate">
                        <span className="text-slate-400 mr-1.5">{task.code}</span>
                        {task.title}
                      </span>
                      <Badge tone={task.status === 'done' ? 'emerald' : 'indigo'}>
                        {task.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    <div className="col-span-8 relative h-10 px-2 flex items-center">
                      <div
                        className="absolute h-6 rounded-lg px-2.5 flex items-center text-[11px] font-medium text-white shadow-xs transition-all hover:brightness-110 truncate"
                        style={{ ...getSpanStyle(task.startDate, task.dueDate), backgroundColor: proj.color }}
                      >
                        {task.code}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
