'use client';

import React, { useState } from 'react';
import { useWorkspace } from '@/context/WorkspaceContext';
import { BookOpen, RotateCw, CheckCircle, HelpCircle, ArrowRight } from 'lucide-react';

export function Flashcards() {
  const { flashcards } = useWorkspace();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [score, setScore] = useState(0);

  const currentCard = flashcards[currentIndex] || flashcards[0];

  const handleNext = (known: boolean) => {
    if (known) setScore((s) => s + 1);
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % flashcards.length);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 font-mono text-xs space-y-6">
      {/* Quiz Deck Header */}
      <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-slate-100">
          <BookOpen className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
          <span>Flashcard Quiz Practice</span>
        </div>
        <div className="flex items-center gap-3 text-[11px]">
          <span className="text-slate-600 dark:text-slate-400">Card {currentIndex + 1} of {flashcards.length}</span>
          <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-bold border border-emerald-500/30">
            Score: {score}
          </span>
        </div>
      </div>

      {/* Flip Card Container */}
      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className="w-full h-72 rounded-2xl bg-white dark:bg-gradient-to-br dark:from-slate-900 dark:via-[#16181D] dark:to-slate-950 border border-slate-200 dark:border-cyan-500/30 p-8 flex flex-col items-center justify-center text-center cursor-pointer shadow-lg relative transition-transform duration-300 hover:scale-[1.01] group"
      >
        <div className="absolute top-4 left-4 px-3 py-1 rounded-md bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 font-bold text-[10px] border border-cyan-500/20">
          {currentCard.category}
        </div>

        <div className="text-slate-500 dark:text-slate-400 text-[10px] mb-4 flex items-center gap-1 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
          <RotateCw className="w-3.5 h-3.5" /> Click card to flip
        </div>

        {!isFlipped ? (
          <div className="space-y-3">
            <HelpCircle className="w-8 h-8 text-cyan-500 dark:text-cyan-400 mx-auto opacity-70" />
            <div className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 max-w-md">
              {currentCard.question}
            </div>
          </div>
        ) : (
          <div className="space-y-3 animate-fadeIn">
            <CheckCircle className="w-8 h-8 text-emerald-500 dark:text-emerald-400 mx-auto" />
            <div className="text-sm font-semibold text-emerald-800 dark:text-emerald-300 max-w-md leading-relaxed">
              {currentCard.answer}
            </div>
          </div>
        )}
      </div>

      {/* Grading Controls */}
      {isFlipped && (
        <div className="flex items-center justify-center gap-4 animate-fadeIn">
          <button
            onClick={() => handleNext(false)}
            className="water-drop-effect px-6 py-2.5 rounded-xl bg-rose-500/10 dark:bg-rose-500/20 text-rose-700 dark:text-rose-300 font-bold border border-rose-500/30 hover:bg-rose-500/20 transition-colors text-xs"
          >
            Review Again
          </button>
          <button
            onClick={() => handleNext(true)}
            className="water-drop-effect px-6 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 transition-colors flex items-center gap-2 text-xs shadow-md"
          >
            Got It! (+1 Score)
          </button>
        </div>
      )}
    </div>
  );
}
