'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { useWorkspace } from '@/context/WorkspaceContext';
import { Download, Upload, FileCode, Check, ArrowRight, Loader2 } from 'lucide-react';

export function ImportExportModal() {
  const { isImportExportOpen, setIsImportExportOpen, documents } = useWorkspace();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [format, setFormat] = useState<'Markdown' | 'CSV' | 'JSON' | 'PDF'>('Markdown');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleExecute = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep(3);
    }, 1500);
  };

  return (
    <Modal
      isOpen={isImportExportOpen}
      onClose={() => {
        setIsImportExportOpen(false);
        setStep(1);
      }}
      title="Import / Export Data Wizard"
    >
      <div className="space-y-6 font-mono text-xs">
        {/* Step Indicator */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          {[
            { s: 1, name: 'Format Select' },
            { s: 2, name: 'Source Target' },
            { s: 3, name: 'Complete' },
          ].map((st) => (
            <div
              key={st.s}
              className={`flex items-center gap-1 font-bold ${
                step === st.s
                  ? 'text-cyan-400'
                  : step > st.s
                  ? 'text-emerald-400'
                  : 'text-slate-500'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[10px]">
                {st.s}
              </span>
              <span>{st.name}</span>
            </div>
          ))}
        </div>

        {step === 1 && (
          <div className="space-y-4">
            <div className="font-bold text-slate-200">Select Export Data Format</div>
            <div className="grid grid-cols-2 gap-3">
              {(['Markdown', 'CSV', 'JSON', 'PDF'] as const).map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => setFormat(fmt)}
                  className={`p-4 rounded-xl border text-left flex items-center justify-between font-bold ${
                    format === fmt
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400'
                      : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <FileCode className="w-4 h-4 text-cyan-400" />
                    <span>{fmt} Export</span>
                  </span>
                  {format === fmt && <Check className="w-4 h-4 text-cyan-400" />}
                </button>
              ))}
            </div>

            <button
              onClick={() => setStep(2)}
              className="water-drop-effect w-full py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400"
            >
              Next Step: Select Scope →
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className="font-bold text-slate-200">Export Scope ({format})</div>
            <div className="p-4 rounded-xl bg-slate-900 border border-white/10 space-y-2">
              <div className="text-slate-300">
                Targeting <strong>{documents.length} Workspace Notebook Pages</strong> and data collections.
              </div>
              <div className="text-[10px] text-slate-500">
                Fira Code layout metadata will be preserved in export package.
              </div>
            </div>

            <button
              onClick={handleExecute}
              disabled={isProcessing}
              className="water-drop-effect w-full py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Processing Export Package...
                </>
              ) : (
                'Generate Export Package'
              )}
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="text-center space-y-4 py-4 animate-fadeIn">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
              <Check className="w-6 h-6" />
            </div>
            <div className="font-bold text-slate-100 text-base">Export Package Ready!</div>
            <div className="text-slate-400 text-xs">
              Your package <code>pulse_workspace_backup.{format.toLowerCase()}</code> is ready.
            </div>

            <button
              onClick={() => {
                alert(`Downloaded pulse_workspace_backup.${format.toLowerCase()}`);
                setIsImportExportOpen(false);
                setStep(1);
              }}
              className="water-drop-effect px-6 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 inline-flex items-center gap-2"
            >
              <Download className="w-4 h-4" /> Download File
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
}
