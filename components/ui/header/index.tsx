import { useTheme } from '@/app/providers/ThemeContext';
import { ThemeSwitcher } from '../shadcn-io/theme-switcher';

export const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="border-input w-container m-auto flex items-center justify-between border-b-2 p-1 md:w-full lg:w-5/6">
      <h1 className="bold text-3xl">
        Simula
        <span className="ai bold text-5xl text-pink-500 italic">.ai</span>
      </h1>
      <ThemeSwitcher value={theme} onChange={(e) => toggleTheme(e)} />
    </header>
  );
};
