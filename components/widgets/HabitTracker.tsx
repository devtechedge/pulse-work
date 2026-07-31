'use client';

import React from 'react';
import { useWorkspace } from '@/context/WorkspaceContext';
import { CheckCircle2, Flame, Award, Plus } from 'lucide-react';

export function HabitTracker() {
  const { habits, toggleHabitDay } = useWorkspace();
  const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  return (
    <div className="max-w-4xl mx-auto p-4 font-mono text-xs space-y-6">
      {/* Habit Header & Ring Stats */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
        <div>
          <div className="font-bold text-lg text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Flame className="w-5 h-5 text-amber-500 dark:text-amber-400 animate-bounce" /> Daily Habit Tracker
          </div>
          <div className="text-slate-600 dark:text-slate-400 text-xs mt-1">
            Track your daily habits and keep your streak going!
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 font-bold">
            <Award className="w-5 h-5" /> 7 Day Active Streak
          </div>
        </div>
      </div>

      {/* Habit List Table */}
      <div className="space-y-3">
        {habits.map((hb) => (
          <div
            key={hb.id}
            className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-cyan-500/40 transition-colors shadow-sm"
          >
            <div>
              <div className="font-bold text-slate-900 dark:text-slate-100 text-sm">{hb.name}</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                Target: {hb.target} • Completed {hb.current}/{hb.total} {hb.unit}
              </div>
            </div>

            {/* M-F Checkbox Matrix */}
            <div className="flex items-center gap-2">
              {hb.weekDays.map((isDone, dayIdx) => (
                <button
                  key={dayIdx}
                  onClick={() => toggleHabitDay(hb.id, dayIdx)}
                  className={`w-9 h-9 rounded-lg flex flex-col items-center justify-center font-bold text-[10px] transition-all ${
                    isDone
                      ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20 scale-105'
                      : 'bg-slate-100 dark:bg-white/5 text-slate-500 hover:text-slate-800 dark:hover:text-slate-300 border border-slate-200 dark:border-white/10'
                  }`}
                >
                  <span>{weekDays[dayIdx]}</span>
                  {isDone && <CheckCircle2 className="w-3 h-3 mt-0.5" />}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
