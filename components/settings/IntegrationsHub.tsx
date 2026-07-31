'use client';

import React, { useState } from 'react';
import { Network, Check, ExternalLink, Key, RefreshCw } from 'lucide-react';

export function IntegrationsHub() {
  const [integrations, setIntegrations] = useState([
    {
      id: 'int-1',
      name: 'Google Drive & Workspace',
      desc: 'Sync documents, spreadsheets, and drive assets directly to blocks.',
      connected: true,
      apiKey: '••••••••••••••••3A9F',
    },
    {
      id: 'int-2',
      name: 'AWS S3 Object Storage',
      desc: 'Store cover banners, video files, and raw media attachments.',
      connected: true,
      apiKey: 'AKIAIOSFODNN7EXAMPLE',
    },
    {
      id: 'int-3',
      name: 'Slack Webhooks Matrix',
      desc: 'Post real-time notifications when collections or cards update.',
      connected: false,
      apiKey: '',
    },
    {
      id: 'int-4',
      name: 'GitHub Repository Sync',
      desc: 'Link commits, issues, and line diffs to workspace notebooks.',
      connected: true,
      apiKey: 'ghp_••••••••••••••••4B82',
    },
  ]);

  const toggleConnect = (id: string) => {
    setIntegrations((prev) =>
      prev.map((i) => (i.id === id ? { ...i, connected: !i.connected } : i))
    );
  };

  return (
    <div className="space-y-6 font-mono text-xs text-slate-800 dark:text-slate-200">
      <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
        <div className="font-bold text-slate-900 dark:text-slate-100 text-sm flex items-center gap-2">
          <Network className="w-4 h-4 text-cyan-400" /> Connected Services & Ecosystem API
        </div>
        <div className="text-[11px] text-slate-500 dark:text-slate-400">
          Connect external cloud integrations without breaking monospace layout integrity.
        </div>
      </div>

      <div className="space-y-4">
        {integrations.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                  {item.name}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  {item.desc}
                </div>
              </div>

              <button
                onClick={() => toggleConnect(item.id)}
                className={`px-3 py-1.5 rounded-full font-bold text-[10px] transition-colors ${
                  item.connected
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-slate-200 dark:bg-white/10 text-slate-500 dark:text-slate-400'
                }`}
              >
                {item.connected ? '✓ Connected' : '+ Connect Service'}
              </button>
            </div>

            {item.connected && (
              <div className="pt-2 border-t border-slate-200 dark:border-white/5 flex items-center gap-2">
                <Key className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <input
                  type="text"
                  readOnly
                  value={item.apiKey}
                  className="w-full bg-slate-200 dark:bg-slate-950 border border-slate-300 dark:border-white/10 rounded px-2 py-1 text-[11px] text-slate-700 dark:text-slate-300 font-mono outline-none"
                />
                <button
                  onClick={() => alert('API Key re-verified successfully!')}
                  className="p-1 rounded hover:bg-slate-200 dark:hover:bg-white/10 text-slate-500 dark:text-slate-400"
                  title="Re-verify Key"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
