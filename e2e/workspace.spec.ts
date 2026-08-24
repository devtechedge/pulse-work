import { expect, test } from '@playwright/test';

test.describe('Pulse Workspace', () => {
  test('renders the launchpad hero', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByTestId('launchpad')).toBeVisible();
    await expect(page.getByRole('heading', { name: /Welcome back to Pulse Workspace/i })).toBeVisible();
    await expect(page.getByTestId('sidebar')).toBeVisible();
    await expect(page.getByText('Pulse Workspace v2.0')).toBeVisible();
  });

  test('opens collections kanban from the sidebar', async ({ page }) => {
    await page.goto('/');

    await page.getByTestId('nav-collections').click();
    await expect(page.getByTestId('collections')).toBeVisible();
    await expect(page.getByTestId('kanban-board')).toBeVisible();
    await expect(page.getByText('User Auth Migration V2')).toBeVisible();
    await expect(page.getByText('In Progress')).toBeVisible();
  });

  test('opens a seeded notebook in the canvas editor', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: /Project Nova/i }).first().click();
    await expect(page.getByTestId('canvas-editor')).toBeVisible();
    await expect(page.getByText('SAVED')).toBeVisible();
    await expect(page.locator('header')).toContainText('Project Nova');
  });

  test('spotlight search finds Project Nova', async ({ page }) => {
    await page.goto('/');

    await page.getByTestId('open-spotlight').click();
    const input = page.getByTestId('spotlight-input');
    await expect(input).toBeVisible();
    await input.fill('Nova');
    await expect(page.getByText('Matching Notebook Pages (1)')).toBeVisible();
    await page.getByText('Project Nova: Core Infrastructure Migration').last().click();
    await expect(page.getByTestId('canvas-editor')).toBeVisible();
  });

  test('theme toggle flips the html.dark class', async ({ page }) => {
    await page.goto('/');

    const html = page.locator('html');
    await expect(html).toHaveClass(/dark/);

    await page.getByTestId('theme-toggle').click();
    await expect(html).not.toHaveClass(/dark/);

    await page.getByTestId('theme-toggle').click();
    await expect(html).toHaveClass(/dark/);
  });
});
