import { useTheme } from '@/app/providers/ThemeContext';
import { ThemeSwitcher } from '../shadcn-io/theme-switcher';

export const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-background w-container fixed top-0 right-0 left-0 w-full border-b-2 border-gray-200 p-1 dark:border-b dark:border-gray-700">
      <div className="m-auto flex w-5/6 items-center justify-between">
        <h1 className="bold text-3xl">
          Simula
          <span className="ai bold text-5xl text-pink-500 italic">.aí</span>
        </h1>
        <ThemeSwitcher value={theme} onChange={(e) => toggleTheme(e)} />
      </div>
    </header>
  );
};
