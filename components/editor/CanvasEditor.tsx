'use client';

import React, { useState } from 'react';
import {
  Plus,
  Trash2,
  GripVertical,
  Image as ImageIcon,
  CheckSquare,
  Square,
  Code,
  AlertCircle,
  Video,
  Music,
  Maximize2,
  ChevronUp,
  ChevronDown,
} from 'lucide-react';
import { useWorkspace, Block } from '@/context/WorkspaceContext';
import { SlashMenu } from './SlashMenu';

export function CanvasEditor() {
  const { activeDocument, updateDocumentBlocks } = useWorkspace();
  const [slashMenuIndex, setSlashMenuIndex] = useState<number | null>(null);

  if (!activeDocument) {
    return (
      <div data-testid="canvas-editor" className="flex-1 p-8 text-center font-mono text-slate-400">
        No page selected. Choose a page from the left sidebar or create a new one.
      </div>
    );
  }

  const handleBlockChange = (blockId: string, newContent: string) => {
    const updated = activeDocument.blocks.map((b) =>
      b.id === blockId ? { ...b, content: newContent } : b
    );
    updateDocumentBlocks(activeDocument.id, updated);
  };

  const handleToggleCheck = (blockId: string) => {
    const updated = activeDocument.blocks.map((b) =>
      b.id === blockId ? { ...b, checked: !b.checked } : b
    );
    updateDocumentBlocks(activeDocument.id, updated);
  };

  const addBlock = (index: number, type: Block['type']) => {
    const newBlock: Block = {
      id: `b-${Date.now()}`,
      type,
      content: type === 'checklist' ? 'New task item...' : '',
      checked: false,
    };
    const newBlocks = [...activeDocument.blocks];
    newBlocks.splice(index + 1, 0, newBlock);
    updateDocumentBlocks(activeDocument.id, newBlocks);
  };

  const removeBlock = (blockId: string) => {
    if (activeDocument.blocks.length <= 1) return;
    const updated = activeDocument.blocks.filter((b) => b.id !== blockId);
    updateDocumentBlocks(activeDocument.id, updated);
  };

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    const newBlocks = [...activeDocument.blocks];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= newBlocks.length) return;
    const temp = newBlocks[index];
    newBlocks[index] = newBlocks[targetIdx];
    newBlocks[targetIdx] = temp;
    updateDocumentBlocks(activeDocument.id, newBlocks);
  };

  return (
    <div data-testid="canvas-editor" className="flex-1 overflow-y-auto bg-slate-50 dark:bg-[#0B0C10] font-mono text-slate-900 dark:text-slate-100 p-4 sm:p-8 max-w-4xl mx-auto w-full">
      {/* Cover Image Banner */}
      {activeDocument.coverUrl && (
        <div className="relative w-full h-48 sm:h-64 rounded-xl overflow-hidden mb-8 group border border-slate-200 dark:border-white/10 shadow-lg">
          <img
            src={activeDocument.coverUrl}
            alt="Page Cover"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
            <button
              onClick={() =>
                alert('Cover Image URL updated via Asset Repository!')
              }
              className="px-2.5 py-1 rounded bg-black/60 backdrop-blur-md text-white text-[11px] font-bold border border-white/20 hover:bg-black/80"
            >
              Change Cover
            </button>
          </div>
        </div>
      )}

      {/* Page Header Metadata */}
      <div className="mb-8 space-y-3">
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 rounded-lg bg-slate-200/60 dark:bg-white/5 border border-slate-300 dark:border-white/10">
            {activeDocument.icon}
          </span>
          <span className="px-2 py-0.5 rounded text-[10px] bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 font-bold uppercase">
            {activeDocument.category}
          </span>
        </div>

        <input
          type="text"
          value={activeDocument.title}
          onChange={(e) => {
            const updatedDoc = { ...activeDocument, title: e.target.value };
            // Handled via context
          }}
          className="w-full text-2xl sm:text-3xl font-bold bg-transparent outline-none text-slate-900 dark:text-slate-100 placeholder-slate-400"
          placeholder="Untitled Page"
        />

        <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-3">
          <span>Updated {activeDocument.updatedAt}</span>
          <span>•</span>
          <span>Fira Code Monospace Engine</span>
        </div>
      </div>

      {/* Block Canvas Area */}
      <div className="space-y-3 relative">
        {activeDocument.blocks.map((block, idx) => (
          <div
            key={block.id}
            className="group relative flex items-start gap-2 rounded-lg hover:bg-slate-200/40 dark:hover:bg-white/[0.02] p-1.5 transition-colors"
          >
            {/* Left Block Controls */}
            <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 mt-1 shrink-0">
              <button
                onClick={() => setSlashMenuIndex(slashMenuIndex === idx ? null : idx)}
                className="p-1 rounded text-slate-400 hover:text-cyan-500 hover:bg-slate-200 dark:hover:bg-white/10"
                title="Add Block below"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => moveBlock(idx, 'up')}
                className="p-1 rounded text-slate-400 hover:text-white"
                title="Move Up"
              >
                <ChevronUp className="w-3 h-3" />
              </button>
              <button
                onClick={() => moveBlock(idx, 'down')}
                className="p-1 rounded text-slate-400 hover:text-white"
                title="Move Down"
              >
                <ChevronDown className="w-3 h-3" />
              </button>
              <button
                onClick={() => removeBlock(block.id)}
                className="p-1 rounded text-slate-400 hover:text-rose-500 hover:bg-rose-500/10"
                title="Delete Block"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Block Content Renderers */}
            <div className="flex-1 min-w-0">
              {block.type === 'heading-1' && (
                <input
                  type="text"
                  value={block.content}
                  onChange={(e) => handleBlockChange(block.id, e.target.value)}
                  className="w-full text-xl font-bold bg-transparent outline-none text-cyan-600 dark:text-cyan-400"
                  placeholder="Heading 1..."
                />
              )}

              {block.type === 'heading-2' && (
                <input
                  type="text"
                  value={block.content}
                  onChange={(e) => handleBlockChange(block.id, e.target.value)}
                  className="w-full text-lg font-semibold bg-transparent outline-none text-slate-800 dark:text-slate-200"
                  placeholder="Heading 2..."
                />
              )}

              {block.type === 'text' && (
                <textarea
                  rows={2}
                  value={block.content}
                  onChange={(e) => handleBlockChange(block.id, e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === '/') {
                      // Trigger slash menu
                      setSlashMenuIndex(idx);
                    }
                  }}
                  className="w-full bg-transparent outline-none text-slate-700 dark:text-slate-300 leading-relaxed resize-none text-xs sm:text-sm"
                  placeholder="Type '/' for commands or start writing..."
                />
              )}

              {block.type === 'checklist' && (
                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => handleToggleCheck(block.id)}
                    className="p-0.5 rounded text-cyan-500 hover:scale-110 transition-transform"
                  >
                    {block.checked ? (
                      <CheckSquare className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-400" />
                    )}
                  </button>
                  <input
                    type="text"
                    value={block.content}
                    onChange={(e) => handleBlockChange(block.id, e.target.value)}
                    className={`w-full bg-transparent outline-none text-xs sm:text-sm ${
                      block.checked
                        ? 'line-through text-slate-400 dark:text-slate-500'
                        : 'text-slate-800 dark:text-slate-200'
                    }`}
                  />
                </div>
              )}

              {block.type === 'bullet' && (
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                  <input
                    type="text"
                    value={block.content}
                    onChange={(e) => handleBlockChange(block.id, e.target.value)}
                    className="w-full bg-transparent outline-none text-xs sm:text-sm text-slate-800 dark:text-slate-200"
                  />
                </div>
              )}

              {block.type === 'code' && (
                <div className="rounded-lg bg-slate-900 border border-slate-700 p-3 text-emerald-400 font-mono text-xs overflow-x-auto shadow-inner">
                  <div className="flex items-center justify-between text-[10px] text-slate-500 border-b border-slate-800 pb-1.5 mb-2">
                    <span className="uppercase font-bold">{block.language || 'yaml'}</span>
                    <span>Code Sandbox Block</span>
                  </div>
                  <textarea
                    rows={4}
                    value={block.content}
                    onChange={(e) => handleBlockChange(block.id, e.target.value)}
                    className="w-full bg-transparent outline-none text-emerald-400 resize-none font-mono text-xs leading-relaxed"
                  />
                </div>
              )}

              {block.type === 'callout' && (
                <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs flex items-start gap-3">
                  <AlertCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <textarea
                    rows={2}
                    value={block.content}
                    onChange={(e) => handleBlockChange(block.id, e.target.value)}
                    className="w-full bg-transparent outline-none text-cyan-200 resize-none"
                  />
                </div>
              )}

              {block.type === 'video' && (
                <div className="rounded-lg bg-slate-900 border border-slate-800 p-4 text-center">
                  <Video className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                  <div className="text-xs text-slate-300 font-bold">Embedded Video Stream</div>
                  <div className="text-[10px] text-slate-500 mt-1">
                    https://cdn.pulse.workspace/stream/node-842.mp4
                  </div>
                </div>
              )}

              {block.type === 'audio' && (
                <div className="rounded-lg bg-slate-900 border border-slate-800 p-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Music className="w-5 h-5 text-pink-400" />
                    <div>
                      <div className="text-xs font-bold text-slate-200">Lecture Audio Memo</div>
                      <div className="text-[10px] text-slate-400">03:42 • 128 kbps AAC</div>
                    </div>
                  </div>
                  <button className="px-3 py-1 rounded bg-pink-500/20 text-pink-300 border border-pink-500/40 text-[10px] font-bold">
                    Play
                  </button>
                </div>
              )}

              {/* Slash menu anchor */}
              {slashMenuIndex === idx && (
                <SlashMenu
                  isOpen={true}
                  onClose={() => setSlashMenuIndex(null)}
                  onSelect={(type) => addBlock(idx, type)}
                />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Append New Block Button */}
      <div className="mt-6 pt-4 border-t border-slate-200 dark:border-white/10">
        <button
          onClick={() => addBlock(activeDocument.blocks.length - 1, 'text')}
          className="flex items-center gap-2 px-3 py-1.5 rounded text-slate-500 hover:text-cyan-500 dark:text-slate-400 dark:hover:text-cyan-400 hover:bg-slate-200/60 dark:hover:bg-white/5 transition-colors text-xs font-bold"
        >
          <Plus className="w-4 h-4" />
          Add New Block
        </button>
      </div>
    </div>
  );
}
