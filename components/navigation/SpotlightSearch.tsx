'use client';

import React, { useState, useEffect } from 'react';
import { Search, FileText, Folder, User, Clock, ArrowRight, X } from 'lucide-react';
import { useWorkspace } from '@/context/WorkspaceContext';
import { matchDocuments } from '@/lib/workspace';

export function SpotlightSearch() {
  const { isSpotlightOpen, setIsSpotlightOpen, documents, setActiveDocumentId, setActiveScreen } =
    useWorkspace();
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'All' | 'Pages' | 'Files' | 'People'>('All');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSpotlightOpen(!isSpotlightOpen);
      } else if (e.key === 'Escape' && isSpotlightOpen) {
        setIsSpotlightOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSpotlightOpen, setIsSpotlightOpen]);

  if (!isSpotlightOpen) return null;

  const filteredDocs = matchDocuments(documents, query);

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setIsSpotlightOpen(false);
        }
      }}
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-slate-900/50 dark:bg-slate-950/70 backdrop-blur-md animate-fadeIn font-mono text-xs cursor-default"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 rounded-xl shadow-2xl overflow-hidden text-slate-900 dark:text-slate-100 flex flex-col"
      >
        {/* Search Header */}
        <div className="p-4 border-b border-slate-200 dark:border-white/10 flex items-center gap-3">
          <Search className="w-5 h-5 text-cyan-600 dark:text-cyan-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search workspace nodes, files, or team..."
            data-testid="spotlight-input"
            className="w-full bg-transparent text-sm text-slate-900 dark:text-slate-100 outline-none placeholder-slate-400 dark:placeholder-slate-500 font-mono"
          />
          <button
            onClick={() => setIsSpotlightOpen(false)}
            className="px-1.5 py-1 rounded bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-transparent text-[10px]"
          >
            esc
          </button>
        </div>

        {/* Filter Category Tabs */}
        <div className="px-4 py-2 border-b border-slate-200 dark:border-white/10 flex items-center gap-2 bg-slate-50/70 dark:bg-white/[0.02]">
          {(['All', 'Pages', 'Files', 'People'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 rounded-full text-[11px] transition-colors ${
                activeTab === tab
                  ? 'bg-cyan-500/15 text-cyan-800 dark:text-cyan-300 border border-cyan-500/40 font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search Results / Recent */}
        <div className="p-4 max-h-80 overflow-y-auto space-y-4">
          {query === '' && (
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 mb-2 tracking-wider flex items-center gap-1.5">
                <Clock className="w-3 h-3" /> Recent Queries
              </div>
              <div className="flex flex-wrap gap-2">
                {['Q3 Marketing Strategy', 'API Documentation v2', 'Design System V2', 'Project Nova'].map(
                  (q) => (
                    <button
                      key={q}
                      onClick={() => setQuery(q)}
                      className="px-2.5 py-1 rounded bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-cyan-500/50 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors text-[11px]"
                    >
                      {q}
                    </button>
                  )
                )}
              </div>
            </div>
          )}

          {/* Suggested Pages */}
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 mb-2 tracking-wider">
              Matching Notebook Pages ({filteredDocs.length})
            </div>
            <div className="space-y-1.5">
              {filteredDocs.map((doc) => (
                <div
                  key={doc.id}
                  onClick={() => {
                    setActiveDocumentId(doc.id);
                    setActiveScreen('document');
                    setIsSpotlightOpen(false);
                  }}
                  className="p-2.5 rounded bg-slate-50 hover:bg-cyan-500/10 dark:bg-white/5 dark:hover:bg-cyan-500/10 border border-slate-200/80 hover:border-cyan-500/30 dark:border-white/5 dark:hover:border-cyan-500/30 cursor-pointer transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-base">{doc.icon}</span>
                    <div>
                      <div className="font-semibold text-slate-800 dark:text-slate-200 group-hover:text-cyan-700 dark:group-hover:text-cyan-300">
                        {doc.title}
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400">
                        Updated {doc.updatedAt} • {doc.category}
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 dark:text-slate-500 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-transform group-hover:translate-x-1" />
                </div>
              ))}
            </div>
          </div>

          {/* People & Files Preview */}
          {activeTab === 'All' || activeTab === 'People' ? (
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 mb-2 tracking-wider">
                Team Members
              </div>
              <div className="p-2.5 rounded bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-bold flex items-center justify-center text-xs border border-emerald-500/30">
                  ER
                </div>
                <div>
                  <div className="font-semibold text-slate-800 dark:text-slate-200">Elena Rust</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">Engineering • Online</div>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        {/* Keyboard Footer Bar */}
        <div className="px-4 py-2 bg-slate-100 dark:bg-slate-950 border-t border-slate-200 dark:border-white/10 flex items-center justify-between text-[10px] text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="px-1 py-0.5 rounded bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-transparent">↑</kbd>{' '}
              <kbd className="px-1 py-0.5 rounded bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-transparent">↓</kbd> navigate
            </span>
            <span>
              <kbd className="px-1 py-0.5 rounded bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-transparent">↵</kbd> select
            </span>
            <span>
              <kbd className="px-1 py-0.5 rounded bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-transparent">esc</kbd> close
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
