'use client';

import React from 'react';
import { useWorkspace, CollectionViewType } from '@/context/WorkspaceContext';
import {
  Table,
  Kanban,
  Calendar,
  Layers,
  Grid,
  Plus,
  SlidersHorizontal,
} from 'lucide-react';
import { GridTable } from './GridTable';
import { KanbanBoard } from './KanbanBoard';
import { CalendarView } from './CalendarView';
import { GanttTimeline } from './GanttTimeline';
import { GalleryView } from './GalleryView';

export function CollectionsContainer() {
  const {
    activeCollectionView,
    setActiveCollectionView,
    addCollectionItem,
    setIsFilterOpen,
  } = useWorkspace();

  const views: { id: CollectionViewType; label: string; icon: React.ReactNode }[] = [
    { id: 'kanban', label: 'Kanban Board', icon: <Kanban className="w-4 h-4" /> },
    { id: 'table', label: 'Data Sheet Table', icon: <Table className="w-4 h-4" /> },
    { id: 'calendar', label: 'Calendar Grid', icon: <Calendar className="w-4 h-4" /> },
    { id: 'gantt', label: 'Gantt & Timeline', icon: <Layers className="w-4 h-4" /> },
    { id: 'gallery', label: 'Gallery Grid Cards', icon: <Grid className="w-4 h-4" /> },
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 dark:bg-[#0B0C10] font-mono text-slate-900 dark:text-slate-100 p-4 sm:p-8 space-y-6 max-w-7xl mx-auto w-full">
      {/* Top Controls Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-white/10">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <span>Collections & Deliverables Data Views</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Dynamic view layouts sharing the same underlying reactive data engine.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-300 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors text-xs font-bold"
          >
            <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
            <span>Filter & Sort Query</span>
          </button>

          <button
            onClick={() => addCollectionItem({ title: 'New Deliverable Item' })}
            className="water-drop-effect flex items-center gap-1.5 px-4 py-2 rounded-lg bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 transition-colors text-xs"
          >
            <Plus className="w-4 h-4" />
            <span>New Item</span>
          </button>
        </div>
      </div>

      {/* View Mode Tabs Bar */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-xl bg-slate-200/80 dark:bg-slate-900 border border-slate-300 dark:border-slate-800">
        {views.map((v) => (
          <button
            key={v.id}
            onClick={() => setActiveCollectionView(v.id)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg font-bold text-xs transition-all ${
              activeCollectionView === v.id
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-300 dark:hover:bg-white/5'
            }`}
          >
            {v.icon}
            <span>{v.label}</span>
          </button>
        ))}
      </div>

      {/* View Content Renderer */}
      <div className="mt-4">
        {activeCollectionView === 'table' && <GridTable />}
        {activeCollectionView === 'kanban' && <KanbanBoard />}
        {activeCollectionView === 'calendar' && <CalendarView />}
        {activeCollectionView === 'gantt' && <GanttTimeline />}
        {activeCollectionView === 'gallery' && <GalleryView />}
      </div>
    </div>
  );
}
