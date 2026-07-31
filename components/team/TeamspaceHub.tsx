'use client';

import React from 'react';
import { useWorkspace } from '@/context/WorkspaceContext';
import { Users, Megaphone, Folder, ArrowRight, ShieldCheck } from 'lucide-react';

export function TeamspaceHub() {
  const { documents, setActiveDocumentId, setActiveScreen } = useWorkspace();

  const teamDocs = documents.filter((d) => d.category === 'Team' || d.category === 'Projects');

  return (
    <div className="max-w-4xl mx-auto p-4 font-mono text-xs space-y-6">
      {/* Teamspace Announcement Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 dark:from-cyan-900/40 dark:via-slate-900 dark:to-indigo-900/40 border border-indigo-100 dark:border-cyan-500/30 text-slate-900 dark:text-slate-100 space-y-3 relative overflow-hidden shadow-sm dark:shadow-2xl">
        <div className="flex items-center gap-2 text-indigo-600 dark:text-cyan-400 font-bold uppercase tracking-wider text-[10px]">
          <Megaphone className="w-4 h-4" /> Team Announcement
        </div>
        <div className="font-extrabold text-slate-900 dark:text-slate-100 text-lg sm:text-xl">
          Q3 Infrastructure Sprint Kicked Off
        </div>
        <div className="text-slate-600 dark:text-slate-300 leading-relaxed text-xs">
          All team members are requested to review the Project Nova core architecture migration specs. Daily standup at 10:00 AM UTC in the shared desk.
        </div>
      </div>

      {/* Shared Notebooks List */}
      <div>
        <div className="font-bold text-slate-900 dark:text-slate-200 mb-3 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Folder className="w-4 h-4 text-cyan-500 dark:text-cyan-400" /> Shared Team Notebooks ({teamDocs.length})
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {teamDocs.map((doc) => (
            <div
              key={doc.id}
              onClick={() => {
                setActiveDocumentId(doc.id);
                setActiveScreen('document');
              }}
              className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/50 cursor-pointer transition-all group shadow-sm hover:shadow-md"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">{doc.icon}</span>
                <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-[10px] font-bold border border-cyan-500/20">
                  {doc.category}
                </span>
              </div>
              <div className="font-bold text-slate-900 dark:text-slate-100 text-sm group-hover:text-cyan-500 dark:group-hover:text-cyan-300 transition-colors">
                {doc.title}
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-2">
                Updated {doc.updatedAt}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Core Team Members Directory */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm">
        <div className="font-bold text-slate-900 dark:text-slate-200 flex items-center gap-2">
          <Users className="w-4 h-4 text-emerald-500 dark:text-emerald-400" /> Core Workspace Node Operators
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { name: 'Sarah Chen', role: 'Lead Architect', status: 'Online', bg: 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300' },
            { name: 'Alex Vance', role: 'DevOps Engineer', status: 'In Focus Session', bg: 'bg-cyan-500/20 text-cyan-700 dark:text-cyan-300' },
            { name: 'Elena Rust', role: 'Frontend Lead', status: 'Online', bg: 'bg-purple-500/20 text-purple-700 dark:text-purple-300' },
          ].map((m) => (
            <div key={m.name} className="p-3 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-1">
              <div className="font-bold text-slate-900 dark:text-slate-200">{m.name}</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">{m.role}</div>
              <div className={`px-2 py-0.5 rounded text-[9px] font-bold inline-block ${m.bg}`}>
                • {m.status}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
