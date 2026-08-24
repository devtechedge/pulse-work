'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Sparkles, CheckSquare, Square, Music } from 'lucide-react';

// Helper to create noise buffers for Web Audio API synthesis
function createNoiseBuffer(ctx: AudioContext, type: 'pink' | 'brown' | 'white') {
  const bufferSize = 2 * ctx.sampleRate;
  const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const output = noiseBuffer.getChannelData(0);

  let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
  let lastOut = 0.0;

  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;
    if (type === 'white') {
      output[i] = white * 0.1;
    } else if (type === 'pink') {
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
      b6 = white * 0.115926;
    } else if (type === 'brown') {
      output[i] = (lastOut + (0.02 * white)) / 1.02;
      lastOut = output[i];
      output[i] *= 1.5;
    }
  }
  return noiseBuffer;
}

export function FocusTimer() {
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<'pomodoro' | 'shortBreak' | 'longBreak'>('pomodoro');

  // Ambient sound state
  const [rainVolume, setRainVolume] = useState(40);
  const [cafeVolume, setCafeVolume] = useState(20);
  const [wavesVolume, setWavesVolume] = useState(30);
  const [isMuted, setIsMuted] = useState(false);
  const [soundEnabledAlways, setSoundEnabledAlways] = useState(false); // allow previewing without timer if desired

  // Sound Audio Context & Node Refs
  const audioCtxRef = useRef<AudioContext | null>(null);
  const rainGainRef = useRef<GainNode | null>(null);
  const cafeGainRef = useRef<GainNode | null>(null);
  const wavesGainRef = useRef<GainNode | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const isAudioInitializedRef = useRef(false);

  const initAudio = () => {
    if (isAudioInitializedRef.current && audioCtxRef.current) {
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      return;
    }

    try {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtxClass) return;

      const ctx = new AudioCtxClass();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.value = 1.0;
      masterGain.connect(ctx.destination);
      masterGainRef.current = masterGain;

      // 1. Rain Ambiance (Pink noise with lowpass filter)
      const pinkBuf = createNoiseBuffer(ctx, 'pink');
      const rainSource = ctx.createBufferSource();
      rainSource.buffer = pinkBuf;
      rainSource.loop = true;

      const rainFilter = ctx.createBiquadFilter();
      rainFilter.type = 'lowpass';
      rainFilter.frequency.value = 1200;

      const rainGain = ctx.createGain();
      rainGain.gain.value = 0;
      rainSource.connect(rainFilter);
      rainFilter.connect(rainGain);
      rainGain.connect(masterGain);
      rainSource.start(0);
      rainGainRef.current = rainGain;

      // 2. Cafe White Noise (Filtered bandpass white/pink noise)
      const whiteBuf = createNoiseBuffer(ctx, 'white');
      const cafeSource = ctx.createBufferSource();
      cafeSource.buffer = whiteBuf;
      cafeSource.loop = true;

      const cafeFilter = ctx.createBiquadFilter();
      cafeFilter.type = 'bandpass';
      cafeFilter.frequency.value = 750;
      cafeFilter.Q.value = 0.6;

      const cafeGain = ctx.createGain();
      cafeGain.gain.value = 0;
      cafeSource.connect(cafeFilter);
      cafeFilter.connect(cafeGain);
      cafeGain.connect(masterGain);
      cafeSource.start(0);
      cafeGainRef.current = cafeGain;

      // 3. Ocean Waves (Brown noise with LFO volume swell)
      const brownBuf = createNoiseBuffer(ctx, 'brown');
      const wavesSource = ctx.createBufferSource();
      wavesSource.buffer = brownBuf;
      wavesSource.loop = true;

      const wavesFilter = ctx.createBiquadFilter();
      wavesFilter.type = 'lowpass';
      wavesFilter.frequency.value = 450;

      const wavesGain = ctx.createGain();
      wavesGain.gain.value = 0;

      // LFO for ocean wave swells
      const lfo = ctx.createOscillator();
      lfo.type = 'sine';
      lfo.frequency.value = 0.12; // 8-second cycle

      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 0.3;

      lfo.connect(lfoGain);
      lfoGain.connect(wavesGain.gain);

      wavesSource.connect(wavesFilter);
      wavesFilter.connect(wavesGain);
      wavesGain.connect(masterGain);

      wavesSource.start(0);
      lfo.start(0);
      wavesGainRef.current = wavesGain;

      isAudioInitializedRef.current = true;
    } catch (err) {
      console.error('Failed to initialize Web Audio API ambient sounds:', err);
    }
  };

  const updateVolumes = (active: boolean, rain: number, cafe: number, waves: number, muted: boolean) => {
    if (!audioCtxRef.current) return;
    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended' && active) {
      ctx.resume();
    }

    const now = ctx.currentTime;
    const shouldPlay = active && !muted;

    const targetRain = shouldPlay ? (rain / 100) * 0.4 : 0;
    const targetCafe = shouldPlay ? (cafe / 100) * 0.25 : 0;
    const targetWaves = shouldPlay ? (waves / 100) * 0.45 : 0;

    if (rainGainRef.current) {
      rainGainRef.current.gain.setTargetAtTime(targetRain, now, 0.08);
    }
    if (cafeGainRef.current) {
      cafeGainRef.current.gain.setTargetAtTime(targetCafe, now, 0.08);
    }
    if (wavesGainRef.current) {
      wavesGainRef.current.gain.setTargetAtTime(targetWaves, now, 0.08);
    }
  };

  // Synchronize audio gains whenever timer running state or volume sliders change
  useEffect(() => {
    const active = isRunning || soundEnabledAlways;
    if (active) {
      initAudio();
    }
    updateVolumes(active, rainVolume, cafeVolume, wavesVolume, isMuted);
  }, [isRunning, soundEnabledAlways, rainVolume, cafeVolume, wavesVolume, isMuted]);

  // Clean up audio context on unmount
  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

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

  const toggleStartFocus = () => {
    initAudio();
    setIsRunning(!isRunning);
  };

  return (
    <div data-testid="focus-timer" className="max-w-4xl mx-auto p-6 font-mono text-xs space-y-8">
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
            onClick={toggleStartFocus}
            className="water-drop-effect px-8 py-3 rounded-xl bg-cyan-500 text-slate-950 font-extrabold text-base hover:bg-cyan-400 transition-transform active:scale-95 flex items-center gap-2 shadow-md"
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

      {/* Ambient Sound Generators Grid Header & Toggles */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-slate-100 text-sm">
            <Music className="w-4 h-4 text-cyan-500" /> Ambient Soundscapes
            {isRunning && (
              <span className="flex items-center gap-1.5 text-[10px] text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Playing Live
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                initAudio();
                setSoundEnabledAlways(!soundEnabledAlways);
              }}
              className={`px-3 py-1 rounded-lg border text-[11px] font-bold flex items-center gap-1.5 transition-colors ${
                soundEnabledAlways
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400'
                  : 'bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Preview Audio
            </button>

            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`p-1.5 rounded-lg border transition-colors ${
                isMuted
                  ? 'bg-rose-500/10 border-rose-500/30 text-rose-500'
                  : 'bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
              title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

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
              onChange={(e) => {
                initAudio();
                setRainVolume(Number(e.target.value));
              }}
              className="w-full accent-cyan-400 cursor-pointer"
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
              onChange={(e) => {
                initAudio();
                setCafeVolume(Number(e.target.value));
              }}
              className="w-full accent-amber-400 cursor-pointer"
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
              onChange={(e) => {
                initAudio();
                setWavesVolume(Number(e.target.value));
              }}
              className="w-full accent-emerald-400 cursor-pointer"
            />
          </div>
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

