'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light';
type Density = 'normal' | 'compact';

interface ThemeContextType {
  theme: Theme;
  density: Density;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  setDensity: (density: Density) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('dark');
  const [density, setDensityState] = useState<Density>('normal');

  useEffect(() => {
    const savedTheme = localStorage.getItem('pulse_theme') as Theme | null;
    const savedDensity = localStorage.getItem('pulse_density') as Density | null;

    if (savedTheme === 'dark' || savedTheme === 'light') {
      requestAnimationFrame(() => {
        setThemeState(savedTheme);
      });
    }

    if (savedDensity === 'normal' || savedDensity === 'compact') {
      requestAnimationFrame(() => {
        setDensityState(savedDensity);
      });
    }
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('pulse_theme', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const setDensity = (newDensity: Density) => {
    setDensityState(newDensity);
    localStorage.setItem('pulse_density', newDensity);
  };

  return (
    <ThemeContext.Provider value={{ theme, density, toggleTheme, setTheme, setDensity }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
