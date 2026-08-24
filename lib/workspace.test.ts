import { describe, expect, it } from 'vitest';
import {
  applyCollectionFilter,
  BLOCK_TYPES,
  COLLECTION_STATUSES,
  focusSecondsFor,
  FOCUS_PRESETS,
  groupByStatus,
  isBlockType,
  isCollectionStatus,
  isCollectionView,
  isExpiringSoon,
  isPersona,
  isScreen,
  matchDocuments,
  parseBudget,
  PERSONAS,
  sortCollectionItems,
  toggleHabitDay,
} from './workspace';

const docs = [
  { id: '1', title: 'Project Nova: Core Infrastructure Migration' },
  { id: '2', title: 'Q3 Synthesis Report' },
  { id: '3', title: 'Design System V2 Specification' },
];

const items = [
  { id: 'a', title: 'Auth', status: 'In Progress', dueDate: 'Oct 24, 2023', budget: '$12,500', assignee: 'Alex Vance', priority: 'High' },
  { id: 'b', title: 'Parser', status: 'To Do', dueDate: 'Nov 02, 2023', budget: '$5,400', assignee: 'Elena Rust', priority: 'Low' },
  { id: 'c', title: 'Tailwind', status: 'Complete', dueDate: 'Oct 18, 2023', budget: '$2,000', assignee: 'Marcus Thorne', priority: 'Medium' },
];

describe('allow-lists', () => {
  it('accepts known block types and rejects unknown', () => {
    expect(BLOCK_TYPES).toHaveLength(11);
    expect(isBlockType('heading-1')).toBe(true);
    expect(isBlockType('callout')).toBe(true);
    expect(isBlockType('markdown')).toBe(false);
  });

  it('accepts personas, screens, statuses, and views', () => {
    expect(PERSONAS).toContain('Creator');
    expect(isPersona('Creator')).toBe(true);
    expect(isPersona('Admin')).toBe(false);
    expect(isScreen('launchpad')).toBe(true);
    expect(isScreen('billing')).toBe(false);
    expect(isCollectionStatus('In Progress')).toBe(true);
    expect(isCollectionStatus('Blocked')).toBe(false);
    expect(isCollectionView('gantt')).toBe(true);
    expect(isCollectionView('timeline')).toBe(false);
  });
});

describe('matchDocuments', () => {
  it('returns all documents for a blank query', () => {
    expect(matchDocuments(docs, '  ')).toHaveLength(3);
  });

  it('filters by case-insensitive title substring', () => {
    const hits = matchDocuments(docs, 'nova');
    expect(hits.map((d) => d.id)).toEqual(['1']);
  });

  it('returns an empty list when nothing matches', () => {
    expect(matchDocuments(docs, 'quantum')).toEqual([]);
  });
});

describe('groupByStatus', () => {
  it('keeps the three kanban columns in order', () => {
    const grouped = groupByStatus(items);
    expect(grouped.map((g) => g.status)).toEqual([...COLLECTION_STATUSES]);
    expect(grouped[0].items).toHaveLength(1);
    expect(grouped[1].items[0].id).toBe('a');
    expect(grouped[2].items[0].title).toBe('Tailwind');
  });
});

describe('budget + filter + sort', () => {
  it('parses currency strings', () => {
    expect(parseBudget('$12,500')).toBe(12500);
    expect(parseBudget('')).toBe(0);
    expect(parseBudget(undefined)).toBe(0);
  });

  it('filters by equals / contains / not-equals', () => {
    expect(applyCollectionFilter(items, 'Status', 'Equals', 'To Do')).toHaveLength(1);
    expect(applyCollectionFilter(items, 'Assignee', 'Contains', 'vance')[0].id).toBe('a');
    expect(applyCollectionFilter(items, 'Priority', 'Not Equals', 'High')).toHaveLength(2);
  });

  it('sorts by budget and title', () => {
    const byBudget = sortCollectionItems(items, 'Budget', 'Ascending');
    expect(byBudget.map((i) => i.id)).toEqual(['c', 'b', 'a']);
    const byTitle = sortCollectionItems(items, 'Title', 'Descending');
    expect(byTitle[0].title).toBe('Tailwind');
  });
});

describe('habits + trash + focus', () => {
  it('toggles a weekday and recounts current', () => {
    const habit = { weekDays: [true, false, false, false, false, false, false], current: 1 };
    const next = toggleHabitDay(habit, 2);
    expect(next.weekDays[2]).toBe(true);
    expect(next.current).toBe(2);
    expect(toggleHabitDay(habit, 99)).toEqual(habit);
  });

  it('flags trash items expiring within the threshold', () => {
    expect(isExpiringSoon(1)).toBe(true);
    expect(isExpiringSoon(3)).toBe(true);
    expect(isExpiringSoon(14)).toBe(false);
    expect(isExpiringSoon(-1)).toBe(false);
  });

  it('maps focus modes to seconds', () => {
    expect(focusSecondsFor('pomodoro')).toBe(FOCUS_PRESETS.pomodoro);
    expect(focusSecondsFor('shortBreak')).toBe(5 * 60);
    expect(focusSecondsFor('longBreak')).toBe(15 * 60);
    expect(focusSecondsFor('unknown')).toBe(FOCUS_PRESETS.pomodoro);
  });
});
