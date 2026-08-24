export const BLOCK_TYPES = [
  'heading-1',
  'heading-2',
  'text',
  'checklist',
  'bullet',
  'code',
  'callout',
  'video',
  'pdf',
  'audio',
  'link',
] as const;

export type BlockType = (typeof BLOCK_TYPES)[number];

export const PERSONAS = ['Student', 'Creator', 'Planner', 'Business', 'Daily Life'] as const;
export type Persona = (typeof PERSONAS)[number];

export const SCREENS = [
  'launchpad',
  'document',
  'collections',
  'activity',
  'teamspace',
  'focus',
  'mindmap',
  'flashcards',
  'habits',
  'trash',
  'templates',
  'settings',
] as const;
export type Screen = (typeof SCREENS)[number];

export const COLLECTION_STATUSES = ['To Do', 'In Progress', 'Complete'] as const;
export type CollectionStatus = (typeof COLLECTION_STATUSES)[number];

export const COLLECTION_VIEWS = ['table', 'kanban', 'calendar', 'gantt', 'gallery'] as const;
export type CollectionView = (typeof COLLECTION_VIEWS)[number];

export const PRIORITIES = ['Low', 'Medium', 'High'] as const;
export type Priority = (typeof PRIORITIES)[number];

export const FOCUS_PRESETS = {
  pomodoro: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60,
} as const;

export type FocusMode = keyof typeof FOCUS_PRESETS;

const FIELD_KEYS: Record<string, string> = {
  Status: 'status',
  Assignee: 'assignee',
  Priority: 'priority',
  Budget: 'budget',
  Title: 'title',
};

export function isBlockType(value: string): value is BlockType {
  return (BLOCK_TYPES as readonly string[]).includes(value);
}

export function isPersona(value: string): value is Persona {
  return (PERSONAS as readonly string[]).includes(value);
}

export function isScreen(value: string): value is Screen {
  return (SCREENS as readonly string[]).includes(value);
}

export function isCollectionStatus(value: string): value is CollectionStatus {
  return (COLLECTION_STATUSES as readonly string[]).includes(value);
}

export function isCollectionView(value: string): value is CollectionView {
  return (COLLECTION_VIEWS as readonly string[]).includes(value);
}

export function matchDocuments<T extends { title: string }>(docs: T[], query: string): T[] {
  const q = query.trim().toLowerCase();
  if (!q) return docs;
  return docs.filter((doc) => doc.title.toLowerCase().includes(q));
}

export function groupByStatus<T extends { status: string }>(
  items: T[],
): { status: CollectionStatus; items: T[] }[] {
  return COLLECTION_STATUSES.map((status) => ({
    status,
    items: items.filter((item) => item.status === status),
  }));
}

export function parseBudget(raw: string | undefined): number {
  if (!raw) return 0;
  const n = Number(String(raw).replace(/[^0-9.]/g, ''));
  return Number.isFinite(n) ? n : 0;
}

export function applyCollectionFilter<T extends Record<string, unknown>>(
  items: T[],
  field: string,
  operator: string,
  value: string,
): T[] {
  const key = FIELD_KEYS[field] ?? field.toLowerCase();
  const needle = value.trim().toLowerCase();

  return items.filter((item) => {
    const cell = String(item[key] ?? '').toLowerCase();
    if (operator === 'Contains') return cell.includes(needle);
    if (operator === 'Not Equals') return cell !== needle;
    return cell === needle;
  });
}

export function sortCollectionItems<T extends { dueDate: string; title: string; budget?: string }>(
  items: T[],
  sortField: string,
  sortOrder: 'Ascending' | 'Descending',
): T[] {
  const dir = sortOrder === 'Descending' ? -1 : 1;
  return [...items].sort((a, b) => {
    let cmp = 0;
    if (sortField === 'Budget') {
      cmp = parseBudget(a.budget) - parseBudget(b.budget);
    } else if (sortField === 'Title') {
      cmp = a.title.localeCompare(b.title);
    } else {
      cmp = Date.parse(a.dueDate) - Date.parse(b.dueDate);
      if (Number.isNaN(Date.parse(a.dueDate)) || Number.isNaN(Date.parse(b.dueDate))) {
        cmp = a.dueDate.localeCompare(b.dueDate);
      }
    }
    return cmp * dir;
  });
}

export function toggleHabitDay<T extends { weekDays: boolean[]; current: number }>(
  habit: T,
  dayIndex: number,
): T {
  if (dayIndex < 0 || dayIndex > 6) return habit;
  const weekDays = habit.weekDays.map((on, i) => (i === dayIndex ? !on : on));
  return { ...habit, weekDays, current: weekDays.filter(Boolean).length };
}

export function isExpiringSoon(daysRemaining: number, threshold = 3): boolean {
  return daysRemaining >= 0 && daysRemaining <= threshold;
}

export function focusSecondsFor(mode: string): number {
  if (mode in FOCUS_PRESETS) {
    return FOCUS_PRESETS[mode as FocusMode];
  }
  return FOCUS_PRESETS.pomodoro;
}
