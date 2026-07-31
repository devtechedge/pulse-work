'use client';

import React, { useState } from 'react';
import { useWorkspace } from '@/context/WorkspaceContext';
import { Mic, Link as LinkIcon, Image as ImageIcon, Plus, Play, Sparkles } from 'lucide-react';

export function QuickCaptures() {
  const { quickCaptures, addQuickCapture } = useWorkspace();
  const [noteInput, setNoteInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const handleAddNote = () => {
    if (!noteInput.trim()) return;
    addQuickCapture({ type: 'note', content: noteInput, tags: ['#quick'] });
    setNoteInput('');
  };

  const handleRecordVoice = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      addQuickCapture({
        type: 'memo',
        content: 'Audio memo capture recorded via Microphone stream...',
        audioDuration: '0:28',
      });
    }, 2500);
  };

  return (
    <div className="max-w-3xl mx-auto p-4 font-mono text-xs space-y-6">
      {/* Input Composer */}
      <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm dark:shadow-xl">
        <div className="font-bold text-slate-900 dark:text-slate-200 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400" /> Rapid Scratchpad Capture
        </div>

        <textarea
          rows={3}
          value={noteInput}
          onChange={(e) => setNoteInput(e.target.value)}
          placeholder="Type quick thought, link, or scratchpad notes..."
          className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-lg p-3 text-slate-800 dark:text-slate-200 outline-none resize-none placeholder-slate-400 dark:placeholder-slate-500 font-mono text-xs"
        />

        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2">
            <button
              onClick={handleRecordVoice}
              disabled={isRecording}
              className={`p-2 rounded-lg border font-bold flex items-center gap-1.5 transition-all ${
                isRecording
                  ? 'bg-rose-500 text-white animate-pulse border-rose-500'
                  : 'bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-200 dark:hover:bg-white/10'
              }`}
            >
              <Mic className="w-4 h-4 text-rose-500 dark:text-rose-400" />
              <span>{isRecording ? 'Recording...' : 'Voice Memo'}</span>
            </button>

            <button
              onClick={() =>
                addQuickCapture({
                  type: 'link',
                  content: 'https://pulse.workspace/specs/design-tokens',
                  url: 'pulse.workspace/specs/design-tokens',
                })
              }
              className="p-2 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-200 dark:hover:bg-white/10 flex items-center gap-1.5"
            >
              <LinkIcon className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
              <span>Save Link</span>
            </button>
          </div>

          <button
            onClick={handleAddNote}
            className="water-drop-effect px-4 py-2 rounded-lg bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 transition-colors"
          >
            Save Note
          </button>
        </div>
      </div>

      {/* Captured Items Feed */}
      <div className="space-y-3">
        {quickCaptures.map((cap) => (
          <div
            key={cap.id}
            className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 hover:border-cyan-500/40 transition-colors shadow-sm"
          >
            <div className="flex items-center justify-between text-[10px] text-slate-500">
              <span className="uppercase font-bold text-cyan-600 dark:text-cyan-400">{cap.type}</span>
              <span>{cap.time}</span>
            </div>

            <div className="font-medium text-slate-900 dark:text-slate-200 text-sm">{cap.content}</div>

            {cap.imageUrl && (
              <div className="w-full h-32 rounded-lg overflow-hidden mt-2">
                <img src={cap.imageUrl} alt="Captured" className="w-full h-full object-cover" />
              </div>
            )}

            {cap.audioDuration && (
              <div className="p-2.5 rounded bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2 text-pink-600 dark:text-pink-400 font-bold">
                  <Play className="w-4 h-4 fill-current" />
                  <span>Voice Memo ({cap.audioDuration})</span>
                </div>
                <div className="flex gap-0.5">
                  {[40, 70, 30, 90, 60, 40, 80, 50].map((h, i) => (
                    <span
                      key={i}
                      style={{ height: `${h / 4}px` }}
                      className="w-1 bg-pink-500/60 dark:bg-pink-400/60 rounded"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
