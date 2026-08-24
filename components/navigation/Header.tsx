'use client';

import React from 'react';
import {
  Bell,
  Share2,
  Moon,
  Sun,
  Search,
  History,
  SlidersHorizontal,
  ChevronRight,
  UserCheck,
} from 'lucide-react';
import { useWorkspace } from '@/context/WorkspaceContext';
import { useTheme } from '@/context/ThemeContext';

export function Header() {
  const {
    activeScreen,
    activeDocument,
    setIsSpotlightOpen,
    setIsShareOpen,
    setIsVersionHistoryOpen,
    setIsFilterOpen,
  } = useWorkspace();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="h-14 border-b border-slate-200 dark:border-white/10 bg-slate-50/80 dark:bg-[#0B0C10]/90 backdrop-blur-md px-4 flex items-center justify-between font-mono text-xs z-30 sticky top-0">
      {/* Breadcrumbs / Screen Title */}
      <div className="flex items-center gap-2 overflow-hidden">
        <span className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 shrink-0">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          Pulse
        </span>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600 shrink-0" />

        <span className="text-slate-600 dark:text-slate-400 font-medium capitalize truncate">
          {activeScreen === 'document' && activeDocument
            ? activeDocument.title
            : activeScreen}
        </span>

        {activeScreen === 'document' && (
          <span className="px-1.5 py-0.5 text-[9px] rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 font-bold ml-2 hidden sm:inline">
            SAVED
          </span>
        )}
      </div>

      {/* Action Center & Collaborators */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Co-Presence Collaborators Avatars */}
        {activeScreen === 'document' && (
          <div className="hidden md:flex items-center gap-1 pr-2 border-r border-slate-200 dark:border-white/10">
            <div
              className="w-6 h-6 rounded-full bg-cyan-500 text-slate-950 font-bold flex items-center justify-center text-[10px] border border-white/20"
              title="Sarah O. (Active)"
            >
              SO
            </div>
            <div
              className="w-6 h-6 rounded-full bg-indigo-500 text-white font-bold flex items-center justify-center text-[10px] border border-white/20"
              title="Alex C. (Active)"
            >
              AC
            </div>
            <span className="text-[10px] text-slate-400 font-bold ml-0.5">+2</span>
          </div>
        )}

        {/* Collections Filter Trigger */}
        {activeScreen === 'collections' && (
          <button
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded border border-slate-300 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-cyan-500" />
            <span className="hidden sm:inline">Smart Filter</span>
          </button>
        )}

        {/* Version History Button for Documents */}
        {activeScreen === 'document' && (
          <button
            onClick={() => setIsVersionHistoryOpen(true)}
            className="p-1.5 rounded text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-white/5 transition-colors"
            title="Version History"
          >
            <History className="w-4 h-4" />
          </button>
        )}

        {/* Global Spotlight Search */}
        <button
          onClick={() => setIsSpotlightOpen(true)}
          className="p-1.5 rounded text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-white/5 transition-colors md:hidden"
          title="Search (⌘K)"
        >
          <Search className="w-4 h-4" />
        </button>

        {/* Share Button */}
        <button
          onClick={() => setIsShareOpen(true)}
          className="water-drop-effect flex items-center gap-1.5 px-3 py-1.5 rounded bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30 font-semibold hover:bg-cyan-500/20 transition-colors"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Share</span>
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          data-testid="theme-toggle"
          className="p-1.5 rounded text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-white/5 transition-colors"
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
        </button>
      </div>
    </header>
  );
}
