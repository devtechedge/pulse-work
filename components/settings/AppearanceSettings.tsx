'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useWorkspace } from '@/context/WorkspaceContext';
import { Sun, Moon, Sparkles, User, Shield, Check } from 'lucide-react';

export function AppearanceSettings() {
  const { theme, setTheme, density, setDensity } = useTheme();
  const { persona, setIsPersonaModalOpen } = useWorkspace();

  return (
    <div className="space-y-6 font-mono text-xs text-slate-800 dark:text-slate-200">
      {/* Profile Section */}
      <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center text-base border border-cyan-500/30">
          AV
        </div>
        <div>
          <div className="font-bold text-slate-900 dark:text-slate-100 text-sm">Alex Vance</div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400">alex@pulse.workspace • Pro Admin</div>
          <div className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[10px] inline-block mt-1">
            Fira Code System Engine Active
          </div>
        </div>
      </div>

      {/* Theme Switcher */}
      <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
        <div className="font-bold text-slate-900 dark:text-slate-100">Visual Theme Tokens</div>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setTheme('dark')}
            className={`p-4 rounded-lg border text-left flex items-center justify-between transition-all ${
              theme === 'dark'
                ? 'bg-slate-950 border-cyan-400 text-cyan-300 ring-1 ring-cyan-400'
                : 'bg-slate-800 border-transparent text-slate-400'
            }`}
          >
            <div className="flex items-center gap-2">
              <Moon className="w-4 h-4 text-cyan-400" />
              <span className="font-bold">Obsidian Dark</span>
            </div>
            {theme === 'dark' && <Check className="w-4 h-4 text-cyan-400" />}
          </button>

          <button
            onClick={() => setTheme('light')}
            className={`p-4 rounded-lg border text-left flex items-center justify-between transition-all ${
              theme === 'light'
                ? 'bg-white border-indigo-500 text-indigo-600 ring-1 ring-indigo-500 shadow-md'
                : 'bg-slate-200 border-transparent text-slate-600'
            }`}
          >
            <div className="flex items-center gap-2">
              <Sun className="w-4 h-4 text-amber-500" />
              <span className="font-bold">Pure Light</span>
            </div>
            {theme === 'light' && <Check className="w-4 h-4 text-indigo-600" />}
          </button>
        </div>
      </div>

      {/* Layout Density */}
      <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
        <div className="font-bold text-slate-900 dark:text-slate-100">UI Layout Density</div>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setDensity('normal')}
            className={`p-3 rounded-lg border font-bold ${
              density === 'normal'
                ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40'
                : 'bg-slate-200 dark:bg-white/5 border-transparent text-slate-400'
            }`}
          >
            Normal Spacing
          </button>
          <button
            onClick={() => setDensity('compact')}
            className={`p-3 rounded-lg border font-bold ${
              density === 'compact'
                ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40'
                : 'bg-slate-200 dark:bg-white/5 border-transparent text-slate-400'
            }`}
          >
            High Density (Compact)
          </button>
        </div>
      </div>
    </div>
  );
}
