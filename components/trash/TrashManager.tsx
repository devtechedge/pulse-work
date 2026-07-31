'use client';

import React from 'react';
import { useWorkspace } from '@/context/WorkspaceContext';
import { Trash2, RotateCcw, AlertTriangle, FileText, Clock } from 'lucide-react';

export function TrashManager() {
  const { trashItemList, restoreFromTrash, emptyTrash } = useWorkspace();

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-8 font-mono text-xs space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-rose-950/20 border border-rose-500/30 text-rose-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="font-extrabold text-lg flex items-center gap-2 text-rose-400">
            <Trash2 className="w-5 h-5" /> Trash & Archived Items Manager
          </div>
          <div className="text-[11px] opacity-80 mt-1">
            Items in trash are safely retained for 30 days before permanent purging.
          </div>
        </div>

        {trashItemList.length > 0 && (
          <button
            onClick={emptyTrash}
            className="water-drop-effect px-4 py-2 rounded-lg bg-rose-500 text-slate-950 font-bold hover:bg-rose-400 transition-colors shrink-0"
          >
            Empty Trash Now ({trashItemList.length})
          </button>
        )}
      </div>

      {/* Deleted Items Table */}
      {trashItemList.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 space-y-2 shadow-sm">
          <Trash2 className="w-8 h-8 mx-auto opacity-40 text-rose-500 dark:text-rose-400" />
          <div className="font-bold text-slate-800 dark:text-slate-300">Trash is completely empty</div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400">No archived notebook pages or assets found.</div>
        </div>
      ) : (
        <div className="border border-slate-200 dark:border-white/10 rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-sm">
          <div className="p-3 bg-slate-100 dark:bg-slate-950 border-b border-slate-200 dark:border-white/10 grid grid-cols-12 gap-2 text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
            <span className="col-span-5">Deleted Item Name</span>
            <span className="col-span-2">Type</span>
            <span className="col-span-2">Deleted On</span>
            <span className="col-span-3 text-right">Retention / Action</span>
          </div>

          <div className="divide-y divide-slate-200 dark:divide-white/5">
            {trashItemList.map((item) => (
              <div
                key={item.id}
                className="p-3 grid grid-cols-12 gap-2 items-center hover:bg-rose-500/5 transition-colors text-slate-800 dark:text-slate-200"
              >
                <div className="col-span-5 font-bold flex items-center gap-2">
                  <FileText className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
                  <span className="truncate">{item.title}</span>
                </div>

                <div className="col-span-2 text-slate-500 dark:text-slate-400 font-semibold">{item.type}</div>

                <div className="col-span-2 text-slate-400 dark:text-slate-500">{item.deletedAt}</div>

                <div className="col-span-3 flex items-center justify-end gap-2">
                  <span className="text-[10px] text-amber-600 dark:text-amber-400 font-bold hidden sm:inline">
                    {item.daysRemaining} days left
                  </span>
                  <button
                    onClick={() => restoreFromTrash(item.id)}
                    className="water-drop-effect flex items-center gap-1 px-3 py-1 rounded bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30 font-bold"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Restore
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
