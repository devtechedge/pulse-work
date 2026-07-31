'use client';

import React, { useState, useEffect } from 'react';
import {
  Heading1,
  Heading2,
  Type,
  CheckSquare,
  List,
  Code,
  AlertCircle,
  Video,
  Music,
  Link,
} from 'lucide-react';
import { Block } from '@/context/WorkspaceContext';

interface SlashMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (type: Block['type']) => void;
}

export function SlashMenu({ isOpen, onClose, onSelect }: SlashMenuProps) {
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const items: {
    type: Block['type'];
    label: string;
    desc: string;
    icon: React.ReactNode;
  }[] = [
    { type: 'heading-1', label: 'Heading 1', desc: 'Large section heading', icon: <Heading1 className="w-4 h-4 text-cyan-500 dark:text-cyan-400" /> },
    { type: 'heading-2', label: 'Heading 2', desc: 'Medium section heading', icon: <Heading2 className="w-4 h-4 text-cyan-500 dark:text-cyan-400" /> },
    { type: 'text', label: 'Text Paragraph', desc: 'Plain text body block', icon: <Type className="w-4 h-4 text-slate-500 dark:text-slate-300" /> },
    { type: 'checklist', label: 'Checklist Task', desc: 'Interactive task checkbox', icon: <CheckSquare className="w-4 h-4 text-emerald-500 dark:text-emerald-400" /> },
    { type: 'bullet', label: 'Bullet List', desc: 'Simple bulleted list', icon: <List className="w-4 h-4 text-indigo-500 dark:text-indigo-400" /> },
    { type: 'code', label: 'Code Snippet', desc: 'Syntax highlighted code block', icon: <Code className="w-4 h-4 text-amber-500 dark:text-amber-400" /> },
    { type: 'callout', label: 'Callout Box', desc: 'Highlighted info box', icon: <AlertCircle className="w-4 h-4 text-rose-500 dark:text-rose-400" /> },
    { type: 'video', label: 'Video Embed', desc: 'Embed video link', icon: <Video className="w-4 h-4 text-purple-500 dark:text-purple-400" /> },
    { type: 'audio', label: 'Audio Clip', desc: 'Embed audio player', icon: <Music className="w-4 h-4 text-pink-500 dark:text-pink-400" /> },
  ];

  const filtered = items.filter(
    (i) =>
      i.label.toLowerCase().includes(filter.toLowerCase()) ||
      i.desc.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="absolute z-50 w-72 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/90 rounded-xl shadow-2xl overflow-hidden font-mono text-xs animate-scaleUp">
      <div className="p-2 border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-950">
        <input
          type="text"
          autoFocus
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Type to filter..."
          className="w-full bg-transparent text-slate-900 dark:text-slate-200 outline-none placeholder-slate-400 dark:placeholder-slate-500 px-2 py-1 text-xs"
        />
      </div>

      <div className="max-h-60 overflow-y-auto p-1 space-y-0.5">
        {filtered.map((item) => (
          <button
            key={item.type}
            onClick={() => {
              onSelect(item.type);
              onClose();
            }}
            className="w-full p-2 rounded-lg hover:bg-cyan-500/10 hover:border-cyan-500/30 border border-transparent text-left flex items-center gap-2.5 transition-colors group"
          >
            <div className="p-1.5 rounded-md bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 group-hover:bg-cyan-500/20">
              {item.icon}
            </div>
            <div>
              <div className="font-semibold text-slate-900 dark:text-slate-200 group-hover:text-cyan-700 dark:group-hover:text-cyan-300">
                {item.label}
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">{item.desc}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
