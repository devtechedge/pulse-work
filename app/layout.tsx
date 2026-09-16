import type { Metadata } from 'next';
import './globals.css';

const PAGE_TITLE = 'Pulse Workspace';
const PAGE_DESCRIPTION =
  'Block-based notes, collections, flashcards, habits, and a focus timer. Client-side demo.';
const SITE_URL = 'https://pulse-work-indol.vercel.app';

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  // Shared links (LinkedIn, Slack, email) render a bare URL without these.
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: SITE_URL,
    type: 'website',
    images: [{ url: 'https://pulse-work-indol.vercel.app/og.png', width: 1200, height: 630, alt: 'Pulse Workspace' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: ['https://pulse-work-indol.vercel.app/og.png'],
  },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
