'use client';

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}: ButtonProps) {
  const baseClasses =
    'water-drop-effect inline-flex items-center justify-center font-mono font-medium rounded transition-all duration-200 active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none select-none';

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2.5',
  };

  const variantClasses = {
    primary:
      'bg-cyan-500 text-slate-950 hover:bg-cyan-400 font-semibold shadow-[0_0_15px_rgba(0,242,254,0.3)] dark:shadow-[0_0_20px_rgba(0,242,254,0.4)]',
    secondary:
      'bg-emerald-500 text-slate-950 hover:bg-emerald-400 font-semibold shadow-[0_0_15px_rgba(56,239,125,0.3)]',
    outline:
      'border border-slate-300 dark:border-white/10 text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-white/5',
    ghost:
      'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5',
    danger:
      'border border-rose-500/50 text-rose-500 hover:bg-rose-500/10 dark:hover:bg-rose-500/20',
  };

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
