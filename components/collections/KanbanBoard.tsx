'use client';

import React from 'react';
import { useWorkspace } from '@/context/WorkspaceContext';
import { Plus, Clock, User, DollarSign, ArrowRight } from 'lucide-react';

export function KanbanBoard() {
  const { collectionItems, updateCollectionItem, addCollectionItem } = useWorkspace();

  const columns: { title: 'To Do' | 'In Progress' | 'Complete'; color: string }[] = [
    { title: 'To Do', color: 'border-amber-500/40 bg-amber-500/5' },
    { title: 'In Progress', color: 'border-cyan-500/40 bg-cyan-500/5' },
    { title: 'Complete', color: 'border-emerald-500/40 bg-emerald-500/5' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
      {columns.map((col) => {
        const items = collectionItems.filter((item) => item.status === col.title);
        return (
          <div
            key={col.title}
            className={`p-4 rounded-xl border ${col.color} backdrop-blur-md flex flex-col h-full min-h-[450px]`}
          >
            {/* Column Header */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200 dark:border-white/10">
              <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-slate-100">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                <span>{col.title}</span>
                <span className="px-2 py-0.5 rounded-full bg-slate-200 dark:bg-white/10 text-[10px] text-slate-600 dark:text-slate-300">
                  {items.length}
                </span>
              </div>
              <button
                onClick={() => addCollectionItem({ status: col.title })}
                className="p-1 rounded hover:bg-slate-200 dark:hover:bg-white/10 text-slate-500 dark:text-slate-400 hover:text-cyan-400"
                title="Add Task to column"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Column Cards */}
            <div className="flex-1 space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-lg bg-white dark:bg-[#16181D] border border-slate-200 dark:border-white/10 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all group"
                >
                  {item.imageUrl && (
                    <div className="w-full h-28 rounded mb-3 overflow-hidden">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                  )}

                  <div className="flex items-center justify-between text-[10px] text-cyan-500 font-bold mb-1">
                    <span>{item.id}</span>
                    <span
                      className={`px-1.5 py-0.2 rounded text-[9px] ${
                        item.priority === 'High'
                          ? 'bg-rose-500/20 text-rose-500'
                          : 'bg-emerald-500/20 text-emerald-500'
                      }`}
                    >
                      {item.priority}
                    </span>
                  </div>

                  <div className="font-bold text-slate-900 dark:text-slate-100 text-sm mb-2 group-hover:text-cyan-400 transition-colors">
                    {item.title}
                  </div>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[10px] text-slate-600 dark:text-slate-400"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3 text-cyan-400" />
                      {item.assignee}
                    </span>
                    <span className="font-bold text-emerald-500">{item.budget}</span>
                  </div>

                  {/* Quick Move Trigger */}
                  <div className="mt-2 pt-2 border-t border-slate-100 dark:border-white/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-end gap-1">
                    {col.title !== 'To Do' && (
                      <button
                        onClick={() =>
                          updateCollectionItem(item.id, {
                            status: col.title === 'Complete' ? 'In Progress' : 'To Do',
                          })
                        }
                        className="px-2 py-0.5 rounded bg-slate-200 dark:bg-white/10 text-[10px] hover:text-cyan-400"
                      >
                        ← Move Left
                      </button>
                    )}
                    {col.title !== 'Complete' && (
                      <button
                        onClick={() =>
                          updateCollectionItem(item.id, {
                            status: col.title === 'To Do' ? 'In Progress' : 'Complete',
                          })
                        }
                        className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 text-[10px] font-bold hover:bg-cyan-500/30"
                      >
                        Move Right →
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
