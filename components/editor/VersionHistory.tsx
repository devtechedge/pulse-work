'use client';

import React, { useState } from 'react';
import { History, RotateCcw, Check, Clock, User, X } from 'lucide-react';
import { useWorkspace } from '@/context/WorkspaceContext';

export function VersionHistory() {
  const { isVersionHistoryOpen, setIsVersionHistoryOpen, activeDocument } = useWorkspace();
  const [selectedVersion, setSelectedVersion] = useState(0);

  if (!isVersionHistoryOpen || !activeDocument) return null;

  const versions = [
    {
      id: 'v-3',
      label: 'Current Version',
      time: 'Just now',
      author: 'Alex Vance',
      changes: [
        { type: 'add', text: '+ Complete initial Kubernetes cluster setup' },
        { type: 'add', text: '+ Verify API Gateway routing matrix' },
      ],
    },
    {
      id: 'v-2',
      label: 'Revision 2.1',
      time: '2 hours ago',
      author: 'Sarah Chen',
      changes: [
        { type: 'add', text: '+ We observed a 34% increase in latency during peak usage...' },
        { type: 'remove', text: '- Legacy server instance active on AWS us-east-1...' },
      ],
    },
    {
      id: 'v-1',
      label: 'Initial Blueprint Draft',
      time: 'Yesterday',
      author: 'Elena Rust',
      changes: [{ type: 'add', text: '+ Project Nova: Core Infrastructure Migration' }],
    },
  ];

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-96 bg-slate-900 border-l border-white/10 shadow-2xl font-mono text-xs flex flex-col animate-slideLeft">
      <div className="p-4 border-b border-white/10 flex items-center justify-between bg-slate-950">
        <div className="flex items-center gap-2 text-cyan-400 font-bold">
          <History className="w-4 h-4" />
          <span>Version History & Diff</span>
        </div>
        <button
          onClick={() => setIsVersionHistoryOpen(false)}
          className="p-1 rounded text-slate-400 hover:text-white hover:bg-white/10"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <div>
          <div className="text-[10px] uppercase font-bold text-slate-400 mb-2 tracking-wider">
            Saved Revisions ({versions.length})
          </div>
          <div className="space-y-2">
            {versions.map((ver, idx) => (
              <div
                key={ver.id}
                onClick={() => setSelectedVersion(idx)}
                className={`p-3 rounded border transition-all cursor-pointer ${
                  selectedVersion === idx
                    ? 'bg-cyan-500/15 border-cyan-500/50 text-cyan-300'
                    : 'bg-white/5 border-white/10 hover:border-white/20 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between font-bold">
                  <span>{ver.label}</span>
                  <span className="text-[10px] text-slate-400 font-normal">{ver.time}</span>
                </div>
                <div className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                  <User className="w-3 h-3 text-cyan-400" /> {ver.author}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="text-[10px] uppercase font-bold text-slate-400 mb-2 tracking-wider">
            Line Diffs in {versions[selectedVersion].label}
          </div>
          <div className="p-3 rounded bg-slate-950 border border-white/10 space-y-1 font-mono text-[11px]">
            {versions[selectedVersion].changes.map((ch, i) => (
              <div
                key={i}
                className={
                  ch.type === 'add'
                    ? 'text-emerald-400 bg-emerald-500/10 p-1 rounded border border-emerald-500/20'
                    : 'text-rose-400 bg-rose-500/10 p-1 rounded border border-rose-500/20 line-through'
                }
              >
                {ch.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-white/10 bg-slate-950 flex items-center gap-2">
        <button
          onClick={() => {
            alert(`Restored ${versions[selectedVersion].label} successfully!`);
            setIsVersionHistoryOpen(false);
          }}
          className="water-drop-effect w-full flex items-center justify-center gap-2 px-4 py-2 rounded bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Restore This Revision
        </button>
      </div>
    </div>
  );
}
