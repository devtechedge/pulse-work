'use client';

import React, { useState } from 'react';
import { useWorkspace } from '@/context/WorkspaceContext';
import { Layers, ArrowRight, Sparkles, Check } from 'lucide-react';

export function TemplateGallery() {
  const { createDocument } = useWorkspace();
  const [category, setCategory] = useState<'All' | 'Student' | 'Engineering' | 'Product'>('All');

  const templates = [
    {
      id: 't-1',
      title: 'Academic Exam & Flashcard Prep Blueprint',
      cat: 'Student',
      desc: 'Structured lecture notes, flashcards deck, and Pomodoro focus tracker layout.',
      icon: '🎓',
    },
    {
      id: 't-2',
      title: 'Microservices & Infrastructure Migration',
      cat: 'Engineering',
      desc: 'Kubernetes cluster deployment specs, line diffs, and security checklists.',
      icon: '⚡',
    },
    {
      id: 't-3',
      title: 'Product Launch & Gantt Timeline',
      cat: 'Product',
      desc: 'Milestone diamonds, Kanban deliverable status, and budget allocations.',
      icon: '🚀',
    },
    {
      id: 't-4',
      title: 'Design System & Typography Hierarchy',
      cat: 'Engineering',
      desc: 'Fira Code monospace guidelines, color tokens, and atomic button components.',
      icon: '🎨',
    },
  ];

  const filtered = templates.filter(
    (t) => category === 'All' || t.cat === category
  );

  return (
    <div className="max-w-4xl mx-auto p-4 font-mono text-xs space-y-6">
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-sm">
        <div className="font-bold text-lg text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Layers className="w-5 h-5 text-cyan-500 dark:text-cyan-400" /> Pulse Blueprint Templates
        </div>
        <div className="text-slate-600 dark:text-slate-400">
          Instantly launch high-throughput pages with pre-configured blocks and data views.
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex gap-2">
        {(['All', 'Student', 'Engineering', 'Product'] as const).map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`px-3 py-1.5 rounded-full font-bold transition-all ${
              category === c
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'bg-slate-200 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filtered.map((tpl) => (
          <div
            key={tpl.id}
            className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between hover:border-cyan-500/40 transition-all group shadow-sm hover:shadow-md"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-2xl">{tpl.icon}</span>
                <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 font-bold text-[10px]">
                  {tpl.cat}
                </span>
              </div>

              <div className="font-bold text-slate-900 dark:text-slate-100 text-sm group-hover:text-cyan-500 dark:group-hover:text-cyan-300 transition-colors">
                {tpl.title}
              </div>

              <div className="text-slate-600 dark:text-slate-400 leading-relaxed text-[11px]">{tpl.desc}</div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-200 dark:border-white/5">
              <button
                onClick={() => createDocument(tpl.title)}
                className="water-drop-effect w-full flex items-center justify-center gap-2 px-4 py-2 rounded bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30 font-bold hover:bg-cyan-500/30 transition-colors"
              >
                <Sparkles className="w-4 h-4 text-cyan-500 dark:text-cyan-400" /> Use Blueprint Template
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
