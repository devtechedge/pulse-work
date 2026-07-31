'use client';

import React, { createContext, useContext, useState } from 'react';

export type PersonaType = 'Student' | 'Creator' | 'Planner' | 'Business' | 'Daily Life';

export type ActiveScreen =
  | 'launchpad'
  | 'document'
  | 'collections'
  | 'activity'
  | 'teamspace'
  | 'focus'
  | 'mindmap'
  | 'flashcards'
  | 'habits'
  | 'trash'
  | 'templates'
  | 'settings';

export type CollectionViewType = 'table' | 'kanban' | 'calendar' | 'gantt' | 'gallery';

export interface Block {
  id: string;
  type: 'heading-1' | 'heading-2' | 'text' | 'checklist' | 'bullet' | 'code' | 'callout' | 'video' | 'pdf' | 'audio' | 'link';
  content: string;
  checked?: boolean;
  language?: string;
  url?: string;
}

export interface WorkspaceDocument {
  id: string;
  title: string;
  icon: string;
  coverUrl?: string;
  category: 'Personal' | 'Projects' | 'Team' | 'Archive';
  updatedAt: string;
  blocks: Block[];
  isPinned?: boolean;
  isFavorite?: boolean;
}

export interface CollectionItem {
  id: string;
  title: string;
  status: 'To Do' | 'In Progress' | 'Complete';
  dueDate: string;
  budget?: string;
  assignee: string;
  tags: string[];
  priority: 'Low' | 'Medium' | 'High';
  checked?: boolean;
  category: string;
  imageUrl?: string;
}

export interface TrashItem {
  id: string;
  title: string;
  type: 'Notebook' | 'Collection' | 'Asset';
  deletedAt: string;
  daysRemaining: number;
  size: string;
}

export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  category: string;
  lastReviewed?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

export interface QuickCaptureItem {
  id: string;
  type: 'note' | 'link' | 'memo' | 'visual';
  content: string;
  time: string;
  tags?: string[];
  audioDuration?: string;
  url?: string;
  imageUrl?: string;
}

export interface HabitItem {
  id: string;
  name: string;
  target: string;
  current: number;
  total: number;
  weekDays: boolean[]; // Mon - Sun
  unit: string;
}

interface WorkspaceContextType {
  persona: PersonaType;
  setPersona: (p: PersonaType) => void;
  activeScreen: ActiveScreen;
  setActiveScreen: (screen: ActiveScreen) => void;
  activeCollectionView: CollectionViewType;
  setActiveCollectionView: (view: CollectionViewType) => void;

  documents: WorkspaceDocument[];
  activeDocumentId: string;
  setActiveDocumentId: (id: string) => void;
  activeDocument: WorkspaceDocument | undefined;
  createDocument: (title?: string) => void;
  updateDocumentBlocks: (docId: string, blocks: Block[]) => void;
  deleteDocument: (id: string) => void;
  toggleFavorite: (id: string) => void;

  collectionItems: CollectionItem[];
  addCollectionItem: (item: Partial<CollectionItem>) => void;
  updateCollectionItem: (id: string, item: Partial<CollectionItem>) => void;

  trashItemList: TrashItem[];
  restoreFromTrash: (id: string) => void;
  emptyTrash: () => void;

  flashcards: Flashcard[];
  quickCaptures: QuickCaptureItem[];
  addQuickCapture: (capture: Partial<QuickCaptureItem>) => void;

  habits: HabitItem[];
  toggleHabitDay: (habitId: string, dayIndex: number) => void;

  // Modals
  isSpotlightOpen: boolean;
  setIsSpotlightOpen: (open: boolean) => void;
  isShareOpen: boolean;
  setIsShareOpen: (open: boolean) => void;
  isVersionHistoryOpen: boolean;
  setIsVersionHistoryOpen: (open: boolean) => void;
  isHelpShortcutsOpen: boolean;
  setIsHelpShortcutsOpen: (open: boolean) => void;
  isImportExportOpen: boolean;
  setIsImportExportOpen: (open: boolean) => void;
  isFilterOpen: boolean;
  setIsFilterOpen: (open: boolean) => void;
  isPersonaModalOpen: boolean;
  setIsPersonaModalOpen: (open: boolean) => void;

  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

const initialDocuments: WorkspaceDocument[] = [
  {
    id: 'doc-1',
    title: 'Project Nova: Core Infrastructure Migration',
    icon: '📄',
    coverUrl: 'https://picsum.photos/seed/cyber/1200/400',
    category: 'Projects',
    updatedAt: '2h ago',
    isPinned: true,
    isFavorite: true,
    blocks: [
      {
        id: 'b-1',
        type: 'heading-1',
        content: 'Project Nova: Core Infrastructure Migration',
      },
      {
        id: 'b-2',
        type: 'text',
        content:
          'The primary objective of this quarter initiative is to transition our legacy monolithic backend architecture to a highly scalable, distributed microservices model using Kubernetes.',
      },
      {
        id: 'b-3',
        type: 'heading-2',
        content: '1. Current State Assessment',
      },
      {
        id: 'b-4',
        type: 'callout',
        content:
          'We observed a 34% increase in latency during peak usage hours last month. This metric alone justifies accelerating the migration timeline before the holiday traffic surge.',
      },
      {
        id: 'b-5',
        type: 'code',
        language: 'yaml',
        content: `apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: core-api-service\nspec:\n  replicas: 3\n  selector:\n    matchLabels:\n      app: nova-core`,
      },
      {
        id: 'b-6',
        type: 'checklist',
        content: 'Complete initial Kubernetes cluster setup',
        checked: true,
      },
      {
        id: 'b-7',
        type: 'checklist',
        content: 'Verify API Gateway routing matrix',
        checked: false,
      },
      {
        id: 'b-8',
        type: 'heading-2',
        content: '2. Target Architecture',
      },
      {
        id: 'b-9',
        type: 'text',
        content:
          'The proposed architecture leverages AWS EKS for orchestration. We will decouple the user authentication service first, as it currently holds the highest dependency matrix.',
      },
    ],
  },
  {
    id: 'doc-2',
    title: 'Q3 Synthesis Report',
    icon: '📊',
    category: 'Personal',
    updatedAt: '2h ago',
    isPinned: true,
    isFavorite: true,
    blocks: [
      { id: 'b-10', type: 'heading-1', content: 'Q3 Synthesis & Performance Review' },
      { id: 'b-11', type: 'text', content: 'Quarterly review of team output, velocity metrics, and resource utilization.' },
    ],
  },
  {
    id: 'doc-3',
    title: 'User Metrics Raw Data',
    icon: '📁',
    category: 'Projects',
    updatedAt: '5h ago',
    isPinned: false,
    isFavorite: false,
    blocks: [{ id: 'b-12', type: 'text', content: 'Raw dataset metrics for active daily engagement.' }],
  },
  {
    id: 'doc-4',
    title: 'Design System V2 Specification',
    icon: '🎨',
    category: 'Team',
    updatedAt: '1d ago',
    isPinned: false,
    isFavorite: true,
    blocks: [{ id: 'b-13', type: 'text', content: 'System-wide standard for monospace UI components and typography hierarchy.' }],
  },
];

const initialCollections: CollectionItem[] = [
  {
    id: '#P-084',
    title: 'User Auth Migration V2',
    status: 'In Progress',
    dueDate: 'Oct 24, 2023',
    budget: '$12,500',
    assignee: 'Alex Vance',
    tags: ['Backend', 'Security'],
    priority: 'High',
    category: 'Core Infrastructure',
    imageUrl: 'https://picsum.photos/seed/kanban1/400/250',
  },
  {
    id: '#P-087',
    title: 'GraphQL Endpoint Optimization',
    status: 'In Progress',
    dueDate: 'Oct 26, 2023',
    budget: '$8,000',
    assignee: 'Sarah Chen',
    tags: ['API', 'Performance'],
    priority: 'Medium',
    category: 'Core Infrastructure',
    imageUrl: 'https://picsum.photos/seed/kanban2/400/250',
  },
  {
    id: '#P-092',
    title: 'Shared Components Parser',
    status: 'To Do',
    dueDate: 'Nov 02, 2023',
    budget: '$5,400',
    assignee: 'Elena Rust',
    tags: ['UI/UX', 'Frontend'],
    priority: 'Low',
    category: 'Design System',
    imageUrl: 'https://picsum.photos/seed/kanban3/400/250',
  },
  {
    id: '#P-095',
    title: 'Set up Tailwind Monospace Config',
    status: 'Complete',
    dueDate: 'Oct 18, 2023',
    budget: '$2,000',
    assignee: 'Marcus Thorne',
    tags: ['Infra', 'Styling'],
    priority: 'Medium',
    checked: true,
    category: 'Design System',
  },
];

const initialTrashItems: TrashItem[] = [
  {
    id: 'tr-1',
    title: 'Q3 Financial Projections.md',
    type: 'Notebook',
    deletedAt: 'Oct 12, 2023',
    daysRemaining: 14,
    size: '24 KB',
  },
  {
    id: 'tr-2',
    title: 'Legacy Client Assets',
    type: 'Collection',
    deletedAt: 'Oct 10, 2023',
    daysRemaining: 12,
    size: '4.2 MB',
  },
  {
    id: 'tr-3',
    title: 'Legacy_API_Docs_2021.zip',
    type: 'Asset',
    deletedAt: 'Sep 28, 2023',
    daysRemaining: 1,
    size: '128 MB',
  },
];

const initialFlashcards: Flashcard[] = [
  {
    id: 'fc-1',
    question: 'Define the principle of Idempotency in API design.',
    answer: 'An operation is idempotent if executing it multiple times produces the exact same side-effects as executing it once.',
    category: 'System Architecture',
  },
  {
    id: 'fc-2',
    question: 'What is the primary advantage of B-Tree indexing over Hash indexing?',
    answer: 'B-Trees support range queries and order-by operations efficiently, whereas Hash indexes only support point equality lookups.',
    category: 'Database Systems',
  },
  {
    id: 'fc-3',
    question: 'Explain the difference between Optimistic and Pessimistic Concurrency Control.',
    answer: 'Optimistic assumes collisions are rare and verifies at commit time; Pessimistic locks resources beforehand to prevent concurrent edits.',
    category: 'Distributed Systems',
  },
];

const initialQuickCaptures: QuickCaptureItem[] = [
  {
    id: 'qc-1',
    type: 'note',
    content: 'Need to refine fluid dynamics parameters for the new particle system. Viscosity settings around 0.84 give optimal liquid water-drop feedback.',
    time: '10:42 AM',
    tags: ['#physics', '#ui-motion'],
  },
  {
    id: 'qc-2',
    type: 'visual',
    content: 'Reference structural wireframe grid layout',
    time: '09:50 AM',
    imageUrl: 'https://picsum.photos/seed/arch/300/180',
  },
  {
    id: 'qc-3',
    type: 'link',
    content: 'Typography Hierarchy in Monospace Systems',
    url: 'design-system.io/docs',
    time: 'Yesterday',
  },
  {
    id: 'qc-4',
    type: 'memo',
    content: 'Brief thoughts on gallery card grid alignment and spring animations...',
    audioDuration: '0:45',
    time: '09:15 AM',
  },
];

const initialHabits: HabitItem[] = [
  {
    id: 'hb-1',
    name: 'Morning Hydration (1L)',
    target: '1L',
    current: 1,
    total: 1,
    weekDays: [true, true, true, false, false, false, false],
    unit: 'Liters',
  },
  {
    id: 'hb-2',
    name: 'Exercise Protocol',
    target: '3/4 sessions',
    current: 3,
    total: 4,
    weekDays: [true, true, true, true, false, false, false],
    unit: 'Sessions',
  },
  {
    id: 'hb-3',
    name: 'Deep Work Focus',
    target: '10/20 hrs',
    current: 10,
    total: 20,
    weekDays: [true, true, true, false, false, false, false],
    unit: 'Hours',
  },
  {
    id: 'hb-4',
    name: 'Read 20 pages',
    target: '20 pages',
    current: 0,
    total: 20,
    weekDays: [true, false, false, false, false, false, false],
    unit: 'Pages',
  },
];

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
  const [persona, setPersona] = useState<PersonaType>('Creator');
  const [activeScreen, setActiveScreen] = useState<ActiveScreen>('launchpad');
  const [activeCollectionView, setActiveCollectionView] = useState<CollectionViewType>('kanban');

  const [documents, setDocuments] = useState<WorkspaceDocument[]>(initialDocuments);
  const [activeDocumentId, setActiveDocumentId] = useState<string>('doc-1');
  const [collectionItems, setCollectionItems] = useState<CollectionItem[]>(initialCollections);
  const [trashItemList, setTrashItemList] = useState<TrashItem[]>(initialTrashItems);
  const [flashcards] = useState<Flashcard[]>(initialFlashcards);
  const [quickCaptures, setQuickCaptures] = useState<QuickCaptureItem[]>(initialQuickCaptures);
  const [habits, setHabits] = useState<HabitItem[]>(initialHabits);

  // Modals
  const [isSpotlightOpen, setIsSpotlightOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isVersionHistoryOpen, setIsVersionHistoryOpen] = useState(false);
  const [isHelpShortcutsOpen, setIsHelpShortcutsOpen] = useState(false);
  const [isImportExportOpen, setIsImportExportOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isPersonaModalOpen, setIsPersonaModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const activeDocument = documents.find((d) => d.id === activeDocumentId);

  const createDocument = (title = 'Untitled Page') => {
    const newDoc: WorkspaceDocument = {
      id: `doc-${Date.now()}`,
      title,
      icon: '📄',
      category: 'Personal',
      updatedAt: 'Just now',
      blocks: [
        { id: `b-${Date.now()}`, type: 'heading-1', content: title },
        { id: `b-${Date.now() + 1}`, type: 'text', content: 'Start typing or press "/" for commands...' },
      ],
    };
    setDocuments((prev) => [newDoc, ...prev]);
    setActiveDocumentId(newDoc.id);
    setActiveScreen('document');
  };

  const updateDocumentBlocks = (docId: string, blocks: Block[]) => {
    setDocuments((prev) =>
      prev.map((doc) => (doc.id === docId ? { ...doc, blocks, updatedAt: 'Just now' } : doc))
    );
  };

  const deleteDocument = (id: string) => {
    const docToDelete = documents.find((d) => d.id === id);
    if (docToDelete) {
      setTrashItemList((prev) => [
        {
          id: `tr-${Date.now()}`,
          title: docToDelete.title,
          type: 'Notebook',
          deletedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          daysRemaining: 14,
          size: '12 KB',
        },
        ...prev,
      ]);
      setDocuments((prev) => prev.filter((d) => d.id !== id));
      if (activeDocumentId === id) {
        setActiveDocumentId(documents[0]?.id || '');
      }
    }
  };

  const toggleFavorite = (id: string) => {
    setDocuments((prev) =>
      prev.map((doc) => (doc.id === id ? { ...doc, isFavorite: !doc.isFavorite } : doc))
    );
  };

  const addCollectionItem = (item: Partial<CollectionItem>) => {
    const newItem: CollectionItem = {
      id: `#P-${Math.floor(100 + Math.random() * 900)}`,
      title: item.title || 'New Deliverable',
      status: item.status || 'To Do',
      dueDate: item.dueDate || 'Next Week',
      assignee: item.assignee || 'Alex Vance',
      tags: item.tags || ['Feature'],
      priority: item.priority || 'Medium',
      category: item.category || 'General',
      budget: item.budget || '$1,000',
    };
    setCollectionItems((prev) => [newItem, ...prev]);
  };

  const updateCollectionItem = (id: string, item: Partial<CollectionItem>) => {
    setCollectionItems((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...item } : c))
    );
  };

  const restoreFromTrash = (id: string) => {
    const trashItem = trashItemList.find((t) => t.id === id);
    if (trashItem) {
      const restoredDoc: WorkspaceDocument = {
        id: `doc-restored-${Date.now()}`,
        title: trashItem.title,
        icon: '📄',
        category: 'Personal',
        updatedAt: 'Restored just now',
        blocks: [
          { id: `b-${Date.now()}`, type: 'heading-1', content: trashItem.title },
          { id: `b-${Date.now() + 1}`, type: 'text', content: 'Restored content...' },
        ],
      };
      setDocuments((prev) => [restoredDoc, ...prev]);
      setTrashItemList((prev) => prev.filter((t) => t.id !== id));
    }
  };

  const emptyTrash = () => {
    setTrashItemList([]);
  };

  const addQuickCapture = (capture: Partial<QuickCaptureItem>) => {
    const newCap: QuickCaptureItem = {
      id: `qc-${Date.now()}`,
      type: capture.type || 'note',
      content: capture.content || '',
      time: 'Just now',
      tags: capture.tags,
      url: capture.url,
      imageUrl: capture.imageUrl,
      audioDuration: capture.audioDuration,
    };
    setQuickCaptures((prev) => [newCap, ...prev]);
  };

  const toggleHabitDay = (habitId: string, dayIndex: number) => {
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id === habitId) {
          const newDays = [...h.weekDays];
          newDays[dayIndex] = !newDays[dayIndex];
          const currentCount = newDays.filter(Boolean).length;
          return { ...h, weekDays: newDays, current: currentCount };
        }
        return h;
      })
    );
  };

  return (
    <WorkspaceContext.Provider
      value={{
        persona,
        setPersona,
        activeScreen,
        setActiveScreen,
        activeCollectionView,
        setActiveCollectionView,
        documents,
        activeDocumentId,
        setActiveDocumentId,
        activeDocument,
        createDocument,
        updateDocumentBlocks,
        deleteDocument,
        toggleFavorite,
        collectionItems,
        addCollectionItem,
        updateCollectionItem,
        trashItemList,
        restoreFromTrash,
        emptyTrash,
        flashcards,
        quickCaptures,
        addQuickCapture,
        habits,
        toggleHabitDay,
        isSpotlightOpen,
        setIsSpotlightOpen,
        isShareOpen,
        setIsShareOpen,
        isVersionHistoryOpen,
        setIsVersionHistoryOpen,
        isHelpShortcutsOpen,
        setIsHelpShortcutsOpen,
        isImportExportOpen,
        setIsImportExportOpen,
        isFilterOpen,
        setIsFilterOpen,
        isPersonaModalOpen,
        setIsPersonaModalOpen,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error('useWorkspace must be used within a WorkspaceProvider');
  }
  return context;
}
