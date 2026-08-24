# Security Assessment — Pulse Workspace

**Date:** 2026-08-24  
**Scope:** Auth, XSS, injection, CORS, secrets, payments, third-party APIs  
**Context:** Public deploy is a **portfolio demo**. All notebooks, collections, habits, and timer state live in **React client memory**. There is no production backend on Vercel.

---

## Executive summary

| Area | Risk | Notes |
|------|------|--------|
| Authentication | **N/A** | No login. No cookies. No NextAuth / JWT. |
| Authorization | **N/A** | Single-browser demo. Share / teamspace / co-presence avatars are UI chrome. |
| XSS | **Low** | React text nodes. No `dangerouslySetInnerHTML` in app code. Cover images load from `picsum.photos`. |
| Injection (SQL) | **N/A** | No Prisma, no SQL, no `DATABASE_URL`. |
| Secrets in repo | **Hardened** | `.env*` gitignored. `.env.example` documents that no key is required. |
| CORS | **N/A** | Same-origin App Router. No public API routes. |
| Payments | **Simulated** | Billing settings fire `alert()`. No Stripe, no card vault. |
| Gemini | **Removed** | `@google/genai` was unused template code and has been dropped. |

**Overall (public demo):** Low residual risk for a public demo walkthrough. Do not treat this as a production workspace.

---

## 1. Authentication & session

There is no session. Persona (Student / Creator / Planner / Business / Daily Life) is a client-side label. Theme and density persist in `localStorage` (`pulse_theme`, `pulse_density`) only.

**Not claimed:** NextAuth, JWT, OAuth, bcrypt, magic links.

---

## 2. Persistence

`context/WorkspaceContext.tsx` holds documents, collections, trash, flashcards, habits, and captures in `useState`.

- Refreshing the tab restores the seeded fixtures.
- Two browser tabs do not share writes.
- Do not store real user content here.

Import / export is a JSON download / file-picker in the settings modal. It never leaves the browser.

---

## 3. XSS

- Page titles, block copy, kanban cards, and flashcards render as React text → default escaping.
- Slash-command blocks do not interpret HTML.
- `next/image` remotePatterns allow `picsum.photos` only.
- Residual: a crafted `picsum.photos` URL is still a third-party image. Demo-only.

---

## 4. Payments & billing

`components/settings/BillingSettings.tsx` shows a **Pulse Pro** card with a `$29/month` label and `alert('Billing portal opened!')`. Seat expansion is the same pattern. There is no processor, no webhook, no stored card.

---

## 5. Dependency / supply chain

Removed in this pass (never imported by app code):

- `@google/genai`
- `@hookform/resolvers`
- `class-variance-authority`
- `motion`
- `firebase-tools`
- `@tailwindcss/typography`
- `tw-animate-css`

Runtime is Next 15, React 19, Lucide, Tailwind utilities.

`ignoreBuildErrors` is **false**. Type errors fail CI.

Do **not** run `npm audit fix --force` onto Next 16 to clear Next 15 advisories. Dependabot ignores majors.

---

## 6. Build / hosting

- `output: "standalone"` is gated off when `VERCEL` is set.
- `"build": "next build"` — no post-build `cp` into `.next/standalone`.
- Node 22 in GitHub Actions.

---

## 7. Residual risk & acceptance

**Accepted for portfolio demo**

- In-memory client store / no durable backend
- Public billing labels that do not charge anyone
- Picsum placeholder images
- Web Audio ambient noise (no microphone capture)

**Not accepted**

- Claiming NextAuth / JWT / a production payment backend
- Re-enabling `ignoreBuildErrors`
- Shipping a real user base on this state model

---

## 8. How to re-test

```bash
npm test
npm run typecheck
npx playwright install chromium
npm run test:e2e
npm audit --omit=dev
```

To report a vulnerability, open a GitHub security advisory or an issue.
