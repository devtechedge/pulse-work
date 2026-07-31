'use client';

import React, { useState } from 'react';
import { Network, Plus, Trash2 } from 'lucide-react';

interface MindNode {
  id: string;
  title: string;
  x: number;
  y: number;
  color: string;
  parentId?: string;
}

export function MindMap() {
  const [nodes, setNodes] = useState<MindNode[]>([
    { id: 'n-root', title: 'Science Project Ideas', x: 280, y: 120, color: 'border-cyan-500 bg-cyan-500/20 text-cyan-800 dark:text-cyan-300' },
    { id: 'n-1', title: 'Solar System', x: 80, y: 280, color: 'border-emerald-500 bg-emerald-500/20 text-emerald-800 dark:text-emerald-300', parentId: 'n-root' },
    { id: 'n-2', title: 'Renewable Energy', x: 280, y: 300, color: 'border-indigo-500 bg-indigo-500/20 text-indigo-800 dark:text-indigo-300', parentId: 'n-root' },
    { id: 'n-3', title: 'Photosynthesis', x: 480, y: 280, color: 'border-purple-500 bg-purple-500/20 text-purple-800 dark:text-purple-300', parentId: 'n-root' },
  ]);

  const [selectedNodeId, setSelectedNodeId] = useState<string | null>('n-root');

  const addSubNode = () => {
    if (!selectedNodeId) return;
    const parent = nodes.find((n) => n.id === selectedNodeId);
    if (!parent) return;

    const newNode: MindNode = {
      id: `n-${Date.now()}`,
      title: 'New Idea',
      x: parent.x + (Math.random() * 100 - 50),
      y: parent.y + 110,
      color: 'border-cyan-400 bg-cyan-400/20 text-cyan-900 dark:text-cyan-200',
      parentId: parent.id,
    };
    setNodes((prev) => [...prev, newNode]);
  };

  const removeNode = (id: string) => {
    setNodes((prev) => prev.filter((n) => n.id !== id && n.parentId !== id));
  };

  return (
    <div className="p-4 font-mono text-xs space-y-4 max-w-4xl mx-auto">
      {/* Mindmap Toolbar */}
      <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-slate-100">
          <Network className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
          <span>Mind Map Canvas</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={addSubNode}
            className="water-drop-effect flex items-center gap-1 px-3 py-1.5 rounded-lg bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 transition-colors shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" /> Add Idea
          </button>
        </div>
      </div>

      {/* SVG Canvas Stage */}
      <div className="relative w-full h-[500px] rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-inner p-4">
        {/* SVG Connecting Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {nodes.map((node) => {
            if (!node.parentId) return null;
            const parent = nodes.find((n) => n.id === node.parentId);
            if (!parent) return null;
            return (
              <line
                key={`${parent.id}-${node.id}`}
                x1={parent.x + 80}
                y1={parent.y + 25}
                x2={node.x + 80}
                y2={node.y + 25}
                stroke="#06b6d4"
                strokeWidth="2"
                strokeDasharray="4 4"
                className="opacity-60"
              />
            );
          })}
        </svg>

        {/* Draggable Node Components */}
        {nodes.map((node) => {
          const isSelected = selectedNodeId === node.id;
          return (
            <div
              key={node.id}
              onClick={() => setSelectedNodeId(node.id)}
              style={{ left: `${node.x}px`, top: `${node.y}px` }}
              className={`absolute p-3 rounded-xl border backdrop-blur-md shadow-md transition-all cursor-pointer font-bold ${
                node.color
              } ${isSelected ? 'ring-2 ring-cyan-500 scale-105' : 'hover:scale-102'}`}
            >
              <input
                type="text"
                value={node.title}
                onChange={(e) => {
                  const val = e.target.value;
                  setNodes((prev) =>
                    prev.map((n) => (n.id === node.id ? { ...n, title: val } : n))
                  );
                }}
                className="bg-transparent outline-none w-36 text-center font-bold text-slate-900 dark:text-slate-100"
              />

              {isSelected && node.id !== 'n-root' && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeNode(node.id);
                  }}
                  className="absolute -top-2 -right-2 p-1 rounded-full bg-rose-500 text-white hover:bg-rose-600 shadow"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

