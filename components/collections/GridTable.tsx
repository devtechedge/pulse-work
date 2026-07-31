'use client';

import React from 'react';
import { useWorkspace } from '@/context/WorkspaceContext';
import { Plus, CheckSquare, Square, ArrowUpDown, User, Calendar, Tag } from 'lucide-react';

export function GridTable() {
  const { collectionItems, updateCollectionItem, addCollectionItem } = useWorkspace();

  return (
    <div className="overflow-x-auto border border-slate-200 dark:border-white/10 rounded-xl bg-slate-50 dark:bg-[#16181D] font-mono text-xs">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-slate-900/80 text-slate-600 dark:text-slate-400 font-bold uppercase text-[10px] tracking-wider">
            <th className="p-3">ID / Title</th>
            <th className="p-3">Status</th>
            <th className="p-3">Due Date</th>
            <th className="p-3">Budget</th>
            <th className="p-3">Assignee</th>
            <th className="p-3">Priority</th>
            <th className="p-3">Tags</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 dark:divide-white/10">
          {collectionItems.map((item) => (
            <tr
              key={item.id}
              className="hover:bg-cyan-500/5 transition-colors group text-slate-800 dark:text-slate-200"
            >
              <td className="p-3 font-semibold flex items-center gap-2">
                <span className="text-cyan-500 text-[10px]">{item.id}</span>
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => updateCollectionItem(item.id, { title: e.target.value })}
                  className="bg-transparent outline-none w-full font-bold text-slate-900 dark:text-slate-100 focus:text-cyan-400"
                />
              </td>

              <td className="p-3">
                <select
                  value={item.status}
                  onChange={(e) =>
                    updateCollectionItem(item.id, {
                      status: e.target.value as 'To Do' | 'In Progress' | 'Complete',
                    })
                  }
                  className="bg-slate-200/80 dark:bg-white/10 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-white/10 rounded px-2 py-1 text-[11px] font-bold outline-none"
                >
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Complete">Complete</option>
                </select>
              </td>

              <td className="p-3 text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-1">
                <Calendar className="w-3 h-3 text-cyan-400" />
                {item.dueDate}
              </td>

              <td className="p-3 text-emerald-600 dark:text-emerald-400 font-bold">
                {item.budget || '$0'}
              </td>

              <td className="p-3 text-slate-700 dark:text-slate-300 font-medium">
                {item.assignee}
              </td>

              <td className="p-3">
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    item.priority === 'High'
                      ? 'bg-rose-500/20 text-rose-500 border border-rose-500/30'
                      : item.priority === 'Medium'
                      ? 'bg-amber-500/20 text-amber-500 border border-amber-500/30'
                      : 'bg-emerald-500/20 text-emerald-500 border border-emerald-500/30'
                  }`}
                >
                  {item.priority}
                </span>
              </td>

              <td className="p-3">
                <div className="flex flex-wrap gap-1">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-600 dark:text-cyan-300 border border-cyan-500/20 text-[10px]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="p-3 bg-slate-100/50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-white/10 flex items-center justify-between">
        <button
          onClick={() => addCollectionItem({ title: 'New Deliverable Row' })}
          className="water-drop-effect flex items-center gap-1.5 px-3 py-1.5 rounded bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-bold hover:bg-cyan-500/20 transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Row
        </button>
        <span className="text-[10px] text-slate-400">
          Showing {collectionItems.length} records
        </span>
      </div>
    </div>
  );
}
