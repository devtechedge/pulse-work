'use client';

import React from 'react';
import { useWorkspace } from '@/context/WorkspaceContext';
import { Layers, CheckCircle2 } from 'lucide-react';

export function GanttTimeline() {
  const { collectionItems } = useWorkspace();

  const weeks = ['Wk 41', 'Wk 42', 'Wk 43', 'Wk 44', 'Wk 45'];

  return (
    <div className="border border-slate-200 dark:border-white/10 rounded-xl p-4 bg-slate-50 dark:bg-[#16181D] font-mono text-xs overflow-x-auto">
      <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-slate-100 mb-4 pb-3 border-b border-slate-200 dark:border-white/10">
        <Layers className="w-4 h-4 text-cyan-400" />
        <span>Gantt & Timeline Milestones</span>
      </div>

      <div className="min-w-[650px]">
        {/* Timeline Header Weeks */}
        <div className="grid grid-cols-6 gap-2 border-b border-slate-200 dark:border-white/10 pb-2 text-[10px] font-bold text-slate-400 uppercase">
          <span className="col-span-2">Task Milestone</span>
          {weeks.map((w) => (
            <span key={w} className="text-center">
              {w}
            </span>
          ))}
        </div>

        {/* Milestone Rows */}
        <div className="divide-y divide-slate-200 dark:divide-white/5 py-2 space-y-3">
          {collectionItems.map((item, i) => (
            <div key={item.id} className="grid grid-cols-6 gap-2 items-center pt-2">
              <div className="col-span-2 font-bold text-slate-900 dark:text-slate-100 truncate">
                <span className="text-cyan-500 text-[10px] mr-1">{item.id}</span>
                {item.title}
              </div>

              {/* Bar track spanning weeks */}
              <div className="col-span-4 relative h-7 bg-slate-200/60 dark:bg-white/5 rounded-full overflow-hidden flex items-center p-0.5">
                <div
                  className={`h-full rounded-full transition-all flex items-center justify-between px-2 font-bold text-[9px] ${
                    item.status === 'Complete'
                      ? 'bg-emerald-500 text-slate-950 w-full'
                      : i % 2 === 0
                      ? 'bg-cyan-500 text-slate-950 w-3/4 ml-[10%]'
                      : 'bg-amber-500 text-slate-950 w-1/2 ml-[25%]'
                  }`}
                >
                  <span>{item.assignee}</span>
                  <span>{item.dueDate}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
