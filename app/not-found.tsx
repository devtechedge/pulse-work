import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-mono text-xs">
      <h2 className="text-2xl font-bold mb-2">404 - Page Not Found</h2>
      <p className="text-slate-500 mb-4">The requested workspace page could not be located.</p>
      <Link href="/" className="px-4 py-2 rounded-lg bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400">
        Return to Launchpad
      </Link>
    </div>
  );
}
