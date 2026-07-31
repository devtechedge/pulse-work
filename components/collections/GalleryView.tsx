'use client';

import React from 'react';
import { useWorkspace } from '@/context/WorkspaceContext';
import { User, Tag, Calendar } from 'lucide-react';

export function GalleryView() {
  const { collectionItems } = useWorkspace();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 font-mono text-xs">
      {collectionItems.map((item, idx) => (
        <div
          key={item.id}
          className="rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#16181D] overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all group"
        >
          <div className="relative w-full h-36 bg-slate-800 overflow-hidden">
            <img
              src={
                item.imageUrl ||
                `https://picsum.photos/seed/gallery${idx + 10}/500/300`
              }
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-cyan-400 font-bold text-[10px]">
              {item.id}
            </div>
            <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-emerald-400 font-bold text-[10px]">
              {item.budget || '$1,200'}
            </div>
          </div>

          <div className="p-4 space-y-2">
            <div className="font-bold text-slate-900 dark:text-slate-100 text-sm group-hover:text-cyan-400 transition-colors">
              {item.title}
            </div>

            <div className="flex items-center gap-2 text-[10px] text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1">
                <User className="w-3 h-3 text-cyan-400" /> {item.assignee}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3 text-cyan-400" /> {item.dueDate}
              </span>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  item.status === 'Complete'
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : item.status === 'In Progress'
                    ? 'bg-cyan-500/20 text-cyan-400'
                    : 'bg-amber-500/20 text-amber-400'
                }`}
              >
                {item.status}
              </span>

              <div className="flex gap-1">
                {item.tags.map((t) => (
                  <span
                    key={t}
                    className="px-1.5 py-0.2 rounded bg-slate-100 dark:bg-white/5 text-[9px] text-slate-400"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
