'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { useWorkspace } from '@/context/WorkspaceContext';
import { Share2, Globe, Copy, Check, UserPlus, Shield } from 'lucide-react';

export function ShareModal() {
  const { isShareOpen, setIsShareOpen, activeDocument } = useWorkspace();
  const [isPublic, setIsPublic] = useState(true);
  const [copied, setCopied] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [role, setRole] = useState<'Full Access' | 'Can Edit' | 'Can View'>('Can Edit');

  const collaborators = [
    { name: 'Sarah Chen', email: 'sarah@pulse.workspace', role: 'Full Access', avatar: 'SC' },
    { name: 'Alex Vance', email: 'alex@pulse.workspace', role: 'Can Edit', avatar: 'AV' },
    { name: 'Elena Rust', email: 'elena@pulse.workspace', role: 'Can View', avatar: 'ER' },
  ];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://pulse.workspace/share/${activeDocument?.id || 'doc-1'}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Modal
      isOpen={isShareOpen}
      onClose={() => setIsShareOpen(false)}
      title="Share & Collaborator Permissions"
    >
      <div className="space-y-6 font-mono text-xs">
        {/* Public Web Link Toggle */}
        <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-slate-900 dark:text-slate-100">Share to Web</div>
              <div className="text-[11px] text-slate-600 dark:text-slate-400">
                Anyone with the link can view this node.
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsPublic(!isPublic)}
            className={`w-12 h-6 rounded-full p-1 transition-colors ${
              isPublic ? 'bg-cyan-500' : 'bg-slate-300 dark:bg-slate-800'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-white dark:bg-slate-950 transition-transform shadow-sm ${
                isPublic ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Copy Share Link */}
        {isPublic && (
          <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-white/10">
            <input
              type="text"
              readOnly
              value={`https://pulse.workspace/share/${activeDocument?.id || 'doc-1'}`}
              className="w-full bg-transparent text-slate-800 dark:text-slate-300 outline-none px-2 text-[11px]"
            />
            <button
              onClick={handleCopyLink}
              className="water-drop-effect px-3 py-1.5 rounded bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 transition-colors shrink-0 flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Copy Link'}
            </button>
          </div>
        )}

        {/* Invite Collaborator Form */}
        <div>
          <div className="font-bold text-slate-900 dark:text-slate-200 mb-2 flex items-center gap-2">
            <UserPlus className="w-4 h-4 text-cyan-600 dark:text-cyan-400" /> Invite Team Member
          </div>
          <div className="flex gap-2">
            <input
              type="email"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              placeholder="Enter email address..."
              className="flex-1 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-lg p-2 text-slate-900 dark:text-slate-200 outline-none"
            />
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as 'Full Access' | 'Can Edit' | 'Can View')}
              className="bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-lg px-2 text-slate-900 dark:text-slate-200 outline-none"
            >
              <option value="Can View">Can View</option>
              <option value="Can Edit">Can Edit</option>
              <option value="Full Access">Full Access</option>
            </select>
            <button
              onClick={() => {
                alert(`Invite sent to ${inviteEmail} with ${role} permissions!`);
                setInviteEmail('');
              }}
              className="water-drop-effect px-4 py-2 rounded-lg bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400"
            >
              Invite
            </button>
          </div>
        </div>

        {/* Active Member List */}
        <div>
          <div className="font-bold text-slate-900 dark:text-slate-200 mb-2 flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Active Collaborators ({collaborators.length})
          </div>
          <div className="space-y-2">
            {collaborators.map((c) => (
              <div
                key={c.email}
                className="p-3 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 font-bold flex items-center justify-center border border-cyan-500/30">
                    {c.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 dark:text-slate-200">{c.name}</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400">{c.email}</div>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-[10px] text-cyan-700 dark:text-cyan-300 font-bold">
                  {c.role}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}
