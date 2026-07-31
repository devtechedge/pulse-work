'use client';

import React from 'react';
import { CreditCard, Users, ShieldCheck, ArrowRight, Zap } from 'lucide-react';

export function BillingSettings() {
  return (
    <div className="space-y-6 font-mono text-xs text-slate-800 dark:text-slate-200">
      {/* Current Subscription Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-[#16181D] dark:to-slate-950 border border-indigo-100 dark:border-cyan-500/30 text-slate-900 dark:text-slate-100 shadow-sm dark:shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-indigo-600 dark:text-cyan-400" />
            <span className="font-extrabold text-base text-slate-900 dark:text-slate-100">Pulse Pro Tier Workspace</span>
          </div>
          <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-700 dark:bg-cyan-500/20 dark:text-cyan-300 font-bold border border-indigo-200 dark:border-cyan-500/30 text-[10px]">
            ACTIVE SUBSCRIPTION
          </span>
        </div>

        <div className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
          Unrestricted block storage, real-time diff history, and custom Fira Code monospace engine capabilities.
        </div>

        <div className="pt-2 flex items-center justify-between border-t border-slate-200 dark:border-white/10">
          <div>
            <div className="text-[10px] text-slate-500">Billing Cycle</div>
            <div className="font-bold text-emerald-700 dark:text-emerald-400">$29/month • Renews Nov 14, 2023</div>
          </div>
          <button
            onClick={() => alert('Billing portal opened!')}
            className="water-drop-effect px-4 py-2 rounded-lg bg-indigo-600 text-white dark:bg-cyan-500 dark:text-slate-950 font-bold hover:bg-indigo-700 dark:hover:bg-cyan-400"
          >
            Manage Billing
          </button>
        </div>
      </div>

      {/* Seat Allocation Capacity */}
      <div className="p-5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
        <div className="flex items-center justify-between font-bold text-slate-900 dark:text-slate-100">
          <span className="flex items-center gap-2">
            <Users className="w-4 h-4 text-cyan-400" /> Active Workspace Seat Usage
          </span>
          <span className="text-cyan-400">8 / 10 Seats Used</span>
        </div>

        <div className="w-full h-3 rounded-full bg-slate-200 dark:bg-slate-950 overflow-hidden p-0.5 border border-white/10">
          <div className="h-full rounded-full bg-cyan-500 w-4/5 shadow-[0_0_10px_rgba(0,242,254,0.5)]" />
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="text-[10px] text-slate-500 dark:text-slate-400">
            Need additional seat capacity for team expand?
          </span>
          <button
            onClick={() => alert('Added 5 additional seat slots!')}
            className="px-3 py-1.5 rounded bg-cyan-500/20 text-cyan-400 font-bold border border-cyan-500/30 hover:bg-cyan-500/30"
          >
            + Expand Seats
          </button>
        </div>
      </div>
    </div>
  );
}
