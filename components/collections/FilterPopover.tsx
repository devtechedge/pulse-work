'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { useWorkspace } from '@/context/WorkspaceContext';
import { SlidersHorizontal, Plus, Trash2, ArrowUpDown, Check } from 'lucide-react';

export function FilterPopover() {
  const { isFilterOpen, setIsFilterOpen } = useWorkspace();
  const [field, setField] = useState('Status');
  const [operator, setOperator] = useState('Equals');
  const [val, setVal] = useState('In Progress');
  const [sortField, setSortField] = useState('Due Date');
  const [sortOrder, setSortOrder] = useState<'Ascending' | 'Descending'>('Ascending');

  return (
    <Modal
      isOpen={isFilterOpen}
      onClose={() => setIsFilterOpen(false)}
      title="Smart Collection Query Builder"
    >
      <div className="space-y-6 font-mono text-xs">
        {/* Filter Rule Builder */}
        <div>
          <div className="font-bold text-slate-200 mb-2 flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-cyan-400" /> Filter Criteria
          </div>
          <div className="p-3 rounded-lg bg-white/5 border border-white/10 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div>
                <label className="text-[10px] text-slate-400">Field</label>
                <select
                  value={field}
                  onChange={(e) => setField(e.target.value)}
                  className="w-full bg-slate-900 border border-white/10 rounded px-2 py-1 text-slate-200 outline-none mt-1"
                >
                  <option value="Status">Status</option>
                  <option value="Assignee">Assignee</option>
                  <option value="Priority">Priority</option>
                  <option value="Budget">Budget</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] text-slate-400">Operator</label>
                <select
                  value={operator}
                  onChange={(e) => setOperator(e.target.value)}
                  className="w-full bg-slate-900 border border-white/10 rounded px-2 py-1 text-slate-200 outline-none mt-1"
                >
                  <option value="Equals">Equals</option>
                  <option value="Contains">Contains</option>
                  <option value="Not Equals">Not Equals</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] text-slate-400">Value</label>
                <input
                  type="text"
                  value={val}
                  onChange={(e) => setVal(e.target.value)}
                  className="w-full bg-slate-900 border border-white/10 rounded px-2 py-1 text-slate-200 outline-none mt-1"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sort Rule Builder */}
        <div>
          <div className="font-bold text-slate-200 mb-2 flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4 text-emerald-400" /> Sort Order
          </div>
          <div className="p-3 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-slate-400">Sort By:</span>
              <select
                value={sortField}
                onChange={(e) => setSortField(e.target.value)}
                className="bg-slate-900 border border-white/10 rounded px-2 py-1 text-slate-200 outline-none"
              >
                <option value="Due Date">Due Date</option>
                <option value="Priority">Priority</option>
                <option value="Title">Title</option>
                <option value="Budget">Budget</option>
              </select>
            </div>

            <button
              onClick={() =>
                setSortOrder(sortOrder === 'Ascending' ? 'Descending' : 'Ascending')
              }
              className="px-3 py-1 rounded bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30 hover:bg-cyan-500/30"
            >
              {sortOrder}
            </button>
          </div>
        </div>

        <div className="pt-2 border-t border-white/10 flex items-center justify-between">
          <button
            onClick={() => {
              setVal('');
              setIsFilterOpen(false);
            }}
            className="px-3 py-1.5 rounded text-slate-400 hover:text-white"
          >
            Clear Filter
          </button>

          <button
            onClick={() => setIsFilterOpen(false)}
            className="water-drop-effect flex items-center gap-1.5 px-4 py-2 rounded bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 transition-colors"
          >
            <Check className="w-4 h-4" /> Apply Smart Filter
          </button>
        </div>
      </div>
    </Modal>
  );
}
