'use client';

import React, { useState } from 'react';
import { Bell, MessageSquare, Check, Sparkles, User, FileText } from 'lucide-react';

export function ActivityCenter() {
  const [tab, setTab] = useState<'All' | 'Mentions' | 'System'>('All');

  const activities = [
    {
      id: 'a-1',
      user: 'Sarah Chen',
      action: 'commented on',
      target: 'Project Nova: Core Infrastructure Migration',
      time: '12m ago',
      type: 'Mentions',
      comment: 'Verify the ingress controller YAML manifest before executing the deployment pipeline.',
    },
    {
      id: 'a-2',
      user: 'Elena Rust',
      action: 'updated table deliverable status to',
      target: 'Complete',
      time: '1h ago',
      type: 'All',
    },
    {
      id: 'a-3',
      user: 'Pulse System',
      action: 'performed automatic backup of',
      target: '4 workspace nodes',
      time: '3h ago',
      type: 'System',
    },
    {
      id: 'a-4',
      user: 'Alex Vance',
      action: 'restored version 2.1 in',
      target: 'Design System V2 Specification',
      time: 'Yesterday',
      type: 'All',
    },
  ];

  const filtered = activities.filter((a) => tab === 'All' || a.type === tab);

  return (
    <div className="max-w-3xl mx-auto p-4 font-mono text-xs space-y-6">
      {/* Activity Header */}
      <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-slate-100">
          <Bell className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
          <span>Workspace Activity & Notifications</span>
        </div>
        <button className="px-3 py-1 rounded bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-white/10 text-[10px]">
          Mark All Read
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {(['All', 'Mentions', 'System'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-3 py-1.5 rounded-full font-bold transition-all ${
              tab === t
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'bg-slate-200 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Activity Timeline */}
      <div className="space-y-3">
        {filtered.map((act) => (
          <div
            key={act.id}
            className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 hover:border-cyan-500/40 transition-colors shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-slate-800 dark:text-slate-200">
                <span className="w-2 h-2 rounded-full bg-cyan-500 dark:bg-cyan-400" />
                <span>{act.user}</span>
                <span className="text-slate-500 dark:text-slate-400 font-normal">{act.action}</span>
                <span className="text-cyan-600 dark:text-cyan-300">{act.target}</span>
              </div>
              <span className="text-[10px] text-slate-400 dark:text-slate-500">{act.time}</span>
            </div>

            {act.comment && (
              <div className="p-2.5 rounded bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 italic">
                &quot;{act.comment}&quot;
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
