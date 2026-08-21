'use client';

import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { useWorkspace } from '@/context/WorkspaceContext';
import { Command, Keyboard, Sparkles, TouchpadIcon } from 'lucide-react';

export function HelpShortcutsModal() {
  const { isHelpShortcutsOpen, setIsHelpShortcutsOpen } = useWorkspace();

  const shortcuts = [
    { key: '⌘ + K', desc: 'Global Spotlight Search Overlay' },
    { key: '⌘ + N', desc: 'Create New Notebook Page' },
    { key: '⌘ + \\', desc: 'Toggle Left Sidebar Navigation' },
    { key: '/', desc: 'Open Block Slash Menu' },
    { key: 'Esc', desc: 'Close Active Modal / Clear Selection' },
    { key: 'Tab', desc: 'Indent Checklist or Block Item' },
    { key: 'Shift + Tab', desc: 'Outdent Checklist or Block Item' },
  ];

  return (
    <Modal
      isOpen={isHelpShortcutsOpen}
      onClose={() => setIsHelpShortcutsOpen(false)}
      title="Keyboard Shortcuts & Touch Gestures"
    >
      <div className="space-y-6 font-mono text-xs text-slate-800 dark:text-slate-200">
        <div className="p-3 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-800 dark:text-cyan-300 flex items-center gap-3">
          <Sparkles className="w-5 h-5 text-cyan-600 dark:text-cyan-400 shrink-0" />
          <div>
            <div className="font-bold">Monospace High-Efficiency Layout</div>
            <div className="text-[11px] opacity-90 text-slate-700 dark:text-slate-300">
              Pulse Workspace enforces 100% Fira Code font mapping for rapid spatial recognition.
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-bold text-slate-900 dark:text-slate-200 mb-3 flex items-center gap-2">
            <Keyboard className="w-4 h-4 text-cyan-600 dark:text-cyan-400" /> Keybindings
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {shortcuts.map((sc) => (
              <div
                key={sc.key}
                className="p-2.5 rounded bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-between"
              >
                <span className="text-slate-700 dark:text-slate-300">{sc.desc}</span>
                <kbd className="px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-800 dark:text-cyan-300 border border-cyan-500/30 font-bold">
                  {sc.key}
                </kbd>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-bold text-slate-900 dark:text-slate-200 mb-3 flex items-center gap-2">
            <TouchpadIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Touch & Mobile Gestures
          </h3>
          <ul className="space-y-2 text-slate-700 dark:text-slate-300">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>
                <strong>Press & Hold Block:</strong> Triggers water-drop ripple and opens block action menu.
              </span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>
                <strong>Swipe Left on Card:</strong> Archives item directly to Trash.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </Modal>
  );
}
