'use client';

import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'glass' | 'solid' | 'bordered';
  hoverable?: boolean;
}

export function Card({
  children,
  variant = 'glass',
  hoverable = true,
  className = '',
  ...props
}: CardProps) {
  const baseClasses = 'rounded-lg p-4 font-mono transition-all duration-200';

  const hoverClasses = hoverable
    ? 'hover:-translate-y-0.5 hover:shadow-lg hover:border-cyan-500/30 dark:hover:border-cyan-400/30'
    : '';

  const variantClasses = {
    glass:
      'bg-slate-50/80 dark:bg-[#16181D]/80 backdrop-blur-md border border-slate-200 dark:border-white/10 text-slate-900 dark:text-slate-100',
    solid:
      'bg-slate-100 dark:bg-[#16181D] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-slate-100',
    bordered:
      'bg-transparent border border-slate-300 dark:border-white/10 text-slate-900 dark:text-slate-100',
  };

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${hoverClasses} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
