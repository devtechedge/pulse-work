'use client';

import React, { useState } from 'react';
import { Settings, User, CreditCard, Network, Download } from 'lucide-react';
import { AppearanceSettings } from './AppearanceSettings';
import { BillingSettings } from './BillingSettings';
import { IntegrationsHub } from './IntegrationsHub';
import { useWorkspace } from '@/context/WorkspaceContext';

export function SettingsContainer() {
  const [tab, setTab] = useState<'appearance' | 'billing' | 'integrations'>('appearance');
  const { setIsImportExportOpen } = useWorkspace();

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-8 font-mono text-xs space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-white/10">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Settings className="w-6 h-6 text-cyan-400" />
            <span>Workspace Settings & Ecosystem</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Configure system themes, seat allocations, and connected cloud services.
          </p>
        </div>

        <button
          onClick={() => setIsImportExportOpen(true)}
          className="water-drop-effect flex items-center gap-1.5 px-4 py-2 rounded-lg bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 transition-colors"
        >
          <Download className="w-4 h-4" />
          <span>Import / Export Wizard</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1.5 rounded-xl bg-slate-200/80 dark:bg-slate-900 border border-slate-300 dark:border-slate-800">
        <button
          onClick={() => setTab('appearance')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-all ${
            tab === 'appearance'
              ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <User className="w-4 h-4" /> Appearance & Account
        </button>

        <button
          onClick={() => setTab('billing')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-all ${
            tab === 'billing'
              ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <CreditCard className="w-4 h-4" /> Billing & Capacity
        </button>

        <button
          onClick={() => setTab('integrations')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-all ${
            tab === 'integrations'
              ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Network className="w-4 h-4" /> Connected Apps
        </button>
      </div>

      {/* Active Tab View */}
      <div>
        {tab === 'appearance' && <AppearanceSettings />}
        {tab === 'billing' && <BillingSettings />}
        {tab === 'integrations' && <IntegrationsHub />}
      </div>
    </div>
  );
}
