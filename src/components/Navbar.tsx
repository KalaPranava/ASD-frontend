"use client";

import type { FC } from 'react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const Navbar: FC = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <nav className="fixed top-0 w-full z-50 glass-nav shadow-[0_4px_20px_rgba(217,70,239,0.04)]">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-6 h-20">
        <div className="flex items-center gap-3">
          <svg className="w-10 h-10 text-primary animate-[bounce-eeg_2s_infinite_ease-in-out]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
             <path d="M2 12h4l3-9 5 18 3-9h5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-2xl font-bold font-headline tracking-tight">
            <span className="text-on-surface">Neuro</span><span className="text-primary">Lens</span>
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="flex items-center justify-center p-2.5 rounded-full border border-outline/20 text-on-surface hover:bg-surface-bright transition-all hover:shadow-[0_0_20px_rgba(217,70,239,0.6)]"
          >
            <span suppressHydrationWarning className="material-symbols-outlined">
              {mounted && theme === 'light' ? 'light_mode' : 'dark_mode'}
            </span>
          </button>
          <Link href="/login" className="hidden sm:inline-flex items-center justify-center px-6 py-2.5 rounded-full border border-outline/20 text-on-surface hover:bg-surface-bright transition-all hover:shadow-[0_0_20px_rgba(217,70,239,0.6)]">
            Sign In
          </Link>
        </div>
      </div>
      
      {/* Revert to standard static subtle bottom edge shadow */}
      <div className="bg-gradient-to-r from-transparent via-outline-variant to-transparent h-[1px] w-full absolute bottom-0"></div>
    </nav>
  );
};

export default Navbar;
