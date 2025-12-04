'use client';

import {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from 'react';

type ThemeType = 'light' | 'dark' | 'system';

type ThemeContextType = {
  theme: ThemeType;
  resolvedTheme: 'light' | 'dark';
  toggleTheme: (type?: ThemeType) => void;
};

const defaultContextValue: ThemeContextType = {
  theme: 'light',
  resolvedTheme: 'light',
  toggleTheme: () => {},
};

const ThemeContext = createContext<ThemeContextType>(defaultContextValue);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeType>('light');
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => setSystemTheme(media.matches ? 'dark' : 'light');

    handler();
    media.addEventListener('change', handler);
    return () => media.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem('theme') as ThemeType | null;
    if (stored) {
      setTheme(stored);
    }
  }, []);

  useEffect(() => {
    const active = theme === 'system' ? systemTheme : theme;

    if (active === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    localStorage.setItem('theme', theme);
  }, [theme, systemTheme]);

  const toggleTheme = (type?: ThemeType) => {
    if (type) {
      setTheme(type);
      return;
    }

    setTheme((prev) =>
      prev === 'light' ? 'dark' : prev === 'dark' ? 'system' : 'light',
    );
  };

  const resolvedTheme: 'light' | 'dark' =
    theme === 'system' ? systemTheme : theme;

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme deve ser usado dentro de ThemeProvider');
  }
  return ctx;
};
