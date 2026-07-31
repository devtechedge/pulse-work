'use client';

import React from 'react';
import { Home, LayoutGrid, Timer, Bell, Settings, Plus, Search } from 'lucide-react';
import { useWorkspace } from '@/context/WorkspaceContext';

export function MobileBottomNav() {
  const { activeScreen, setActiveScreen, setIsSpotlightOpen, createDocument } = useWorkspace();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-slate-900/90 dark:bg-[#0B0C10]/95 backdrop-blur-xl border-t border-slate-200 dark:border-white/10 flex items-center justify-around px-2 z-40 font-mono text-[10px]">
      <button
        onClick={() => setActiveScreen('launchpad')}
        className={`flex flex-col items-center justify-center gap-1 py-1 px-3 rounded ${
          activeScreen === 'launchpad'
            ? 'text-cyan-400 font-bold'
            : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        <Home className="w-4 h-4" />
        <span>Nodes</span>
      </button>

      <button
        onClick={() => setActiveScreen('collections')}
        className={`flex flex-col items-center justify-center gap-1 py-1 px-3 rounded ${
          activeScreen === 'collections'
            ? 'text-cyan-400 font-bold'
            : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        <LayoutGrid className="w-4 h-4" />
        <span>Data</span>
      </button>

      <button
        onClick={() => createDocument()}
        className="w-10 h-10 -mt-5 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center shadow-lg shadow-cyan-500/30 active:scale-95 transition-transform"
        title="Quick Add Node"
      >
        <Plus className="w-5 h-5 font-bold" />
      </button>

      <button
        onClick={() => setActiveScreen('activity')}
        className={`flex flex-col items-center justify-center gap-1 py-1 px-3 rounded ${
          activeScreen === 'activity'
            ? 'text-cyan-400 font-bold'
            : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        <Bell className="w-4 h-4" />
        <span>Pulse</span>
      </button>

      <button
        onClick={() => setActiveScreen('settings')}
        className={`flex flex-col items-center justify-center gap-1 py-1 px-3 rounded ${
          activeScreen === 'settings'
            ? 'text-cyan-400 font-bold'
            : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        <Settings className="w-4 h-4" />
        <span>Meta</span>
      </button>
    </nav>
  );
}
