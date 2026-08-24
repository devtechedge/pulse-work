import { chromium } from '@playwright/test';
import { mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const outDir = resolve(dirname(fileURLToPath(import.meta.url)), '../docs/screenshots');
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, colorScheme: 'dark' });
await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
await page.waitForSelector('[data-testid="launchpad"]');
await page.waitForTimeout(800);

await page.screenshot({ path: `${outDir}/01-launchpad.png`, fullPage: false });

await page.getByRole('button', { name: /Project Nova/i }).first().click();
await page.waitForSelector('[data-testid="canvas-editor"]');
await page.waitForTimeout(600);
await page.screenshot({ path: `${outDir}/02-editor.png`, fullPage: false });

await page.getByTestId('nav-collections').click();
await page.waitForSelector('[data-testid="kanban-board"]');
await page.waitForTimeout(800);
await page.screenshot({ path: `${outDir}/03-kanban.png`, fullPage: false });

await page.getByTestId('nav-focus').click();
await page.waitForSelector('[data-testid="focus-timer"]');
await page.waitForTimeout(400);
await page.screenshot({ path: `${outDir}/04-focus.png`, fullPage: false });

const social = await browser.newPage({ viewport: { width: 1280, height: 640 }, colorScheme: 'dark' });
await social.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
await social.waitForSelector('[data-testid="launchpad"]');
await social.waitForTimeout(800);
await social.screenshot({ path: resolve(outDir, '../social-preview.png'), fullPage: false });

await browser.close();
console.log('screenshots written to', outDir);
