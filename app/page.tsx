'use client';

import React from 'react';
import { ThemeProvider } from '@/context/ThemeContext';
import { WorkspaceProvider, useWorkspace } from '@/context/WorkspaceContext';
import { Sidebar } from '@/components/navigation/Sidebar';
import { Header } from '@/components/navigation/Header';
import { MobileBottomNav } from '@/components/navigation/MobileBottomNav';
import { SpotlightSearch } from '@/components/navigation/SpotlightSearch';
import { HelpShortcutsModal } from '@/components/navigation/HelpShortcutsModal';
import { PersonaModal } from '@/components/navigation/PersonaModal';

import { Launchpad } from '@/components/launchpad/Launchpad';
import { CanvasEditor } from '@/components/editor/CanvasEditor';
import { VersionHistory } from '@/components/editor/VersionHistory';
import { CollectionsContainer } from '@/components/collections/CollectionsContainer';
import { FilterPopover } from '@/components/collections/FilterPopover';
import { ActivityCenter } from '@/components/team/ActivityCenter';
import { TeamspaceHub } from '@/components/team/TeamspaceHub';
import { ShareModal } from '@/components/team/ShareModal';
import { FocusTimer } from '@/components/widgets/FocusTimer';
import { MindMap } from '@/components/widgets/MindMap';
import { Flashcards } from '@/components/widgets/Flashcards';
import { HabitTracker } from '@/components/widgets/HabitTracker';
import { TemplateGallery } from '@/components/widgets/TemplateGallery';
import { TrashManager } from '@/components/trash/TrashManager';
import { SettingsContainer } from '@/components/settings/SettingsContainer';
import { ImportExportModal } from '@/components/settings/ImportExportModal';

function MainAppContent() {
  const { activeScreen } = useWorkspace();

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-50 dark:bg-[#0B0C10] text-slate-900 dark:text-slate-100 font-mono">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:pl-64 h-full overflow-hidden relative pb-16 md:pb-0">
        <Header />

        <main className="flex-1 overflow-y-auto flex flex-col">
          {activeScreen === 'launchpad' && <Launchpad />}
          {activeScreen === 'document' && <CanvasEditor />}
          {activeScreen === 'collections' && <CollectionsContainer />}
          {activeScreen === 'activity' && <ActivityCenter />}
          {activeScreen === 'teamspace' && <TeamspaceHub />}
          {activeScreen === 'focus' && <FocusTimer />}
          {activeScreen === 'mindmap' && <MindMap />}
          {activeScreen === 'flashcards' && <Flashcards />}
          {activeScreen === 'habits' && <HabitTracker />}
          {activeScreen === 'templates' && <TemplateGallery />}
          {activeScreen === 'trash' && <TrashManager />}
          {activeScreen === 'settings' && <SettingsContainer />}
        </main>
      </div>

      {/* Mobile Navigation */}
      <MobileBottomNav />

      {/* Modals & Overlays */}
      <SpotlightSearch />
      <HelpShortcutsModal />
      <PersonaModal />
      <ShareModal />
      <VersionHistory />
      <FilterPopover />
      <ImportExportModal />
    </div>
  );
}

export default function Home() {
  return (
    <ThemeProvider>
      <WorkspaceProvider>
        <MainAppContent />
      </WorkspaceProvider>
    </ThemeProvider>
  );
}
