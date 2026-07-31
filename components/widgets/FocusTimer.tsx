'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Sparkles, CheckSquare, Square } from 'lucide-react';

export function FocusTimer() {
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<'pomodoro' | 'shortBreak' | 'longBreak'>('pomodoro');

  // Ambient sound state
  const [rainVolume, setRainVolume] = useState(40);
  const [cafeVolume, setCafeVolume] = useState(20);
  const [wavesVolume, setWavesVolume] = useState(30);

  // Sound Audio Context Ref
  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning) {
      timer = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  const switchMode = (m: 'pomodoro' | 'shortBreak' | 'longBreak') => {
    setMode(m);
    setIsRunning(false);
    if (m === 'pomodoro') setSecondsLeft(25 * 60);
    if (m === 'shortBreak') setSecondsLeft(5 * 60);
    if (m === 'longBreak') setSecondsLeft(15 * 60);
  };

  const minutes = Math.floor(secondsLeft / 60);
  const remainingSecs = secondsLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${remainingSecs
    .toString()
    .padStart(2, '0')}`;

  const [manifestItems, setManifestItems] = useState([
    { id: 1, text: 'Complete Chapter 4 Data Structures Review', done: true },
    { id: 2, text: 'Refactor microservice routing logic', done: false },
    { id: 3, text: 'Drink 500ml water during short break', done: false },
  ]);

  return (
    <div className="max-w-4xl mx-auto p-6 font-mono text-xs space-y-8">
      {/* Timer Hero Card */}
      <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center relative overflow-hidden shadow-xl">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-emerald-400 to-indigo-500" />

        <div className="flex justify-center gap-2 mb-6">
          {(['pomodoro', 'shortBreak', 'longBreak'] as const).map((m) => (
            <button
              key={m}
              onClick={() => switchMode(m)}
              className={`px-4 py-1.5 rounded-full font-bold transition-all ${
                mode === m
                  ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                  : 'bg-slate-200 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {m === 'pomodoro' ? 'Focus 25m' : m === 'shortBreak' ? 'Break 5m' : 'Rest 15m'}
            </button>
          ))}
        </div>

        <div className="text-6xl sm:text-8xl font-black text-cyan-600 dark:text-cyan-400 tracking-tight my-4 drop-shadow-[0_0_25px_rgba(0,242,254,0.3)]">
          {formattedTime}
        </div>

        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="water-drop-effect px-8 py-3 rounded-xl bg-cyan-500 text-slate-950 font-extrabold text-base hover:bg-cyan-400 transition-transform active:scale-95 flex items-center gap-2"
          >
            {isRunning ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
            {isRunning ? 'PAUSE SESSION' : 'START FOCUS'}
          </button>

          <button
            onClick={() => {
              setIsRunning(false);
              setSecondsLeft(25 * 60);
            }}
            className="p-3 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-white/10"
            title="Reset Timer"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Ambient Sound Generators Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm">
          <div className="flex items-center justify-between font-bold text-cyan-700 dark:text-cyan-300">
            <span>🌧️ Rain Ambiance</span>
            <span className="text-[10px] text-slate-500">{rainVolume}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={rainVolume}
            onChange={(e) => setRainVolume(Number(e.target.value))}
            className="w-full accent-cyan-400"
          />
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm">
          <div className="flex items-center justify-between font-bold text-amber-700 dark:text-amber-300">
            <span>☕ Cafe White Noise</span>
            <span className="text-[10px] text-slate-500">{cafeVolume}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={cafeVolume}
            onChange={(e) => setCafeVolume(Number(e.target.value))}
            className="w-full accent-amber-400"
          />
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm">
          <div className="flex items-center justify-between font-bold text-emerald-700 dark:text-emerald-300">
            <span>🌊 Ocean Waves</span>
            <span className="text-[10px] text-slate-500">{wavesVolume}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={wavesVolume}
            onChange={(e) => setWavesVolume(Number(e.target.value))}
            className="w-full accent-emerald-400"
          />
        </div>
      </div>

      {/* Daily Manifest Checklist */}
      <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm">
        <div className="font-bold text-slate-900 dark:text-slate-200 flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-2">
          <span className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-500 dark:text-cyan-400" /> Focus Session Manifest
          </span>
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
            {manifestItems.filter((m) => m.done).length} / {manifestItems.length} Done
          </span>
        </div>

        <div className="space-y-2">
          {manifestItems.map((item) => (
            <div
              key={item.id}
              onClick={() =>
                setManifestItems((prev) =>
                  prev.map((m) => (m.id === item.id ? { ...m, done: !m.done } : m))
                )
              }
              className="p-2.5 rounded bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 hover:border-cyan-500/30 flex items-center gap-3 cursor-pointer transition-colors"
            >
              {item.done ? (
                <CheckSquare className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0" />
              ) : (
                <Square className="w-4 h-4 text-slate-400 dark:text-slate-500 shrink-0" />
              )}
              <span className={item.done ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-800 dark:text-slate-200 font-medium'}>
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
