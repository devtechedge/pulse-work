'use client';

import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { useWorkspace, PersonaType } from '@/context/WorkspaceContext';
import { GraduationCap, Palette, Calendar, Briefcase, Heart, Check } from 'lucide-react';

export function PersonaModal() {
  const { isPersonaModalOpen, setIsPersonaModalOpen, persona, setPersona } = useWorkspace();

  const personas: {
    type: PersonaType;
    title: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    activeTag: string;
    highlights: string[];
  }[] = [
    {
      type: 'Student',
      title: 'Student Companion',
      description: 'Great for classes, study flashcards, mind maps, and focus timer.',
      icon: <GraduationCap className="w-5 h-5" />,
      color: 'border-blue-500/40 bg-blue-500/10 text-blue-600 dark:text-blue-400',
      activeTag: 'bg-blue-500/20 text-blue-700 dark:text-blue-300 border-blue-500/30',
      highlights: ['Flashcards & Quiz', 'Mind Map Canvas', 'Focus Timer'],
    },
    {
      type: 'Creator',
      title: 'Creative Studio',
      description: 'Perfect for pictures, moodboards, gallery views, and media notes.',
      icon: <Palette className="w-5 h-5" />,
      color: 'border-cyan-500/40 bg-cyan-500/10 text-cyan-700 dark:text-cyan-400',
      activeTag: 'bg-cyan-500/20 text-cyan-800 dark:text-cyan-300 border-cyan-500/30',
      highlights: ['Gallery View', 'Quick Voice Notes', 'Media Embeds'],
    },
    {
      type: 'Planner',
      title: 'Master Planner',
      description: 'Organize your schedule, task deadlines, habit trackers, and calendars.',
      icon: <Calendar className="w-5 h-5" />,
      color: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400',
      activeTag: 'bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border-emerald-500/30',
      highlights: ['Timeline Schedule', 'Weekly Habit Ring', 'Calendar View'],
    },
    {
      type: 'Business',
      title: 'Team & Projects',
      description: 'Collaborate with your team, share documents, and track project tasks.',
      icon: <Briefcase className="w-5 h-5" />,
      color: 'border-indigo-500/40 bg-indigo-500/10 text-indigo-700 dark:text-indigo-400',
      activeTag: 'bg-indigo-500/20 text-indigo-800 dark:text-indigo-300 border-indigo-500/30',
      highlights: ['Shared Workspace', 'Version History', 'Task Boards'],
    },
    {
      type: 'Daily Life',
      title: 'Personal Life',
      description: 'Easy daily journal, quick voice notes, habit streaks, and to-do lists.',
      icon: <Heart className="w-5 h-5" />,
      color: 'border-rose-500/40 bg-rose-500/10 text-rose-700 dark:text-rose-400',
      activeTag: 'bg-rose-500/20 text-rose-800 dark:text-rose-300 border-rose-500/30',
      highlights: ['Voice Captures', 'Daily Checklist', 'Habit Streaks'],
    },
  ];

  return (
    <Modal
      isOpen={isPersonaModalOpen}
      onClose={() => setIsPersonaModalOpen(false)}
      title="Select Workspace Mode"
    >
      <div className="space-y-4 font-mono text-xs">
        <p className="text-slate-600 dark:text-slate-400">
          Pick a mode that fits what you want to do today. You can change this anytime!
        </p>

        <div className="grid grid-cols-1 gap-3">
          {personas.map((p) => {
            const isSelected = persona === p.type;
            return (
              <div
                key={p.type}
                onClick={() => {
                  setPersona(p.type);
                  setIsPersonaModalOpen(false);
                }}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start justify-between ${
                  isSelected
                    ? `${p.color} ring-2 ring-cyan-500 shadow-md`
                    : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-white/10 hover:border-cyan-500/40 text-slate-800 dark:text-slate-300'
                }`}
              >
                <div className="flex gap-3">
                  <div className={`p-2.5 rounded-lg ${p.color}`}>{p.icon}</div>
                  <div>
                    <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 text-sm">
                      {p.title}
                      {isSelected && (
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${p.activeTag}`}>
                          Active
                        </span>
                      )}
                    </div>
                    <div className="text-slate-600 dark:text-slate-400 mt-1 text-xs leading-relaxed">
                      {p.description}
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-2.5">
                      {p.highlights.map((h) => (
                        <span
                          key={h}
                          className="px-2 py-0.5 rounded-md bg-slate-200 dark:bg-black/40 border border-slate-300 dark:border-white/10 text-[10px] text-slate-700 dark:text-slate-300 font-medium"
                        >
                          ✓ {h}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {isSelected && (
                  <div className="p-1 rounded-full bg-cyan-500 text-slate-950 font-bold shrink-0">
                    <Check className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
}

