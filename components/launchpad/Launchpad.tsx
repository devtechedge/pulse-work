'use client';

import React from 'react';
import { useWorkspace } from '@/context/WorkspaceContext';
import {
  Sparkles,
  Plus,
  Timer,
  BookOpen,
  CheckCircle2,
  Mic,
  ArrowRight,
  Flame,
  Zap,
  Folder,
  Pin,
  Clock,
  Layers,
} from 'lucide-react';

export function Launchpad() {
  const {
    persona,
    documents,
    setActiveDocumentId,
    setActiveScreen,
    createDocument,
    collectionItems,
    quickCaptures,
    habits,
    toggleHabitDay,
    setIsPersonaModalOpen,
  } = useWorkspace();

  const pinnedDocs = documents.filter((d) => d.isPinned || d.isFavorite);

  return (
    <div data-testid="launchpad" className="flex-1 overflow-y-auto bg-slate-50 dark:bg-[#0B0C10] font-mono text-slate-900 dark:text-slate-100 p-4 sm:p-8 space-y-8 max-w-6xl mx-auto w-full">
      {/* Hero Welcome Header */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-[#16181D] dark:to-slate-950 border border-indigo-100 dark:border-cyan-500/30 text-slate-900 dark:text-white shadow-sm dark:shadow-xl space-y-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none text-9xl text-indigo-500 dark:text-white">
          ⚡
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 dark:bg-cyan-500/20 text-indigo-700 dark:text-cyan-300 font-bold text-[10px] backdrop-blur-sm border border-indigo-200/60 dark:border-cyan-500/30">
          Pulse Workspace v2.0
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-snug">
          Welcome back to Pulse Workspace
        </h1>

        <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
          Your clean, simple workspace for notes, study flashcards, tasks, and creative projects.
        </p>

        {/* Quick Command Launch Pad */}
        <div className="pt-2 flex flex-wrap gap-3">
          <button
            onClick={() => createDocument('New Page')}
            data-testid="new-page"
            className="water-drop-effect px-4 py-2.5 rounded-xl bg-indigo-600 text-white dark:bg-cyan-500 dark:text-slate-950 font-bold hover:bg-indigo-700 dark:hover:bg-cyan-400 transition-transform active:scale-95 flex items-center gap-2 text-xs shadow-sm"
          >
            <Plus className="w-4 h-4 font-bold" /> New Page
          </button>

          <button
            onClick={() => setActiveScreen('focus')}
            className="px-4 py-2.5 rounded-xl bg-white/80 dark:bg-white/5 border border-indigo-200/80 dark:border-white/10 hover:bg-white dark:hover:border-cyan-500/40 text-slate-800 dark:text-white font-bold transition-colors flex items-center gap-2 text-xs shadow-sm"
          >
            <Timer className="w-4 h-4 text-indigo-600 dark:text-cyan-400" /> Focus Session (25m)
          </button>

          <button
            onClick={() => setActiveScreen('flashcards')}
            className="px-4 py-2.5 rounded-xl bg-white/80 dark:bg-white/5 border border-indigo-200/80 dark:border-white/10 hover:bg-white dark:hover:border-cyan-500/40 text-slate-800 dark:text-white font-bold transition-colors flex items-center gap-2 text-xs shadow-sm"
          >
            <BookOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Flashcards Deck
          </button>
        </div>
      </div>

      {/* Favorites & Pinned Notebook Cards Carousel */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Pin className="w-4 h-4 text-cyan-500 dark:text-cyan-400" /> Pinned & Favorite Pages
          </div>
          <button
            onClick={() => setActiveScreen('collections')}
            className="text-[11px] text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1 font-bold"
          >
            View All <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {pinnedDocs.map((doc) => (
            <div
              key={doc.id}
              onClick={() => {
                setActiveDocumentId(doc.id);
                setActiveScreen('document');
              }}
              className="p-5 rounded-xl bg-white dark:bg-[#16181D] border border-slate-200 dark:border-white/10 hover:border-cyan-500/50 cursor-pointer transition-all hover:-translate-y-1 group shadow-sm hover:shadow-lg"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl">{doc.icon}</span>
                <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-[10px] font-bold border border-cyan-500/20">
                  {doc.category}
                </span>
              </div>

              <div className="font-bold text-slate-900 dark:text-slate-100 text-sm group-hover:text-cyan-400 transition-colors line-clamp-1">
                {doc.title}
              </div>

              <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-2 flex items-center gap-2">
                <Clock className="w-3 h-3 text-cyan-400" />
                Updated {doc.updatedAt}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Split Grid: Deliverables & Habit Tracker */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Collection Deliverables Preview */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#16181D] border border-slate-200 dark:border-white/10 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-3">
            <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-400" /> Active Deliverables Kanban
            </div>
            <button
              onClick={() => setActiveScreen('collections')}
              className="text-[10px] text-cyan-500 font-bold hover:underline"
            >
              Kanban Board →
            </button>
          </div>

          <div className="space-y-2.5">
            {collectionItems.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-lg bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-white/5 flex items-center justify-between"
              >
                <div>
                  <div className="font-bold text-slate-900 dark:text-slate-200 text-xs">
                    {item.title}
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Due {item.dueDate} • {item.assignee}
                  </div>
                </div>

                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    item.status === 'Complete'
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'bg-cyan-500/20 text-cyan-400'
                  }`}
                >
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Habit Tracker Preview */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#16181D] border border-slate-200 dark:border-white/10 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-3">
            <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-400" /> Active Habit Protocols
            </div>
            <button
              onClick={() => setActiveScreen('habits')}
              className="text-[10px] text-cyan-500 font-bold hover:underline"
            >
              Full Tracker →
            </button>
          </div>

          <div className="space-y-2.5">
            {habits.slice(0, 3).map((hb) => (
              <div
                key={hb.id}
                className="p-3 rounded-lg bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-white/5 flex items-center justify-between"
              >
                <div>
                  <div className="font-bold text-slate-900 dark:text-slate-200 text-xs">
                    {hb.name}
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Target: {hb.target}
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  {hb.weekDays.slice(0, 5).map((isDone, idx) => (
                    <button
                      key={idx}
                      onClick={() => toggleHabitDay(hb.id, idx)}
                      className={`w-6 h-6 rounded flex items-center justify-center font-bold text-[9px] ${
                        isDone
                          ? 'bg-cyan-500 text-slate-950'
                          : 'bg-slate-200 dark:bg-white/10 text-slate-500'
                      }`}
                    >
                      {['M', 'T', 'W', 'T', 'F'][idx]}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
