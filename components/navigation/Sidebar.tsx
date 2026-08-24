'use client';

import React from 'react';
import {
  Home,
  FileText,
  LayoutGrid,
  Users,
  Bell,
  Timer,
  Network,
  BookOpen,
  CheckCircle2,
  Trash2,
  Settings,
  Search,
  Plus,
  HelpCircle,
  Folder,
  Layers,
  Sparkles,
  Shield,
  ChevronDown,
} from 'lucide-react';
import { useWorkspace } from '@/context/WorkspaceContext';

export function Sidebar() {
  const {
    activeScreen,
    setActiveScreen,
    documents,
    activeDocumentId,
    setActiveDocumentId,
    createDocument,
    setIsSpotlightOpen,
    setIsHelpShortcutsOpen,
    setIsPersonaModalOpen,
    persona,
    trashItemList,
  } = useWorkspace();

  return (
    <aside data-testid="sidebar" className="hidden md:flex flex-col w-64 h-screen fixed left-0 top-0 z-40 bg-slate-50 dark:bg-[#16181D] border-r border-slate-200 dark:border-white/10 font-mono text-xs select-none">
      {/* Workspace Header */}
      <div className="p-4 border-b border-slate-200 dark:border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded bg-cyan-500/10 dark:bg-cyan-400/20 border border-cyan-500/30 dark:border-cyan-400/40 flex items-center justify-center text-cyan-600 dark:text-cyan-400 font-bold text-sm">
            P
          </div>
          <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1">
            Pulse Workspace
          </div>
        </div>
      </div>

      {/* Persona Selector Banner */}
      <div className="px-3 py-2 border-b border-slate-200 dark:border-white/10 bg-slate-100/50 dark:bg-white/[0.02]">
        <button
          onClick={() => setIsPersonaModalOpen(true)}
          className="w-full flex items-center justify-between px-2.5 py-1.5 rounded bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-300 hover:bg-cyan-500/20 transition-colors text-[11px]"
        >
          <span className="flex items-center gap-1.5 font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            Mode: {persona}
          </span>
          <ChevronDown className="w-3 h-3 opacity-70" />
        </button>
      </div>

      {/* Quick Search Trigger & New Page */}
      <div className="p-3 gap-2 flex items-center">
        <button
          onClick={() => setIsSpotlightOpen(true)}
          data-testid="open-spotlight"
          className="flex-1 flex items-center justify-between px-3 py-1.5 rounded bg-slate-200/60 dark:bg-white/5 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
        >
          <span className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5" /> Search
          </span>
          <kbd className="px-1.5 py-0.5 text-[9px] rounded bg-slate-300 dark:bg-white/10 text-slate-700 dark:text-slate-300">
            ⌘K
          </kbd>
        </button>
        <button
          onClick={() => createDocument()}
          className="p-1.5 rounded bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition-colors shadow-sm"
          title="New Page"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Scrollable Navigation */}
      <div className="flex-1 overflow-y-auto px-2 py-1 space-y-4">
        {/* Core Sections */}
        <div className="space-y-0.5">
          <button
            onClick={() => setActiveScreen('launchpad')}
            data-testid="nav-launchpad"
            className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded transition-colors ${
              activeScreen === 'launchpad'
                ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/5'
            }`}
          >
            <Home className="w-4 h-4" />
            Launchpad (Home)
          </button>

          <button
            onClick={() => setActiveScreen('collections')}
            data-testid="nav-collections"
            className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded transition-colors ${
              activeScreen === 'collections'
                ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/5'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            Collections Data Views
          </button>

          <button
            onClick={() => setActiveScreen('teamspace')}
            className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded transition-colors ${
              activeScreen === 'teamspace'
                ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/5'
            }`}
          >
            <Users className="w-4 h-4" />
            Shared Teamspace
          </button>

          <button
            onClick={() => setActiveScreen('activity')}
            className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded transition-colors ${
              activeScreen === 'activity'
                ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/5'
            }`}
          >
            <Bell className="w-4 h-4" />
            Activity Log
          </button>
        </div>

        {/* Productivity Tools & Widgets */}
        <div>
          <div className="px-2.5 py-1 text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wider">
            Study & Productivity
          </div>
          <div className="space-y-0.5 mt-1">
            <button
              onClick={() => setActiveScreen('focus')}
              data-testid="nav-focus"
              className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded transition-colors ${
                activeScreen === 'focus'
                  ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/5'
              }`}
            >
              <Timer className="w-4 h-4" />
              Focus Timer & Sound
            </button>

            <button
              onClick={() => setActiveScreen('mindmap')}
              className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded transition-colors ${
                activeScreen === 'mindmap'
                  ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/5'
              }`}
            >
              <Network className="w-4 h-4" />
              Mind Map Node Canvas
            </button>

            <button
              onClick={() => setActiveScreen('flashcards')}
              className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded transition-colors ${
                activeScreen === 'flashcards'
                  ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/5'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Flashcard Quiz Deck
            </button>

            <button
              onClick={() => setActiveScreen('habits')}
              className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded transition-colors ${
                activeScreen === 'habits'
                  ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/5'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              Habit & Goal Tracker
            </button>

            <button
              onClick={() => setActiveScreen('templates')}
              className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded transition-colors ${
                activeScreen === 'templates'
                  ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/5'
              }`}
            >
              <Layers className="w-4 h-4" />
              Blueprint Templates
            </button>
          </div>
        </div>

        {/* Notebooks & Pages Hierarchy */}
        <div>
          <div className="px-2.5 py-1 text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wider flex items-center justify-between">
            <span>Pages & Notebooks</span>
            <button
              onClick={() => createDocument('New Page')}
              className="p-0.5 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
          <div className="space-y-0.5 mt-1">
            {documents.map((doc) => (
              <button
                key={doc.id}
                onClick={() => {
                  setActiveDocumentId(doc.id);
                  setActiveScreen('document');
                }}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded text-left transition-colors truncate ${
                  activeDocumentId === doc.id && activeScreen === 'document'
                    ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/5'
                }`}
              >
                <span className="flex items-center gap-2 truncate">
                  <span>{doc.icon}</span>
                  <span className="truncate">{doc.title}</span>
                </span>
                {doc.isPinned && (
                  <span className="text-[10px] text-cyan-500 dark:text-cyan-400 shrink-0">
                    ★
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Trash Manager link */}
        <div className="pt-2 border-t border-slate-200 dark:border-white/10 space-y-0.5">
          <button
            onClick={() => setActiveScreen('trash')}
            className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded transition-colors ${
              activeScreen === 'trash'
                ? 'bg-rose-500/10 text-rose-500 font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-rose-500 hover:bg-slate-200/50 dark:hover:bg-white/5'
            }`}
          >
            <span className="flex items-center gap-2.5">
              <Trash2 className="w-4 h-4" />
              Trash & Archives
            </span>
            {trashItemList.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-rose-500/20 text-rose-500 font-bold">
                {trashItemList.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="p-3 border-t border-slate-200 dark:border-white/10 space-y-1 bg-slate-100/50 dark:bg-white/[0.02]">
        <button
          onClick={() => setIsHelpShortcutsOpen(true)}
          className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/5 transition-colors"
        >
          <HelpCircle className="w-4 h-4" />
          Shortcuts & Help
        </button>

        <button
          onClick={() => setActiveScreen('settings')}
          className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded transition-colors ${
            activeScreen === 'settings'
              ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-semibold'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/5'
          }`}
        >
          <Settings className="w-4 h-4" />
          Settings & Ecosystem
        </button>
      </div>
    </aside>
  );
}
