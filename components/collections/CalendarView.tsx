'use client';

import React, { useState } from 'react';
import { useWorkspace } from '@/context/WorkspaceContext';
import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon } from 'lucide-react';

export function CalendarView() {
  const { collectionItems, addCollectionItem } = useWorkspace();
  const [currentMonth, setCurrentMonth] = useState('October 2023');

  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="border border-slate-200 dark:border-white/10 rounded-xl p-4 bg-slate-50 dark:bg-[#16181D] font-mono text-xs">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200 dark:border-white/10">
        <div className="flex items-center gap-2 text-slate-900 dark:text-slate-100 font-bold text-sm">
          <CalendarIcon className="w-4 h-4 text-cyan-400" />
          <span>{currentMonth} Schedule</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-1 rounded bg-slate-200 dark:bg-white/10 hover:text-cyan-400">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="p-1 rounded bg-slate-200 dark:bg-white/10 hover:text-cyan-400">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Weekday Labels */}
      <div className="grid grid-cols-7 gap-1 text-center font-bold text-[10px] text-slate-500 uppercase pb-2">
        <span>Mon</span>
        <span>Tue</span>
        <span>Wed</span>
        <span>Thu</span>
        <span>Fri</span>
        <span>Sat</span>
        <span>Sun</span>
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => {
          // Check if any collection items match day
          const scheduled = collectionItems.filter((item) =>
            item.dueDate.includes(`${day}`)
          );
          return (
            <div
              key={day}
              onClick={() =>
                addCollectionItem({
                  title: `Scheduled Task Oct ${day}`,
                  dueDate: `Oct ${day}, 2023`,
                })
              }
              className="min-h-[70px] p-1.5 rounded border border-slate-200 dark:border-white/5 bg-white dark:bg-slate-900/60 hover:border-cyan-400/40 transition-colors cursor-pointer group"
            >
              <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 group-hover:text-cyan-400">
                <span>{day}</span>
                <Plus className="w-3 h-3 opacity-0 group-hover:opacity-100" />
              </div>

              <div className="space-y-1 mt-1">
                {scheduled.map((item) => (
                  <div
                    key={item.id}
                    className="p-1 rounded bg-cyan-500/20 text-cyan-300 text-[9px] font-bold truncate border border-cyan-500/30"
                    title={item.title}
                  >
                    {item.title}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
